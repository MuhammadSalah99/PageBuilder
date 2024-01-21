import { useEffect, useRef, useState } from "react";
import Form from "./Form";
import { IProps } from "../interface";
import { useStyles } from "../styles/style";
import Handle from "./Handle";
import { observer } from "mobx-react";
import traitManagerStore from "../../../GlobalStates/TraitManegerStore";
import useCustomId from "../useComponentId";
import { defaultVal } from "./constants";
import SideSection from "./SideSection";
import editIcon from "../assets/edit.svg";
import editorStore from "../../../GlobalStates/EditorInstance";
import previewManagerStore from "../../../GlobalStates/PreviewManagerStore";

interface ImageInfo {
  rightImage: string;
  rightImageHeader: string;
  rightImageDescription: string;
  leftImage: string;
  leftImageHeader: string;
  leftImageDescription: string;
}
const ImageCompare: React.FC<IProps> = observer((props: IProps) => {
  // Right image informatio
  const id = useCustomId();

  const [imageInfo, setImageInfo] = useState<ImageInfo>(defaultVal);
  const { editor } = editorStore;
  const { isPreview } = previewManagerStore;

  const {
    openTraitManeger,
    setOpenTraitManeger,
    setComponentManeger,
    componentManeger,
    setTempImageComparisonCards,
    tempImageComparisonCards,
  } = traitManagerStore;

  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    setImageInfo(defaultVal);
    // setIsAuto(defaultVal.isAuto);
    setTempImageComparisonCards({ id: id, cards: defaultVal });
  }, []);

  useEffect(() => {
    if (tempImageComparisonCards?.id === id) {
      setImageInfo(tempImageComparisonCards.cards);
      // setIsAuto(tempImageComparisonCards.cards.isAuto);
    }
  }, [tempImageComparisonCards]);

  const addTraitManeger = () => {
    setTempImageComparisonCards({ id: id, cards: imageInfo as ImageInfo });
    setComponentManeger(<Form />);
    setOpenTraitManeger(true);
  };

  const {
    aspectRatio = "taller",
    handle = null,
    handleSize = 40,
    hover = false,
    leftImageAlt = "",
    leftImageCss = {},
    onSliderPositionChange = () => {},
    rightImageAlt = "",
    rightImageCss = {},
    skeleton = null,
    sliderLineColor = "#ffffff",
    sliderLineWidth = 2,
    sliderPositionPercentage = 0.5,
    vertical = false,
  } = props;

  const horizontal = !vertical;

  const [sliderPosition, setSliderPosition] = useState<number>(
    sliderPositionPercentage
  );

  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [leftImgLoaded, setLeftImgLoaded] = useState<boolean>(false);
  const [rightImgLoaded, setRightImgLoaded] = useState<boolean>(false);
  const [isSliding, setIsSliding] = useState<boolean>(false);

  const [editing, setEditing] = useState(false);
  useEffect(() => {
    setEditing(!isPreview);
  }, [isPreview]);
  const containerRef = useRef(null);
  const rightImageRef = useRef(null);
  const leftImageRef = useRef(null);

  // make the component responsive
  useEffect(() => {
    const containerElement = containerRef.current;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const resizeObserver = new ResizeObserver(([entry, ..._]) => {
      const currentContainerWidth = entry.target.getBoundingClientRect().width;
      setContainerWidth(currentContainerWidth);
    });
    resizeObserver.observe(containerElement!);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    // consider the case where loading image is completed immediately
    // due to the cache etc.
    const alreadyDone = (leftImageRef.current as HTMLImageElement | null)
      ?.complete;
    alreadyDone && setLeftImgLoaded(true);

    return () => {
      // when the left image source is changed
      setLeftImgLoaded(false);
    };
  }, [imageInfo?.leftImage]);

  useEffect(() => {
    // consider the case where loading image is completed immediately
    // due to the cache etc.
    const alreadyDone = (rightImageRef.current as HTMLImageElement | null)
      ?.complete;
    alreadyDone && setRightImgLoaded(true);

    return () => {
      // when the right image source is changed
      setRightImgLoaded(false);
    };
  }, [imageInfo?.rightImage]);

  const allImagesLoaded = rightImgLoaded && leftImgLoaded;

  useEffect(() => {
    const handleSliding = (event: MouseEvent | TouchEvent) => {
      const e = event as MouseEvent & TouchEvent;

      // Calc cursor position from the:
      // - left edge of the viewport (for horizontal)
      // - top edge of the viewport (for vertical)
      const cursorXfromViewport = e.touches ? e.touches[0].pageX : e.pageX;
      const cursorYfromViewport = e.touches ? e.touches[0].pageY : e.pageY;

      // Calc Cursor Position from the:
      // - left edge of the window (for horizontal)
      // - top edge of the window (for vertical)
      // to consider any page scrolling
      const cursorXfromWindow = cursorXfromViewport - window.scrollX;
      const cursorYfromWindow = cursorYfromViewport - window.scrollY;

      // Calc Cursor Position from the:
      // - left edge of the image(for horizontal)
      // - top edge of the image(for vertical)
      const imagePosition = (
        rightImageRef.current as HTMLImageElement | null
      )?.getBoundingClientRect();

      let pos = horizontal
        ? cursorXfromWindow - imagePosition!.left
        : cursorYfromWindow - imagePosition!.top;

      // Set minimum and maximum values to prevent the slider from overflowing
      const minPos = 0 + sliderLineWidth / 2;
      const maxPos = horizontal
        ? containerWidth - sliderLineWidth / 2
        : containerHeight - sliderLineWidth / 2;

      if (pos < minPos) pos = minPos;
      if (pos > maxPos) pos = maxPos;

      horizontal
        ? setSliderPosition(pos / containerWidth)
        : setSliderPosition(pos / containerHeight);

      // If there's a callback function, invoke it everytime the slider changes
      if (onSliderPositionChange) {
        horizontal
          ? onSliderPositionChange(pos / containerWidth)
          : onSliderPositionChange(pos / containerHeight);
      }
    };

    function autoSlide() {
      let moveThis = 0;
      let increment = tempImageComparisonCards?.cards.step as number || 30;

      const timeId = setInterval(() => {
        moveThis += increment;

        if (moveThis === containerWidth || moveThis === 0) {
          increment *= -1;
        }

        if(moveThis >=containerWidth){
          moveThis =containerWidth
          increment*=-1
        }
        if(moveThis <= 0){
          moveThis =0;
          increment*=-1;
        }


        setSliderPosition(moveThis / containerWidth);
      }, tempImageComparisonCards?.cards.delay || 40);
      return timeId;
    }

    const startSliding = (e: MouseEvent | TouchEvent) => {
      setIsSliding(true);

      // Prevent default behavior other than mobile scrolling
      if (!("touches" in e)) {
        e.preventDefault();
      }

      // Slide the image even if you just click or tap (not drag)
      handleSliding(e);

      window.addEventListener("mousemove", handleSliding); // 07
      window.addEventListener("touchmove", handleSliding); // 08
    };

    const finishSliding = () => {
      setIsSliding(false);
      window.removeEventListener("mousemove", handleSliding);
      window.removeEventListener("touchmove", handleSliding);
    };

    const containerElement = containerRef.current as HTMLDivElement | null;

    if (allImagesLoaded) {
      // it's necessary to reset event handlers each time the canvasWidth changes

      // for mobile
      const containerElement = containerRef.current as HTMLDivElement | null;

      if (containerElement) {
        if (isPreview) {
          if (isAuto) {
            const autoSlideIntervalId = autoSlide();

            return () => {
              clearInterval(autoSlideIntervalId);
            };
          } else {
            containerElement.addEventListener("touchstart", startSliding); // 01
            window.addEventListener("touchend", finishSliding); // 02

            // for desktop
            if (hover) {
              containerElement.addEventListener("mousemove", handleSliding); // 03
              containerElement.addEventListener("mouseleave", finishSliding); // 04
            } else {
              containerElement.addEventListener("mousedown", startSliding); // 05
              window.addEventListener("mouseup", finishSliding); // 06
            }
          }
        } else {
          setSliderPosition(0.5);
        }
      }

      // calc and set the container's size
      const leftImageWidthHeightRatio =
        (leftImageRef.current as HTMLImageElement | null)!.naturalHeight /
        (leftImageRef.current as HTMLImageElement | null)!.naturalWidth;
      const rightImageWidthHeightRatio =
        (rightImageRef.current as HTMLImageElement | null)!.naturalHeight /
        (rightImageRef.current as HTMLImageElement | null)!.naturalWidth;

      const idealWidthHeightRatio =
        aspectRatio === "taller"
          ? Math.max(leftImageWidthHeightRatio, rightImageWidthHeightRatio)
          : Math.min(leftImageWidthHeightRatio, rightImageWidthHeightRatio);

      const idealContainerHeight = containerWidth * idealWidthHeightRatio;

      setContainerHeight(idealContainerHeight);
    }

    return () => {
      // cleanup all event resteners
      containerElement!.removeEventListener("touchstart", startSliding); // 01
      window.removeEventListener("touchend", finishSliding); // 02
      containerElement!.removeEventListener("mousemove", handleSliding); // 03
      containerElement!.removeEventListener("mouseleave", finishSliding); // 04
      containerElement!.removeEventListener("mousedown", startSliding); // 05
      window.removeEventListener("mouseup", finishSliding); // 06
      window.removeEventListener("mousemove", handleSliding); // 07
      window.removeEventListener("touchmove", handleSliding); // 08
    };
    // eslint-disable-next-line
  }, [
    allImagesLoaded,
    aspectRatio,
    containerHeight,
    containerWidth,
    horizontal,
    hover,
    sliderLineWidth,
    vertical,
    isAuto,
    editing,
  ]);

  const styles = useStyles({
    horizontal,
    containerWidth,
    sliderPosition,
    containerHeight,
    rightImageCss,
    leftImageCss,
    hover,
    handleSize,
    sliderLineWidth,
    sliderLineColor,
    isSliding,
  });

  return (
    <>
      {skeleton && !allImagesLoaded && (
        <div style={{ ...styles.container }}>{skeleton}</div>
      )}
      {/* {!isPreview && (
        <button
          className="Edit"
          style={{
            position: "absolute",
            top: "0%",
            left: "50%",
            width: "1.6rem",
            height: "1.6rem",
            zIndex: 7,
            border: "none",
            backgroundColor: "transparent",
            backgroundImage: `url("${editIcon}")`,
            backgroundSize: "cover",
          }}
          onClick={() => setEditing(!editing)}
        ></button>
      )}{" "} */}
      <div
        onClick={() => addTraitManeger()}
        style={{
          ...styles.container,
          display: allImagesLoaded ? "block" : "none",
        }}
        ref={containerRef}
        data-testid="container"
      >
        <SideSection
          onLoad={() => setLeftImgLoaded(true)}
          alt={leftImageAlt}
          imageRef={leftImageRef}
          src={imageInfo?.leftImage as string}
          imageStyle={styles.leftImage}
          editing={editing}
          setEditing={setEditing}
          labelContainerStyle={styles.leftLabelContainer}
          labelStyles={styles.leftLabel}
          headingStyles={styles.heading}
          imageHeader={imageInfo.leftImageHeader}
          imageDescreption={imageInfo.leftImageDescription}
          paragraphStyles={styles.paragraph}
          header={""}
          onTitlechange={(i: string) =>
            setTempImageComparisonCards({
              ...tempImageComparisonCards,
              cards: {
                ...tempImageComparisonCards?.cards,
                leftImageHeader: i,
              },
            })
          }
          onDescreptionChange={(i: string) =>
            setTempImageComparisonCards({
              ...tempImageComparisonCards,
              cards: {
                ...tempImageComparisonCards?.cards,
                leftImageDescription: i,
              },
            })
          }
        />
        <Handle
          slider={styles.slider}
          line={styles.line}
          handle={handle as string}
          leftArrow={styles.leftArrow}
          rightArrow={styles.rightArrow}
          handleDefault={styles.handleDefault}
          handleCustom={styles.handleCustom}
        />

        <SideSection
          onLoad={() => setRightImgLoaded(true)}
          alt={rightImageAlt}
          imageRef={rightImageRef}
          src={imageInfo?.rightImage as string}
          imageStyle={styles.rightImage}
          editing={editing}
          setEditing={setEditing}
          labelContainerStyle={styles.rightLabelContainer}
          labelStyles={styles.rightLabel}
          headingStyles={styles.heading}
          imageHeader={imageInfo.rightImageHeader}
          imageDescreption={imageInfo.rightImageDescription}
          paragraphStyles={styles.paragraph}
          header=""
          onTitlechange={(i: string) =>
            setTempImageComparisonCards({
              ...tempImageComparisonCards,
              cards: {
                ...tempImageComparisonCards?.cards,
                rightImageHeader: i,
              },
            })
          }
          onDescreptionChange={(i: string) =>
            setTempImageComparisonCards({
              ...tempImageComparisonCards,
              cards: {
                ...tempImageComparisonCards?.cards,
                rightImageDescription: i,
              },
            })
          }
        />
      </div>
    </>
  );
});

export default ImageCompare;
