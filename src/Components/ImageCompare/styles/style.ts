import { StylesProps } from "../interface";

export function useStyles({
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
}: StylesProps) {
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      boxSizing: "border-box",
      position: "relative",
      width: "100vw",
      height: `100vh`,
      overflow: "hidden",
    },
    rightImage: {
      clip: horizontal
        ? `rect(auto, auto, auto, ${containerWidth * sliderPosition}px)`
        : `rect(${containerHeight * sliderPosition}px, auto, auto, auto)`,
      display: "block",
      height: "100%",
      objectFit: "cover",
      position: "absolute",
      width: "100%",
      ...rightImageCss,
    },
    leftImage: {
      clip: horizontal
        ? `rect(auto, ${containerWidth * sliderPosition}px, auto, auto)`
        : `rect(auto, auto, ${containerHeight * sliderPosition}px, auto)`,
      display: "block",
      height: "100%",
      objectFit: "cover",
      position: "absolute",
      width: "100%",
      ...leftImageCss,
    },
    slider: {
      alignItems: "center",
      cursor: !hover ? (horizontal ? "ew-resize" : "ns-resize") : undefined,
      display: "flex",
      flexDirection: horizontal ? "column" : "row",
      height: horizontal ? "100%" : `${handleSize}px`,
      justifyContent: "center",
      left: horizontal
        ? `${containerWidth * sliderPosition - handleSize / 2}px`
        : 0,
      position: "absolute",
      top: horizontal
        ? 0
        : `${containerHeight * sliderPosition - handleSize / 2}px`,
      width: horizontal ? `${handleSize}px` : "100%",
    },
    line: {
      background: sliderLineColor,
      boxShadow:
        "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
      flex: "0 1 auto",
      height: horizontal ? "100%" : `${sliderLineWidth}px`,
      width: horizontal ? `${sliderLineWidth}px` : "100%",
    },
    handleCustom: {
      alignItems: "center",
      boxSizing: "border-box",
      display: "flex",
      flex: "1 0 auto",
      height: "auto",
      justifyContent: "center",
      width: "auto",
    },
    handleDefault: {
      alignItems: "center",
      boxSizing: "border-box",
      display: "flex",
      flex: "1 0 auto",
      height: `${handleSize}px`,
      justifyContent: "center",
      width: `${handleSize}px`,
      transform: horizontal ? "none" : "rotate(90deg)",
      margin: "-21px",
    },
    leftArrow: {
      border: `inset ${handleSize * 0.15}px rgba(0,0,0,0)`,
      borderRight: `${handleSize * 0.15}px solid ${sliderLineColor}`,
      height: "0px",
      marginLeft: `-${handleSize * 0.25}px`, // for IE11
      marginRight: `${handleSize * 0.25}px`,
      width: "0px",
    },
    rightArrow: {
      border: `inset ${handleSize * 0.15}px rgba(0,0,0,0)`,
      borderLeft: `${handleSize * 0.15}px solid ${sliderLineColor}`,
      height: "0px",
      marginRight: `-${handleSize * 0.25}px`, // for IE11
      width: "0px",
    },
    leftLabel: {
      // background: "rgba(0, 0, 0, 0.5)",
      color: "white",
      left: horizontal ? "20%" : "50%",
      bottom: "3%",
      opacity: isSliding ? 0 : 1,
      padding: "10px 20px",
      position: "absolute",
      // top: horizontal ? "50%" : "3%",
      transform: horizontal ? "translate(0,-50%)" : "translate(-50%, 0)",
      transition: "opacity 0.1s ease-out",
      fontFamily: "Helvetica Neue",
    },
    rightLabel: {
      // background: "rgba(0, 0, 0, 0.5)",
      color: "white",
      opacity: isSliding ? 0 : 1,
      padding: "10px 20px",
      position: "absolute",
      // left: horizontal ? "50%" : "50%",
      right: horizontal ? "20%" : "",
      // top: horizontal ? "50%" : "",
      bottom: horizontal ? "3%" : "3%",
      transform: horizontal ? "translate(0,-50%)" : "translate(-50%, 0)",
      transition: "opacity 0.1s ease-out",
      fontFamily: "Helvetica Neue",
    },
    leftLabelContainer: {
      clipPath: horizontal
        ? `polygon(0% 0%, ${containerWidth * sliderPosition}px 0%, ${
            containerWidth * sliderPosition
          }px 100%, 0% 100%)`
        : `rect(auto, auto, ${containerHeight * sliderPosition}px, auto)`,
      height: "100%",
      position: "absolute",
      width: "100%",
    },
    rightLabelContainer: {
      clipPath: horizontal
        ? `polygon(100% 0%, ${containerWidth * sliderPosition}px 0%, ${
            containerWidth * sliderPosition
          }px 100%, 100% 100%)`
        : `rect(${containerHeight * sliderPosition}px, auto, auto, auto)`,
      height: "100%",
      position: "absolute",
      width: "100%",
    },
    heading: {
      fontSize: "77px",
      color: "#fff",
      fontWeight: "400",
      lineHeight: "normal",
      fontStyle: "normal",
      margin: 0,
      padding: 0,

    },
    paragraph: {
      fontSize: "48px",
      color: "#fff",
      fontWeight: "400",
      lineHeight: "normal",
      fontStyle: "normal",
      margin: 0,
      padding: 0,
      textIndent: "17px",
      marginTop: "-14px",

    },
  };

  return styles;
}
