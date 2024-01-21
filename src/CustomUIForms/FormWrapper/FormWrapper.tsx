import './FormWrapper.css'
interface Props extends React.HTMLProps<HTMLDivElement>{
  children: React.ReactNode;
}

function FormWrapper({children, ...props}:Props) {
  return (
    <div className="form-wrapper-trait-manager" {...props}>
      {children}
    </div>
  );
}

export default FormWrapper;