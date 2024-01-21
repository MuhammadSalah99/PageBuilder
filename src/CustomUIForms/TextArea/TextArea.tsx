import './TextArea.css'

import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: React.ReactNode;
}


function TextArea({children, ...props}:TextAreaProps) {
  return (
    <textarea className="text-area-trait-panel" {...props}/>
  );
}

export default TextArea;