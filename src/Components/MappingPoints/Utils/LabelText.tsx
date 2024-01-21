import { useEffect, useState } from "react";
import BackgroundSVG from "./BackgroundSVG";
import { componentStyles } from "../Styles/styles";
import { labelTextProp } from "../interface";

function LabelText({
  labelTitle,
  labelDescreption,
  position,
}: labelTextProp) {
  const [rotation, setRotation] = useState("right");

  useEffect(() => {
    setRotation(
      position === "up"
        ? "rotate(90deg)"
        : position === "down"
        ? "rotate(270deg)"
        : position === "right"
        ? "rotate(180deg)"
        : "rotate(0deg)"
    );
  }, [position]);

  return (
    <div style={componentStyles.outerDivStyles}>
      <BackgroundSVG rotation={rotation} />
      <hgroup style={componentStyles.headingGroupStyles}>
        <h3 style={componentStyles.headingStyle}>{labelTitle}</h3>
        <p style={componentStyles.paragraphStyle}>{labelDescreption}</p>
      </hgroup>
    </div>
  );
}

export default LabelText;
