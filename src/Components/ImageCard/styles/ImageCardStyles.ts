const styles: { [key: string]: React.CSSProperties } = {
    imageCardCont: {
        width: "100%",
        position: "relative",
        justifyContent: "center",
        display: "flex",
        margin: "0 auto",
        height: "100%"
    },
    card: {
        width: '56%',
        borderRadius: '8px',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: '41%',
        objectFit: 'cover',
        borderRadius: "8px"
    },
    container: {
        padding: '16px',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
        height: "51%",

    },

    title: {
        fontSize: '37px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#333',
        textAlign: "center",
        marginTop: '5px',
        fontFamily: "'Helvetica Neue', sans-serif",
        width: "100%"
    },
    content: {
        fontSize: '14px',
        color: '#969696',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        whiteSpace: 'pre-wrap',
        textOverflow: "ellipsis",
        marginTop: "3px",
        width: "92%",
        height: "190px",
        marginBottom: "10px",
        fontFamily: "'Helvetica Neue', sans-serif",
        overflow: "hidden"
    },

    cardNav: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        cursor: "pointer",
        color: "white",
        fontSize: "15px",
        border: "none",
        top: "50%"
    }, 
    pointerNav: {
        position: "absolute",
        bottom: "22px",
        left: "41%",
        display: "flex",
        justifyContent: "center",
        width: "100px"
    },

    navPoint: {
        fontSize: "24px",
        color: "#D0D0D0",
        width: "24px",
        height: "24px",
        cursor: "pointer"
    },

    navActivePoint: {
        color: "#ED1C24"
    }
};

export default styles;
