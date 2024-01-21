import TextEditorTipTap from '../../../Text-Editor/TextEditorTipTap';
import { NewTitleProps } from '../../interfaces';

function NewDescreption({index,editingMode,headingStyles,picTitle}:NewTitleProps) {
    
    const titleEdit=(val:string)=>{
        editingMode("title", val, index)
}
    
    return (
        <div className="hover-gallery-bottom-header" style={headingStyles}>
        <TextEditorTipTap text={picTitle} setText={titleEdit}/>
        {/* {title} */}
      </div>
    );
}

export default NewDescreption;