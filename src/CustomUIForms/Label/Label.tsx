import { LabelHTMLAttributes } from "react";
import "./Label.css";
interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

function Label({ children, ...props }: Props) {
  return (
    <label className="trait-label" {...props}>
      {children}
    </label>
  );
}

export default Label;
