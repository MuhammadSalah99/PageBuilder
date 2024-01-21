const styles: { [ket: string]: React.CSSProperties } = {
    configManeger: {
        width: "400px",
        minHeight: "300px",
        backgroundColor: "#2B1313",
        position: "absolute",
        top: "5%",
        left: "33%",
        borderRadius: "0px 0px 10px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 12
    },

    compManegmentHead: {
        backgroundColor: "#482829",
        height: "32px",
        width: "100%",
        direction: "rtl",
        borderRadius: "10px 10px 0px 0px",
        position: "absolute",
        top: "-24px",
        display: "flex",
        paddingRight: "10px"
    },


    closeButton: {
        border: "none",
        backgroundColor: "transparent",
        color: "white",
        cursor: "pointer"
    },
}

export default styles
