import { ImageSectionProps } from "../interface";

function ImageSection({onload, imageAlt, imageRef,src,style ,testId}:ImageSectionProps) {
    return (
        <img
          onLoad={onload}
          alt={imageAlt}
          data-testid={testId}
          ref={imageRef}
          src={src}
          style={style}
        />
    );
}

export default ImageSection;