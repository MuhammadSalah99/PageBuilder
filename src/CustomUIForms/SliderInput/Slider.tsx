import { InputHTMLAttributes } from 'react';
import './Slider.css';


function Slider(props:InputHTMLAttributes<HTMLInputElement> ) {
  return (
    <input className='slider-input-trait' type="range" {...props} />
  );
}

export default Slider;