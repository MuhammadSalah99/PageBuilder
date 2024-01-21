const styles: { [key: string]: React.CSSProperties } = {
    imageNav: {
        display: "flex",
        justifyContent: "space-around",
        margin: "0 auto",
        width: "87%",
    },

    imageNavCont: {
        fontSize: "12px",
        color: "white",
        backgroundColor: "rgb(72, 40, 41)",
        width: "37px",
        height: "26px",
        borderRadius: "10px",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    arrowCont: {
        display: "flex",
        alignSelf: "flex-end",
        width: "4.75rem",
        height: "1.6rem",
        backgroundColor: "#482829",
        color: "#fff",
        borderRadius: "1.81rem",
        justifyContent: "space-around",
        alignItems: "center",
    },

    arrowButton: {
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        cursor: "pointer",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    arrowSvg: {
        fontSize: "15px",
        fontWeight: "bold"
    },

    arrowValue: {
        color: "#FFF",
        fontSize: "0.6rem",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "normal",
    },
}

export default styles;
