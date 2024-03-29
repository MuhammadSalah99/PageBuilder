export const styles: { [key: string]: React.CSSProperties } = {
  configStyles: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "30%",
    left: "50%",
    zIndex: 10,
  
  },
  galleryOuterWrapper: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
    gridTemplateRows: "repeat(1, minmax(0, 1fr))",
    // marginBottom: "6rem",
  },
  galleryInnerWrapper: {
    display: "grid",
    position: "relative",
    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
    gridTemplateRows: "repeat(1, minmax(0, 1fr))",
    gridRow: " span 1 / span 1",
    gridColumn: "span 1 / span 1",
    overflow: "auto",
    placeSelf: "stretch stretch",
  },
  galleryPlacement: {
    display: "grid",
    width: "100%",
    height: "100%",
    placeItems: "start",
  },
  internalWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    overflow: "hidden",
  },
  flexContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
  },
  errorComponent: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "initial",
  },
  titleWrapper: {
    display: "flex",
    overflow: "hidden",
    flex: "1",
    minWidth: "50px",
    position: "absolute",
    // borderLeft: "2px solid rgba(255, 255, 255, 0.5)",
    bottom: "0",
    width: "100%",
    zIndex: "2",
  },
  transitionTitle: {
    margin: 0,
    paddingBottom: "8.94rem",
    transitionProperty: "font-size",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "500ms",
    willChange: "font-size",
    textShadow: "0 0 2px 1px black",
    whiteSpace: "nowrap",
    userSelect: "none",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    textAlign: "center",
  },
  hgroupStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headingStyle: {
    width: "52px",
    height: "101px",
    fontFamily: "Helvetica Neue",
    fontSize: "90px",
    fontWeight: "normal",
    fontStyle: "normal",
    textAlign: "center",
    color: "#ffffff",
    margin:"1rem auto"
    // animation: "opacity 1s ease"
  },
  descriptionStyle: {
    fontFamily: "Helvetica Neue",
    fontSize: "33px",
    lineHeight: "34px",
    textAlign: "center",
    color: "#ffffff",
    marginBottom:"16px",
    marginTop:"16px",
    lineBreak:"auto",
    lineClamp:"initial",
    wordBreak:"break-word",

  },
  linkButtonStyle: {
    width: "8.0625rem",
    height: "1.75rem",
    flexShrink: 0,
    borderRadius: "0.375rem",
    background: "#ED0C16",
    color: "#F5F4F4",
    fontSize: "0.6875rem",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
  },
  backgroundStyle: {
    width: "100",
    height: "100%",
    zIndex: "1",
    // clipPath: isActive ? "none" : "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    // willChange: "opacity",
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto 100%",
    backgroundPosition: "50% 50%",
    objectFit: "cover",
  },
  closeButtonStyle: {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "white",
    cursor: "pointer",
    zIndex: 999,
    width: "64px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "none",
  },
};
