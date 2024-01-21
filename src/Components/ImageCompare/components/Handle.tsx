import { HandleProps } from "../interface";

function Handle({ slider, line, handle, handleCustom, handleDefault, leftArrow, rightArrow }: HandleProps) {
  return (
    <div style={slider}>
      <div style={line} />
      {handle ? (
        <div style={handleCustom}>{handle}</div>
      ) : (
        <div style={handleDefault}>
          <div style={leftArrow} />
          <div style={rightArrow} />
        </div>
      )}
      <div style={line} />
    </div>
  );
}

export default Handle;
