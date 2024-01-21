const styles: { [key: string]: React.CSSProperties } = {
    gridCont: {
        display: "flex",
        justifyContent: "center",
        height: "100%",
        position: "relative",
        width: "100%",
    },

    gridCell: {
        backgroundColor: "gray",
        cursor: "pointer",
        position: "relative",
        margin: "4px",
        marginLeft: "2px",
        marginRight: "2px",
        marginBottom: "2px",
        marginTop: "2px"
    },


    singleCell: {
        width: "100%",
    },

    twoCells: {
        width: "50%",
    },

    threeCells: {
        width: "33.3%",
    },

    fourCells: {
        width: "25%",
    },
    imageBgStyle: {
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
        backgroundPosition: "center"
    },
    addCellButton: {
        backgroundColor: '#ED1C24',
        borderColor: "#ED1C24",
        width: "26px",
        height: "26px",
        borderRadius: "50%",
        color: "white",
        position: "absolute",
        cursor: "pointer",
        opacity: "0",
        transition: 'opacity 0.3s ease, visibility 0.3s ease',
        zIndex: 10,
        fontWeight: "bold",

    },

    addGridCellButtonLeft: {
        left: "-20px",
        top: "50%",

    },

    addGridCellButtonRight: {
        right: "-20px",
        top: "50%",
    },

    addGridCellButtonTop: {
        right: "50%",
        top: "-20px",

    },
    addGridCellButtonBottom: {
        right: "50%",
        bottom: "-20px",
    },

    buttonShow: {
        opacity: 1,
        visibility: 'visible',
    },

    removeImgButton: {
        backgroundColor: "#bc1f1f",
        fontSize: "20px",
        color: "white",
        border: "none",
        position: "absolute",
        right: "5px",
        top: "5px",
        width: "32px",
        height: "32px",
        borderRadius: "5px",
        cursor: "pointer"
    }

}

export default styles
