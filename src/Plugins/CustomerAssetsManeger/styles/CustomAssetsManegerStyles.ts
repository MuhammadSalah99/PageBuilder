const styles: { [key: string]: React.CSSProperties } = {
    darkBG: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: '100vw',
        height: '300vh',
        zIndex: 45,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
    },
    centered: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 50
    },
    modal: {
        width: '1000px',
        height: "calc(100vh - 30px)",
        background: '#2B1313',
        color: 'white',
        zIndex: 50,
        borderRadius: '19px',
        boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.04)',
    },
    modalHeader: {
        height: '130px',
        background: '#2B1313',
        overflow: 'hidden',
        paddingTop: '15px',
        paddingLeft: '5%',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        display: "flex",
        flexDirection: "column",

    },
    headRow: {
        display: "flex",
        width: "98.5%",
        height: "50px",
        justifyContent: "space-between",
        alignItems: "center"
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
        margin: "25px auto",
        display: "flex",
        height: "calc(100vh - 25px)",
        overflowY: "scroll"


    },

    closeBtn: {
        cursor: 'pointer',
        fontWeight: 500,
        borderRadius: '8px',
        border: 'none',
        fontSize: '26px',
        color: 'white',
        transition: 'all 0.25s ease',
        boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.06)',
    },

    searchContainer: {
        position: 'relative',
        display: 'inline-block',
        width: "87%"
    },

    searchInput: {
        width: "96%",
        height: "30px",
        display: "flex",
        backgroundColor: "#4A2828",
        border: "none",
        borderRadius: "4px",
        color: "#B97272",
        fontSize: '13px',
        paddingLeft: "28px"
    },

    searchIcon: {
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '13px',
        color: "#B97272",
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
        backgroundColor: '#7E262A',
        color: '#F5F4F4',
        border: 'none',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: '3px',
        fontSize: '12px',
        cursor: 'pointer',
        outline: 'none',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s',
        width: "112px",
        height: "32px",
        fontFamily: 'Helvetica Neue',
    },
    uploadedAssets: {
        width: "88%",
        margin: "auto"
    },

    tabButtonsCont: {
        display: "flex",
        height: "45px",
        width: "96%",
        marginBottom: "10px",
        borderBottom: "1px solid #4A2828",
    },

    tabButton: {
        backgroundColor: "transparent",
        width: "90px",
        display: "flex",
        alignItems: "center",
        paddingLeft: "5px",
        border: "none",
        color: "#7B4241",
        cursor: "pointer"
    },

    activeTabButton: {
        color: "white",
        borderBottom: "2px solid #ED1C24"
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


};

export default styles;

