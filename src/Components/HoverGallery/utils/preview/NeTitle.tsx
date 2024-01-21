import TextEditorTipTap from "../../../Text-Editor/TextEditorTipTap";
import { NewTitleProps } from "../../interfaces";

function NeTitle({headingStyles, picTitle, editingMode ,index}:NewTitleProps) {
    
    const picTitleEdit=(val:string)=>{
            editingMode("picTitle", val, index)
    }
    
    return (
        <div className="hover-gallery-title" style={headingStyles}>
        <TextEditorTipTap text={picTitle} setText={picTitleEdit}/>
        {/* {picTitle} */}
      </div>
    );
}

export default NeTitle;
