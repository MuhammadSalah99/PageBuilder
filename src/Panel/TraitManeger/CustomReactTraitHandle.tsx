
interface Props{
  type:string;
}

function CustomReactTraitHandle({type}:Props) {
  return (
    <div>
      {type}
    </div>
  );
}

export default CustomReactTraitHandle;