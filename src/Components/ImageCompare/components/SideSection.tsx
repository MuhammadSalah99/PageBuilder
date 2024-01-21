import traitManagerStore from "../../../GlobalStates/TraitManegerStore";
import { sideSections } from "../interface";
import HeadingLabel from "./HeadingLabel";
import ImageSection from "./ImageSection";



function SideSection({
  onLoad,
  alt,
  imageRef,
  src,
  imageStyle,
  editing,
  setEditing,
  labelStyles,
  headingStyles,
  labelContainerStyle,
  imageHeader,
  imageDescreption,
  paragraphStyles,
  onTitlechange,
  onDescreptionChange
}: sideSections) {
  const { tempImageComparisonCards, setTempImageComparisonCards } = traitManagerStore;
  return (
    <>
      <ImageSection onload={onLoad} imageAlt={alt} imageRef={imageRef} src={src} style={imageStyle} />

      {imageHeader && (
        <HeadingLabel
          editing={editing}
          setEditing={setEditing}
          labelContainer={labelContainerStyle}
          label={labelStyles}
          heading={headingStyles}
          imageHeader={imageHeader}
          description={imageDescreption}
          paragraph={paragraphStyles}
          onTitleChange={onTitlechange}
          onDescreptionChange={onDescreptionChange}
        />
      )}
    </>
  );
}

export default SideSection;
