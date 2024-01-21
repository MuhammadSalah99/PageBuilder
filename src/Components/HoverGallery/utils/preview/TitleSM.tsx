import { TitleSMProps } from "../../interfaces";
import { styles } from "../../styles/styles";
import NeTitle from "./NeTitle";
import NewDescreption from "./NewDescreption";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TitleSM = ({ isActive, title, onClick, picTitle, description, cta ,editingMode ,idx }: TitleSMProps) => {
  // edit on place
  return (
    <div style={styles.titleWrapper}>
      <div style={styles.transitionTitle}>
        <hgroup style={styles.hgroupStyle}>
          <NeTitle headingStyles={styles.headingStyle} picTitle={picTitle} editingMode={editingMode} index={idx}/>
          <NewDescreption headingStyles={styles.descriptionStyle} picTitle={title as string} 
          editingMode={editingMode}
          index={idx}
          />
          <p style={{ display: "none" }}>{description}</p>
        </hgroup>
        <a style={styles.linkButtonStyle} onClick={(e) => e.preventDefault()} href={cta}>
          Click
        </a>
      </div>
    </div>
  );
};
