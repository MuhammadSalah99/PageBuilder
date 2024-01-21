import './TextInput.css'
import { InputHTMLAttributes } from "react";

function TextInput({...props}:InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input type='text' className='text-input-trait-panel' {...props}/>
  );
}

export default TextInput;