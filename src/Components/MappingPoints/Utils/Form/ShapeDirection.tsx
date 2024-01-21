import FormWrapper from "../../../../CustomUIForms/FormWrapper/FormWrapper";
import Label from "../../../../CustomUIForms/Label/Label";
import { Left, Right, Up, Down } from "../Directions/index";
// import { ShapeDirection } from "../../Interfaces/interfaces";


interface Props {
  position: string;
  setPosition: (i:string) => void;
}

function ShapeDirection({ position, setPosition }:Props) {
  // const [active, setActive] = useState(position);

  const directions: (string |React.ReactNode)[][] = [
    ["left", <Left active={position === "left"} />],
    ["right", <Right active={position === "right"} />],
    ["up", <Up active={position === "up"} />],
    ["down", <Down active={position === "down"} />],
  ];

  return (

      <FormWrapper >
        <Label>
          ShapeDirection
        </Label>
        <div style={{ height: "28px", display: "flex", gap: "0.63rem" }}>
        {directions.map(([key, value], idx) => (
          <button
            type="button"
            onClick={() => {
              setPosition(key as string);
            }}
            key={idx}
            style={{
              cursor: "pointer",
              backgroundColor: position === key ? "#7A5756" : "#462627",
              border: "none",
              width: "2.76375rem",
              height: "1.75875rem",
              borderRadius: "0.25rem",
            }}
          >
            {value}
          </button>
        ))}
      </div>
      </FormWrapper>



  );
}

export default ShapeDirection;
