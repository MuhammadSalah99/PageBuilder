import { useEffect, useState } from "react";
import { FormPosition } from "../../interface";
import Label from "../../../../CustomUIForms/Label/Label";
import FormWrapper from "../../../../CustomUIForms/FormWrapper/FormWrapper";
import TextInput from "../../../../CustomUIForms/TextInput/TextInput";

function Position({ dim, setDim }: FormPosition) {
  const [y1, setY1] = useState(dim[0][0]);
  const [x1, setX1] = useState(dim[0][1]);

  const [y2, setY2] = useState(dim[1][0]);
  const [x2, setX2] = useState(dim[1][1]);

  useEffect(() => {
    if (dim.length > 0) {
      setY1(dim[0][0]);
      setX1(dim[0][1]);
      setY2(dim[1][0]);
      setX2(dim[1][1]);
    }
  }, [dim]);

  const saveItem = () => {
    setDim([
      [y1, x1],
      [y2, x2],
    ]);
  };

  return (
    <FormWrapper>
      <Label>Position</Label>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <TextInput
          type="number"
          className="number-input-normal"
          value={x1}
          onChange={(e) => setX1(e.target.value)}
          placeholder="X1"
          onBlur={saveItem}
        />
        <TextInput
          type="number"
          className="number-input-normal"
          value={y1}
          onChange={(e) => setY1(e.target.value)}
          placeholder="Y1"
          onBlur={saveItem}
        />

        <TextInput
          type="number"
          className="number-input-normal"
          value={x2}
          onChange={(e) => setX2(e.target.value)}
          placeholder="X2"
          onBlur={saveItem}
        />
        <TextInput
          type="number"
          className="number-input-normal"
          value={y2}
          onChange={(e) => setY2(e.target.value)}
          placeholder="Y2"
          onBlur={saveItem}
        />
      </div>
    </FormWrapper>
  );
}

export default Position;
