interface Props {
  name: string;
  label: string;
  placeholder: string;
  descreption: string;
  setDescreption: (d: string) => void;
}

function TextAreaInput({ name, label, placeholder, descreption, setDescreption }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", marginLeft: "1.73px", marginTop: "1rem" }}>
      <label
        htmlFor={name}
        style={{
          color: "#A3A3A3",
          fontSize: "12px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
        }}
      >
        {label}
      </label>
      <textarea
        style={{
          width: "324px",
          height: "91px",
          flexShrink: 0,
          borderRadius: "6px",
          opacity: 0.8038,
          background: "#4E2C2C",
          resize: "none",
          color: "#FFF",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
          paddingLeft: "17px",
          paddingTop: "14px",
        }}
        name={name}
        placeholder={placeholder}
        onChange={(e) => {
          setDescreption(e.target.value);
        }}
        value={descreption}
      />
    </div>
  );
}

export default TextAreaInput;
