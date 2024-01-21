const styles: { [key: string]: React.CSSProperties } = {

    formCont: {
        display: "flex",
        flexDirection: "column"
    },
    cellNavCont: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "30px"
    },
    labelFormButton: {
        display: 'inline-block',
        padding: '10px 25px',
        fontSize: '16px',
        cursor: 'pointer',
        textAlign: 'center',
        textDecoration: 'none',
        outline: 'none',
        color: 'white',
        backgroundColor: '#ED1C24',
        border: 'none',
        borderRadius: '5px',
        transition: 'all 0.3s',
        marginTop: "20px"
    },

    cellNavigator: {
        marginRight: "10px",
        backgroundColor: "transparent",
        width: "24px",
        height: "24px",
        borderRadius: "10px",
        color: "white",
        border: "none",
        cursor: "pointer"

    },

    buttonHoverStyles: {
        backgroundColor: '#6d6d6d',
    },
    selectedButtonStyles: {
        border: '1px solid white',

    },


}

export default styles;
