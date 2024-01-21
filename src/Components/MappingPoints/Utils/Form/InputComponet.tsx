
interface CustomComponentProps {
    title: string;
    placeholder: string;
    name: string;
    label:string;
    setTitle:(title:string)=>void;
  }
  
  const InputComponet= ({ title, setTitle , placeholder, name,label }:CustomComponentProps) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '70px',
          width: '324px',
          fontFamily: 'Helvetica Neue',
          marginTop:"1rem"
        }}
      >
        <label
          htmlFor={name}
          title={title}
          style={{
            color: '#A3A3A3',
            fontFamily: 'Helvetica Neue',
            fontSize: '0.75rem',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            paddingLeft: '0.56rem',
            paddingBottom: '0.44rem',
          }}
        >
          {label}
        </label>
        <input
          type="text"
          placeholder={placeholder}
          name={name}
          id={name}
          style={{
            width: '20.25rem',
            height: '3rem',
            flexShrink: 0,
            borderRadius: '0.375rem',
            opacity: 0.8038,
            background: '#4E2C2C',
            outline: 'none',
            color: '#FFF',
            fontSize: '1rem',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            paddingLeft: '1.06rem',
            paddingTop: '0.88rem',
            paddingBottom: '0.94rem',
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    );
  };
  
  export default InputComponet;
  