import MainTextEditor from "./MainTextEditor";
import './TextEditor.css'
interface Props{
    text:string;
    setText:(i:string)=>void;
    onBlur?:() => void;
}

function TextAreaCKE({text, setText ,onBlur}:Props) {
    return (
        <span>
            <MainTextEditor text={text} setText={setText} saveItems={onBlur}/>
        </span>
    );
}

export default TextAreaCKE;