import TextAreaWrapper from "../../../CustomUIForms/Extra/TextAreaWrapper";
import TextInputWrapper from "../../../CustomUIForms/Extra/TextInputWrapper";
import FormWrapper from "../../../CustomUIForms/FormWrapper/FormWrapper";
import Label from "../../../CustomUIForms/Label/Label";
import TextEditorTipTap from "../../Text-Editor/TextEditorTipTap";
import { FormComponentProps } from "../interface";



function FormComponent({
  titleName,
  title,
  titleLabel,
  setTitle,
  descName,
  descLabel,
  description,
  setDescription,
}: FormComponentProps) {
  return (
    <>
      <FormWrapper>
        <Label htmlFor={titleName}>{titleLabel}</Label>
        <TextInputWrapper>
          <TextEditorTipTap text={title} setText={setTitle} />
        </TextInputWrapper>
      </FormWrapper>

      <FormWrapper>
        <Label htmlFor={descName}>{descLabel}</Label>
        <TextAreaWrapper>
          <TextEditorTipTap text={description} setText={setDescription} />
        </TextAreaWrapper>
      </FormWrapper>
    </>
  );
}

export default FormComponent;
