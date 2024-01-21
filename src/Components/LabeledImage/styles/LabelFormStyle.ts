const styles: { [key: string]: React.CSSProperties } = {
    labelFormCont: {
        width: "400px",
        height: "485px",
        backgroundColor: "#1e1e1e",
        position: "absolute",
        top: "5%",
        left: "33%",
        borderRadius: "0px 0px 10px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    compManegmentHead: {
        backgroundColor: "#131313",
        height: "32px",
        width: "100%",
        direction: "rtl",
        borderRadius: "10px 10px 0px 0px",
        position: "absolute",
        top: "-24px",
        display: "flex",
        paddingRight: "10px"
    },
    showStylesButton: {
        width: "100%",
        height: "40px",
        border: "none",
        backgroundColor: "none",
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
        fontSize: "17px",
        color: 'white',
        padding: "0px",
        marginBottom: "10px"
    },
    closeButton: {
        border: "none",
        backgroundColor: "transparent",
        color: "white",
        cursor: "pointer"
    },
    compFormManegment: {
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
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
        background: "transparent",
        color: "white",
        cursor: "pointer"
    },
    compManegmentContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "95%",
        borderRadius: "4px",
        flexDirection: "column",
        height: "507px"
    },

    labelForm: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        color: "white",

    },

    labelFormInput: {
        padding: '10px',
        borderRadius: '4px',
        backgroundColor: "#482829",
        width: "29px",
        height: "6px",
        color: "white",
        border: "none",
        fontSize: "12px"
    },

    labelFormCaptionCont: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "15px"
    },

    labelSingleFieldCont: {
        display: "flex",
        height: "50px",
        flexDirection: "column",
        justifyContent: "flex-end",
        marginTop: "20px"
    },

    rowTitle: {
        fontSize: "11px",
        color: "#BABABA",
        fontFamily: 'Helvetica Neue',
    },

    rowInput: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "34%"
    },

    labelInput: {
        fontSize: "13px",
        color: "#BABABA",
        fontFamily: 'Helvetica Neue',
    },

    labelFormCaption: {
        padding: '10px',
        borderRadius: '4px',
        backgroundColor: "#482829",
        width: "92%",
        height: "14px",
        color: "white",
        border: "none",
        marginBottom: "15px"

    },

    labelFormTextArea: {

        padding: '10px',
        borderRadius: '4px',
        backgroundColor: "#482829",
        width: "92%",
        height: "148px",
        color: "white",
        border: "none",
        resize: "none"
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
        transition: 'all 0.3s'
    },

    addItemButton: {
        backgroundColor: "transparent",
        border: "none",
        color: "white",
        padding: "8px",
        fontSize: "11px",
        borderRadius: "8px",
        width: "80px",
        cursor: "pointer"
    },
    labelFormButtonConts: {
        position: "absolute",
        top: "-70px",
        right: "10px",
        width: "100px",
        height: "23px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white"
    },

    labelSelector: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
        backgroundColor: "transparent",
        fontSize: "21px",
        color: "white",
        cursor: "pointer"

    },

    labelNavigatorCont: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    labelNavigatorButtons: {
        backgroundColor: "#7A5756",
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        color: "white",
        fontSize: "17px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    labelAddButton: {
        backgroundColor: "RGBA(255,255,255,0.98)",
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        color: "#F7181C",
        fontSize: "17px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonHoverStyles: {
        backgroundColor: '#F7181C',
    },

    selectedButtonStyles: {
        backgroundColor: '#F7181C',
    },

    labelsButtonsCont: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: "15px",
        flexWrap: "wrap"
    },

    labelsButton: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "56px",
        width: "42px"
    },

    navButtonP: {
        fontSize: "11px",
        color: "white",
        margin: "none",
        marginTop: "2px"
    },

    error: {
        color: '#cc3300',
        fontSize: "10px",
        marginTop: "10px"
    },

    rangeInput: {
        width: '100%',
        margin: '10px 0',
        height: "2px",
        backgroundColor: "#462627"
    },
    webkitSliderThumb: {
        WebkitAppearance: 'none',
        appearance: 'none',
        width: '15px',
        height: '15px',
        backgroundColor: '#ED1C24',
        cursor: 'pointer',
        borderRadius: '50%',
    },
    webkitSliderTrack: {
        WebkitAppearance: 'none',
        width: '100%',
        height: '2px',
        backgroundColor: '#462627',
        borderRadius: '5px',
    },
    mozRangeThumb: {
        width: '15px',
        height: '15px',
        backgroundColor: '#ED1C24',
        cursor: 'pointer',
        borderRadius: '50%',
    },
    mozRangeTrack: {
        width: '100%',
        height: '2px',
        backgroundColor: '#462627',
        borderRadius: '5px',
    },

    labelForSingleField: {
        fontSize: "10px",
        color: "#A3A3A3",
        marginBottom: "7px"
    }


}
export default styles

