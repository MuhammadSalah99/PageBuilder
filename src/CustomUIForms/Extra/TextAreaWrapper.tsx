
function TextAreaWrapper({children}) {
    return (
        <span style={{
            backgroundColor: '#4E2C2C',
            outline: 'none',
            border: 'none',
            width: 'calc(100% - 30px)',
            fontWeight:"400",
            height: '91px',
            fontSize: '16px',
            color: '#ffffff',
            paddingLeft: '15px',
            paddingTop: '12px',
            paddingRight: '7px',
            paddingBottom: '7px',
            borderRadius: '6px',
         }}>
            {children}
         </span>
    );
}

export default TextAreaWrapper;