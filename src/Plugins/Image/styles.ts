const styles: { [key: string]: React.CSSProperties } = {
    selectedImgCont: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "193px",
        cursor: "pointer"
    },
    selectedImage: {
        width: "82%",
        height: "72%",
        backgroundSize: "cover",
        marginTop: "26px",
        borderRadius: "11px"
    },
    editButtonsCont: {
        width: "100px",
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px"
    },
    editButton: {
        border: "none",
        background: "#482829",
        height: "32px",
        width: "37px",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "Center",
        color: "white",
        cursor: "pointer"
    },
}

export default styles
