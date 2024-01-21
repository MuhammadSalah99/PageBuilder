export const componentStyles: { [key: string]: React.CSSProperties } = {
  // to be deleted, no purpose of putting effort into putting it here
  formWrapper: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "30%",
    left: "50%",
    zIndex: 10,
  },
  mapContainer: {
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
  },
  pointsContainerWrapper: {
    margin: 0,
    padding: 0,
    scrollSnapType: "y mandatory",
    overflowY: "auto",
    position: "sticky",
    top: 0,
    left: 0,
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
  },
  pointToObserveWrapper:{
    width: "100vw",
    height: "100vh",
    display: "grid",
    placeContent: "center",
    scrollSnapAlign: "start",
  },
  outerDivStyles:{
    position: "relative", width: "432.3px", height: "326.4px", overflow: "hidden" 
  },headingGroupStyles:{
    position: "absolute", top: 50, left: 80, zIndex: 2, width: "100%", height: "100%",
  },
  headingStyle:{
    width: "160px",
    height: "24px",
    fontFamily: "Helvetica Neue",
    fontSize: "21px",
    fontWeight: "bold",
    fontStyle: "normal",
    textAlign: "left",
    color: "#ffffff",
  },
  paragraphStyle:{
    width: "244px",
    height: "127px",
    fontFamily: "Helvetica Neue",
    fontSize: "19px",
    fontWeight: 500,
    fontStyle: "normal",
    textAlign: "left",
    color: "#ffffff",
    padding: "10px",
  }


};
