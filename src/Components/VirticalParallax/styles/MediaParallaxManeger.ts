const styles: { [key: string]: React.CSSProperties } = {
    cellNavCont: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "30px"
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
    Input: {
        display: 'flex',
        alignItems: 'center', // Center vertically
        justifyContent: 'center', // Center horizontally
        position: "relative",
        top: '15px'
    },

    labelStyle: {
        color: "#fafafa",
        marginRight: '10px', // Add some spacing between label and input, adjust as needed.
    },

}

export default styles;
