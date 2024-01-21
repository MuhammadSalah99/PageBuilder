import { InputHTMLAttributes } from "react";
import CheckBox from "./CheckBox";
import Label from "../Label/Label";
import './Checkbox.css'
interface checkBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function CheckBoxLabel({ label, ...props }: checkBoxProps) {
  const uniqueId = `checkbox-${Math.random().toString(36).substring(7)}`;

  return (
    <div className="checkbox-wrapper-4">
    <CheckBox id={uniqueId} {...props} />
    <Label className="cbx trait-label" htmlFor={uniqueId}>
      <span>
        <svg width="12px" height="10px" >
          <use xlinkHref="#check-4"></use>
        </svg>
      </span>
      <span>{label}</span>
    </Label>

    <svg className="inline-svg">
    <symbol id="check-4" viewBox="0 0 12 10">
      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
    </symbol>
  </svg>
  </div>
  );
}

export default CheckBoxLabel;
