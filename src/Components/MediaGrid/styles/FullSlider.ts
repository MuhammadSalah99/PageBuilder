const styles: { [key: string]: React.CSSProperties } = {
    darkBG: {
        backgroundColor: 'rgba(34,34,34,.95)',
        width: '151vw',
        height: '123vh',
        zIndex: 45,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
    },
    prevButton: {
        backgroundColor: "transparent",
        color: "white",
        border: "none",
        fontSize: "45px",
        position: "absolute",
        left: "-33%",
        top: "35%",
        width: "45px",
        height: "45px",
        cursor: "pointer",
    },

    nextButton: {
        backgroundColor: "transparent",
        color: "white",
        border: "none",
        fontSize: "45px",
        position: "absolute",
        right: "-39%",
        top: "35%",
        width: "45px",
        height: "45px",
        cursor: "pointer"
    },
    centered: {
        position: 'fixed',
        top: '70%',
        left: '100%',
        transform: 'translate(-50%, -50%)',
        zIndex: 50,
        display: "flex",
        justifyContent: 'Center',
        alignItems: 'center',

    },
    modal: {
        width: '850px',
        height: '572px',
        color: 'white',
        zIndex: 50,
        borderRadius: '16px',
        boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.04)',
    },
    modalHeader: {
        height: '90px',
        background: '#1e1e1e',
        overflow: 'hidden',
        paddingTop: '15px',
        paddingLeft: '20px',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        borderBottom: '1px solid black',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: "20px",

    },
    heading: {
        margin: 0,
        color: 'white',
        fontWeight: 500,
        fontSize: '18px',
        textAlign: 'left',
    },

    modalActions: {
        width: '100%',
        paddingTop: '15px',
        paddingLeft: '20px',
        height: "84%",
        display: "flex",


    },

    closeBtn: {
        cursor: 'pointer',
        fontWeight: 500,
        padding: '4px 8px',
        borderRadius: '8px',
        border: 'none',
        width: "45px",
        height: "45px",
        fontSize: '45px',
        color: 'white',
        background: 'transparent',
        transition: 'all 0.25s ease',
        boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.06)',
        position: 'absolute',
        right: "-40%",
        top: "-10%",
        alignSelf: 'flex-end',
    },

    droppable: {
        width: "53%",
        height: "300px",
        backgroundColor: "#1e1e1e",
        cursor: "pointer",
        border: '3px dashed white',
        position: "relative",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "scroll"

    },
    droppableInput: {
        width: "100%",
        height: "100%",
        cursor: "pointer",
        display: "none"
    },
    buttonStyle: {
        backgroundColor: '#256cfa',
        color: 'white',
        border: 'none',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: '5px',
        fontSize: '13px',
        cursor: 'pointer',
        outline: 'none',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s',
        width: "112px",
        height: "32px"
    },
    uploadedAssets: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative"
    },

    uploadedAssetsHeader: {
        width: "100%",
        padding: "0px 5px 5px 5px",
        height: "36px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },

    tabButtonsCont: {
        display: "flex",
        marginLeft: "20px",
        height: "45px",
        marginBottom: "10px"
    },

    tabButton: {
        backgroundColor: "transparent",
        border: "none",
        marginLeft: "10px",
        color: "white",
        cursor: "pointer"
    },

    activeTabButton: {
        backgroundColor: "#333",
        color: "#5591f8",
    },

    uploadedAssetsHeaderForm: {
        display: "flex",
        width: "90%",
        justifyContent: "space-between"
    },

    uploadAssetsInput: {
        backgroundColor: "#272727",
        color: "#9a9a9a",
        height: "26px",
        width: "230px"
    },

    uploadAssetsButton: {
        height: "26.7px",
        width: "84.7px",
        backgroundColor: "gray",
        color: "white",
        border: "none"
    },

    uploadedAssetsPreview: {
        height: "92%",
        width: "100%",
        padding: "0px 20px",
        position: "relative"

    },
    labelFormCont: {
        width: "100%",
        height: "100%",
    },

    addLabelsArea: {
        border: "1px solid white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "215px",
        padding: "10px",
    },

    labelForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        marginBottom: '20px',
        marginTop: "24px"

    },

    labelFormPos: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    labelFormInput: {
        padding: '10px',
        borderRadius: '4px',
        backgroundColor: "#2f2f2f",
        width: "156px",
        height: "32px",
        color: "gray",
        marginTop: "7px",
        border: "none"
    },

    labelFormCaptionCont: {
        display: "flex",
        flexDirection: "column"
    },

    labelFormCaption: {
        padding: '10px',
        borderRadius: '4px',
        backgroundColor: "#2f2f2f",
        width: "100%",
        height: "32px",
        color: "gray",
        border: "none",
        marginTop: "5px"

    },
    labelFormButton: {
        display: 'inline-block',
        padding: '10px 25px',
        fontSize: '16px',
        cursor: 'pointer',
        textAlign: 'center',
        textDecoration: 'none',
        outline: 'none',
        color: '#fff',
        backgroundColor: 'rgb(37 108 250)',
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
        top: "-4px",
        right: "10px",
        width: "100px",
        height: "23px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
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

    progressBars: {
        display: "flex",
        flexDirection: "column",
        height: "90%",
        width: "90%",
        overflowY: "scroll"
    },


}

export default styles;
