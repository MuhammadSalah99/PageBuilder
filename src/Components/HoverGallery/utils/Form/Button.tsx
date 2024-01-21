import  { ReactNode, MouseEventHandler } from 'react';

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon: ReactNode;
  text: string;
}

function Button({ onClick, icon, text }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "4.9375rem",
        height: "1.875rem",
        flexShrink: 0,
        backgroundColor: "#482829",
        borderRadius: "0.31rem",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        outline: "none",
        cursor: "pointer",
      }}
    >
      {icon}
      <span style={{ marginLeft: "0.25rem" }}>{text}</span>
    </button>
  );
}

export default Button;
