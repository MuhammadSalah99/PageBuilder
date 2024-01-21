import { HeadingLabelProps } from "../interface";
import TextEditorTipTap from "../../Text-Editor/TextEditorTipTap";
function HeadingLabel({
  labelContainer,
  label,
  heading,
  imageHeader,
  description,
  paragraph,
  editing,
  setEditing,
  onTitleChange,
  onDescreptionChange,
}: HeadingLabelProps) {
  // if I click on the header or on the paragragh, I don't want to see the sliding happening.

  return (
    <div style={labelContainer}>
      <hgroup style={label}>
        
        <div style={heading}>
        <TextEditorTipTap
          text={`${imageHeader}`} 
          setText={onTitleChange}
        />
          </div>
          <div style={paragraph}>
          <TextEditorTipTap
          text={`${description}`}
        setText={onDescreptionChange}
        />
          </div>

      </hgroup>
    </div>
  );
}

export default HeadingLabel;
