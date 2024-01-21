
  import rightImageString from '../../Components/ImageCompare/assets/24rddd.png';
  import leftImageString from '../../Components/ImageCompare/assets/23.png';
import { action, makeObservable, observable } from 'mobx';
import { useId } from 'react';
export class ImageCompareStore{
    componentId:string = useId(); // make it only readable;
    rightImage:string = rightImageString;
    leftImage:string = leftImageString;
    
    rightHeader:string= "2024";
    rightImageDescription:string ="Color";

    leftHeader:string= "2024";
    leftImageDescription:string ="Color";
    
    constructor(){
        makeObservable(this,{
            componentId:observable,
            rightImage:observable,
            leftImage:observable,
            rightHeader:observable,
            leftHeader:observable,
            rightImageDescription:observable,
            leftImageDescription:observable,

            setRightImage:action,
            setLeftImage:action,
            setRightHeader:action,
            setLeftHeader:action,
            setRightImageDescription:action,
            setLeftImageDescription:action,
            
        })
    }

    setRightImage=(newRightImage:string)=>{
        this.rightImage = newRightImage;
    }
    
    setLeftImage=(newLeftImage:string)=>{
        this.leftImage = newLeftImage;
    }
    
    setRightHeader =(newRightHeader:string)=>{
        this.rightHeader =newRightHeader;
    }
    
    setLeftHeader = (newLeftHeader:string)=>{
        this.leftHeader =newLeftHeader;
    }
    
    setRightImageDescription=(rightD:string)=>{
        this.rightImageDescription =rightD;
    }

    setLeftImageDescription=(leftD:string)=>{
        this.leftImageDescription =leftD;
    }
}