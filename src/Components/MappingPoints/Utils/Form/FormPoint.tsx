import { useEffect, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Position from "./Position";
import InputComponet from "./InputComponet";
import TextAreaInput from "./TextAreaInput";
import ShapeDirection from "../Form/ShapeDirection";
import { FormPointProps } from "../../interface";
import { LatLngBoundsExpression } from "leaflet";
import TextInput from "../../../../CustomUIForms/TextInput/TextInput";
import FormWrapper from "../../../../CustomUIForms/FormWrapper/FormWrapper";
import Label from "../../../../CustomUIForms/Label/Label";
import TextArea from "../../../../CustomUIForms/TextArea/TextArea";


function FormPoint({ currentItem, prev, next, idx, length, updateItemsArray }:FormPointProps) {
  const [title, setTitle] = useState(currentItem.title);
  const [descreption, setDescreption] = useState(currentItem.description);
  const [position, setPosition] = useState(currentItem.position);

  const [dim, setDim] = useState(currentItem.dimensions);

  useEffect(() => {
    setTitle(currentItem.title);
    setDescreption(currentItem.description);
    setPosition(currentItem.position);
    setDim(currentItem.dimensions);
  }, [currentItem]);

  const saveItem = () => {
    updateItemsArray({
      title: title,
      description: descreption,
      dimensions: dim,
      position: position,
    });
  };



  return (
  
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          // maxHeight: "250px",
          justifyItems: "center",
          alignItems: "center",
          margin: "0 auto",
          overflow: "scroll",
          // width: "20.25rem",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-end",
            width: "4.4375rem",
            height: "1.25rem",
            backgroundColor: "#482829",
            color: "#fff",
            borderRadius: "1.81rem",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => {
              saveItem();
              prev();
            }}
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              cursor: "pointer",
              color: "white",
            }}
          >
            <RiArrowLeftSLine />
          </button>
          <p
            style={{
              color: "#FFF",
              fontSize: "0.5rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            {idx + 1}/ {length}
          </p>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              cursor: "pointer",
              color: "white",
            }}
            onClick={() => {
              saveItem();
              next();
            }}
          >
            <RiArrowRightSLine />
          </button>
        </div>

        {/* <SpotOrder items={items} setItems={setItems} activeIndex={idx} /> */}

        {/*Position contains the red block dimensions  */}
        <Position dim={dim as LatLngBoundsExpression} setDim={setDim} /> 
        
        {/* The shape direction contains the position variable  */}
        <ShapeDirection position={position as string} setPosition={setPosition} />

          <FormWrapper>
            <Label>
              Title
            </Label>
            <TextInput value={title as string} onChange={(e)=> setTitle(e.target.value)} name="title" placeholder="title"/>
          </FormWrapper>
          
          <FormWrapper>
            <Label>
              Description
            </Label>
            <TextArea value={descreption as string} onChange={(e)=> setDescreption(e.target.value)}/>
          </FormWrapper>
      </div>

  );
}

export default FormPoint;
