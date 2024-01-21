import { useEffect, useState } from "react";
import Image from "../../../Plugins/Image/Image";
import { observer } from "mobx-react";
import FormWrapper from "../../../CustomUIForms/FormWrapper/FormWrapper";
import Label from "../../../CustomUIForms/Label/Label";
import traitManagerStore from "../../../GlobalStates/TraitManegerStore";
import { defaultVal } from "./constants";
import CheckBox from "../../../CustomUIForms/CheckBox/CheckBox";
import FormComponent from "./FormComponent";
import NumberInput from "../../MappingPoints/Utils/Form/NumberInput";

const Form = observer(() => {
  const { tempImageComparisonCards, setTempImageComparisonCards } = traitManagerStore;
  const [rightImage, setRightImage] = useState(tempImageComparisonCards?.cards.rightImage || defaultVal.rightImage);
  const [rightImageHeader, setRightImageHeader] = useState(tempImageComparisonCards?.cards.rightImageHeader || "");
  const [rightImageDescription, setRightImageDescription] = useState(
    tempImageComparisonCards?.cards.rightImageDescription
  );

  //left image information
  const [leftImage, setLeftImage] = useState(tempImageComparisonCards?.cards.leftImage || defaultVal.leftImage);
  const [leftImageHeader, setLeftImageHeader] = useState(tempImageComparisonCards?.cards.leftImageHeader || "");
  const [leftImageDescription, setLeftImageDescription] = useState(
    tempImageComparisonCards?.cards.leftImageDescription
  );
  const [step, setStep] = useState(0);

  const [isAuto, setIsAuto] = useState(tempImageComparisonCards?.cards.isAuto);

  const [numberStep, setNumberStep]=useState(tempImageComparisonCards?.cards.step || 40);
  const [delay, setDelay] =useState(tempImageComparisonCards?.cards.delay || 30)

  useEffect(() => {
    setLeftImage(tempImageComparisonCards?.cards.leftImage as string);
    setRightImage(tempImageComparisonCards?.cards.rightImage as string);
  }, [tempImageComparisonCards]);

  const onCheckBoxToggle = (e) => {
    setIsAuto(!isAuto);
  };

  const saveItems = () => {
    setTempImageComparisonCards({
      id: tempImageComparisonCards?.id as string,
      cards: {
        rightImage: step === 1 ? rightImage : (tempImageComparisonCards?.cards.rightImage as string),
        rightImageHeader: step === 1 ? rightImageHeader : (tempImageComparisonCards?.cards.rightImageHeader as string),
        rightImageDescription:
          step === 1
            ? (rightImageDescription as string)
            : (tempImageComparisonCards?.cards.rightImageDescription as string),
        leftImage: step === 0 ? leftImage : (tempImageComparisonCards?.cards.leftImage as string),
        leftImageHeader: step === 0 ? leftImageHeader : (tempImageComparisonCards?.cards.leftImageHeader as string),
        leftImageDescription:
          step === 0
            ? (leftImageDescription as string)
            : (tempImageComparisonCards?.cards.leftImageDescription as string),
        isAuto: isAuto,
        step:numberStep,
        delay:delay,
      },
    });
  };

  return (
    <>
      {/* Image form set up */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0px" }}>
        <Image
          image={step === 0 ? (leftImage as string) : (rightImage as string)}
          setImage={step === 0 ? setLeftImage : setRightImage}
        />
      </div>
      {/**Image form setup */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginTop: " 1rem" }}>
        <div style={{ color: step === 0 ? "white" : "gray", cursor: "pointer" }} onClick={() => setStep(0)}>
          left
        </div>
        <div
          style={{ color: step === 1 ? "white" : "gray", cursor: "pointer" }}
          onClick={() => {
            setStep(1);
          }}
        >
          right
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column" }}>
        {/* <FormWrapper>
          <Label>
            <CheckBox checked={isAuto} onChange={(e) => onCheckBoxToggle(e)} />
            Automatic Sliding
          </Label>
        </FormWrapper> */}

        <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-evenly", }}>
          <div style={{ display: "flex", alignItems: "center" ,gap:"-4px"}}>
            <Label style={{ alignSelf: "center",marginRight:"-8px" }}>delay</Label>
            <NumberInput
              value={delay}
              setValue={setDelay}
              onBlur={() => console.log("hello")}
              // style={{ alignSelf: "center" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Label style={{ alignSelf: "center",marginRight:"-8px" }}>step</Label>
            <NumberInput
              value={numberStep}
              setValue={setNumberStep}
              onBlur={() => console.log("hello")}
              // style={{ alignSelf: "center" }}
            />
          </div>
        </div>

        {step === 0 && (
          <FormComponent
            titleName={`left-heading`}
            title={leftImageHeader as string}
            setTitle={setLeftImageHeader}
            description={leftImageDescription as string}
            descLabel={"left-description"}
            descName={`left-description`}
            setDescription={setLeftImageDescription}
            titleLabel={"Title 1"}
          />
        )}
        {step === 1 && (
          <FormComponent
            titleName={`right-heading`}
            title={rightImageHeader as string}
            setTitle={setRightImageHeader}
            description={rightImageDescription as string}
            descLabel={"Right-description"}
            descName={`Right-description`}
            setDescription={setRightImageDescription}
            titleLabel={"Title 2"}
          />
        )}

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
          onClick={() => saveItems()}
        >
          Save Labels
        </button>
      </form>
    </>
  );
});

export default Form;
