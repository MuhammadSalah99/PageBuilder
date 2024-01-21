const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: "100%",
        height: "100%",
    },
    droppable: {
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "gray",
        cursor: "pointer"
    },
    pointOnHover: {
        backgroundColor: "RGBA(237,28,36,0.78 )",
        borderRadius: "50%",
        position: "absolute",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        opacity: '0'
    },

    onHoverSpan: {
        backgroundColor: "#131313",
        position: "absolute",
        bottom: "-29px",
        left: "-3px",
        color: "white",
        fontWeight: "bold",
        display: "block",
        fontSize: "10px",
        border: "1px solid #ff0",
        whiteSpace: 'nowrap',
        padding: '0.5rem 1rem', // Optional: space around the text.
        zIndex: 50
    },

    onHoverSection: {
        alignItems: "center",
        borderRadius: "23px",
        position: "absolute",
        padding: "10px 5px",
        transition: "all 0.5s",
        zIndex: 20
    },

    onHoverCont: {
        display: "felx",
        margin: "9px auto",
        textAlign: "center",
        height: "99%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "center"
    },

    onHoverTitle: {
        fontSize: "21px",
        marginBottom: "5px",
        fontFamily: "'Helvetica Neue', sans-serif",
    },

    onHoverDesc: {
        margin: "5px auto",
        fontFamily: "'Helvetica Neue', sans-serif",
        width: "80%",
        fontSize: "19px",
        wordWrap: "break-word",
        overflowWrap: "break-word",

    },

    onHoverButton: {
        width: "111px",
        height: "39px",
        border: "1px solid white",
        borderRadius: "4px",
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        fontFamily: "'Helvetica Neue', sans-serif",
    },

    onHoverLink: {
        color: "white",
        textDecoration: "none",
    }

}
export default styles
