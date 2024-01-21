import { Layer } from "../../interfaces";
import { styles } from "../../styles/styles";
import Close from "./Close";

export const LayerSM = ({ link, isActive, easeIn, easeOut, easeInOut, onClick }: Layer) => {
  const transitionStyles = {
    transitionProperty: "opacity",
    transitionDuration: "1000ms",
    transitionTimingFunction: "ease",

    ...(easeIn && { transitionTimingFunction: `ease-in` }),
    ...(easeOut && { transitionTimingFunction: `ease-out` }),
    ...(easeInOut && { transitionTimingFunction: `ease-in-out` }),
  };

  return (
    <div
      style={{
        backgroundImage: `url(${link})`,
        ...styles.backgroundStyle,
        ...transitionStyles,
      }}
    >
      {isActive && (
        <button
          style={styles.closeButtonStyle}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <Close />
        </button>
      )}
    </div>
  );
};
