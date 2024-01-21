import MainTextEditor from './MainTextEditor';

interface Props{
    text:string;
    setText:(i:string)=>void;
}

function TextInputCKE({text, setText}:Props) {

    return (
      <span className="text-input-cke">
        <MainTextEditor text={text} setText={setText}/>
      </span>
    );
}

export default TextInputCKE;