import { SelectHTMLAttributes } from "react";
import './SelectInput.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}


function SelectInput({children, ...props}:SelectProps) {
  return (
    <select className="trait-manager-select" {...props}>
        {children}
    </select>
  );
}

export default SelectInput;