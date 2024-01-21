const styles: { [key: string]: React.CSSProperties } = {

    uploadedCont: {
        width: "91%",
        height: "65%",
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "6%",
        overflowY: "scroll",
        overflowX: "hidden"
    },

    uploadedPreviewCont: {
        width: "17.6%",
        height: "190px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        cursor: "pointer",
        marginRight: "20px",
        marginBottom: "25px"
    },

    previewImage: {
        width: "172px",
        height: "172px",
        backgroundSize: "cover",
        backgroundPosition: " center center",
        borderRadius: "7px",
        position: "relative"
    },

    imageMeta: {
        display: "flex",
        flexDirection: "column",
        marginTop: "7px",
        width: "100%"

    },

    nameSpan: {
        color: "#996565",
        fontSize: "12px",
        fontFamily: 'Helvetica Neue',
        margin: "0",
        padding: "0",
        overflowWrap: "break-word"
    },

    dimentionsSpan: {
        textShadow: "-1px -1px 0 rgba(0,0,0,.05)",
        fontWeight: "lighter",
        fontSize: "11px",
        color: "#ddd",
        opacity: "0.5",
        marginTop: "4px"
    },

    removeButton: {
        position: "absolute",
        top: "5px",
        right: "4px",
        cursor: "pointer",
        width: "30px",
        height: "30px",
        color: "white",
        backgroundColor: "rgba(255,5,5,0.8)",
        borderRadius: "50%",
        margin: "none",
        border: "none",

    },

    selectCheck: {
        position: "absolute",
        right: "7px",
        bottom: "7px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "25px",
        height: "25px",
        borderRadius: "100%",
        backgroundColor: "#C1393B"
    },

    submitButton: {
        backgroundColor: " transparent",
        height: "41px",
        color: "white",
        cursor: "pointer",
        borderRadius: " 7px",
        border: "2px solid #4A2B2C",
        marginBottom: "30px",
        margin: "0 auto",
        width: "94%"
    },

    modalActions: {
        width: '100%',
        margin: "25px auto",
        display: "flex",
        height: "calc(100vh - 25px)",
        overflowY: "scroll",
        flexDirection: "column"


    },

}

export default styles
