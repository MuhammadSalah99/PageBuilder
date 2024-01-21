import { InputHTMLAttributes } from "react";
// import './Checkbox.css'

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  }


function CheckBox({...props}:CheckBoxProps) {
    return (
        <>
        <input type="checkbox" {...props} className="inp-cbx custom-checkbox" id="morning"/>
        </>
    );
}

export default CheckBox;