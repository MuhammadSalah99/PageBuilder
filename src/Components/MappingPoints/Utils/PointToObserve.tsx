import { useEffect, useRef } from "react";
import LabelText from "./LabelText";
import { componentStyles } from "../Styles/styles";

interface Props {
  containerRef: HTMLDivElement;
  idx: number;
  setBounds: (i: number) => void;
  item: string;
  length?:number;
  itemDescreption:string;
  position:string;
}

function PointToObserve({ containerRef, idx, setBounds, item ,length,itemDescreption,position}: Props) {
  const pointRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const pointObserverOptions = { root: containerRef, threshold: 0.05 };

    const videoObserver = new IntersectionObserver((event) => {
      if (event[0].isIntersecting && event[0].intersectionRatio >= 0.05) {
        setBounds(idx);
      }

    }, pointObserverOptions);

    videoObserver.observe(pointRef.current!);
    return()=>{
      videoObserver.disconnect()
    }
  }, []);


  useEffect(()=>{
    const iframe = document.querySelector("iframe") as HTMLIFrameElement;
    function resetScrollBars(){
      if(iframe.contentWindow?.scrollY === 0){
        setBounds(0);
      }

      if(iframe.contentWindow?.scrollY === (iframe.contentWindow?.innerHeight as number)*(length as number -1)){
        setBounds(0)
      }
    }
    iframe.contentWindow?.addEventListener("scroll", resetScrollBars);

    return()=>{
        iframe.contentWindow?.removeEventListener("scroll",resetScrollBars)
    }
  },[length,setBounds])



  return (
    <div
      ref={pointRef}
      style={componentStyles.pointToObserveWrapper}
    >
      <LabelText labelTitle={item} labelDescreption={itemDescreption} position={position}/>
    </div>
  );
}

export default PointToObserve;
