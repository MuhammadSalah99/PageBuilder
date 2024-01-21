import { useEffect, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { PiCopy, PiTrash } from "react-icons/pi";
import Button from "./Button";
import Image from "../../../../Plugins/Image/Image";
import { FormItemProps } from "../../interfaces";
import FormWrapper from "../../../../CustomUIForms/FormWrapper/FormWrapper";
import Label from "../../../../CustomUIForms/Label/Label";
import TextInputWrapper from "../../../../CustomUIForms/Extra/TextInputWrapper";
import TextEditorTipTap from "../../../Text-Editor/TextEditorTipTap";
import TextAreaWrapper from "../../../../CustomUIForms/Extra/TextAreaWrapper";

function FormPoint({ currentItem, prev, next, idx, length, updateItemsArray, addItem, deleteItem }: FormItemProps) {
  const [image, setImage] = useState(currentItem?.imgId || "");
  const [picTitle, setPicTitle] = useState(currentItem?.picTitle || "");
  const [title, setTitle] = useState(currentItem?.title || "");
  const [description, setDescription] = useState(currentItem?.description || "");
  const [cta, setCta] = useState(currentItem?.cta || "");

  useEffect(() => {
    if (currentItem) {
      setImage(currentItem?.imgId);
      setPicTitle(currentItem?.picTitle);
      setTitle(currentItem?.title);
      setDescription(currentItem?.description);
    }
  }, [currentItem]);

  const saveItem = () => {
    updateItemsArray({
      imgId: image,
      picTitle: picTitle,
      title: title,
      description: description,
      cta: cta,
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <Button onClick={addItem} icon={<PiCopy />} text={"Copy"} />
        <Button onClick={deleteItem} icon={<PiTrash />} text={"delete"} />
      </div>
      <Image image={image} setImage={setImage} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
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

        <FormWrapper>
          <Label>{"Pic Title"}</Label>
          <TextInputWrapper>
            <TextEditorTipTap text={picTitle} setText={setPicTitle} />
          </TextInputWrapper>
        </FormWrapper>

        <FormWrapper>
          <Label>title</Label>
          <TextInputWrapper>
            <TextEditorTipTap text={title} setText={setTitle} />
          </TextInputWrapper>
        </FormWrapper>

        <FormWrapper>
          <Label>Description</Label>
          <TextAreaWrapper>
            <TextEditorTipTap text={description} setText={setDescription} />
          </TextAreaWrapper>
        </FormWrapper>

        <FormWrapper>
          <Label>CTA</Label>
          <TextInputWrapper>
            <TextEditorTipTap text={cta} setText={setCta} />
          </TextInputWrapper>
        </FormWrapper>
        <button
          style={{
            display: "flex",
            padding: "10px 25px",
            fontSize: "16px",
            cursor: "pointer",
            textAlign: "center",
            textDecoration: "none",
            outline: "none",
            color: "white",
            backgroundColor: "#ED1C24",
            border: "none",
            margin: "1rem auto",
            borderRadius: "5px",
            transition: "all 0.3s",
          }}
          onClick={() => saveItem()}
        >
          Save Labels
        </button>
      </div>
    </>
  );
}

export default FormPoint;
