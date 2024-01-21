interface NumberInputProps {
    value: number;
    setValue: (value: number) => void;
    name?: string;
    placeHolder?: string;
    label?: string;
    onBlur:()=>void;
  }
  // 
  function NumberInput({ value, setValue, name, placeHolder, label ,onBlur }: NumberInputProps) {
    return (
      <div
        style={{
          width: "64px",
          height: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <label
          htmlFor={name}
          style={{
            fontSize: "14px",
            fontFamily: `"Helvetica Neue"`,
            color: " #868686",
            textAlign: "left",
            gap: "8px",
          }}
        >
          {label}
        </label>
        <input
          title="Please enter only numbers."
          type="number"
          name={name}
          placeholder={placeHolder}
          style={{
            width: "44px",
            height: "28px",
            backgroundColor: "#462627",
            border: "none",
            borderRadius: "4px",
            color: "#FFF",
            fontSize: "0.8125rem",
            appearance: "none",
            MozAppearance: "textfield",
            padding: "0",
          }}
          onChange={(e) => setValue(parseFloat(e.target.value))}
          onBlur={onBlur}
          onFocus={onBlur}
          onFocusOut={onBlur}
          value={value}
        />
      </div>
    );
  }
  
  export default NumberInput;
  