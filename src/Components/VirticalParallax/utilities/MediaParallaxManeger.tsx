import { useState, useEffect } from "react";
import {ImgParallax} from "../interfaces/ImgParallax";
import Image from "../../../Plugins/Image/Image.tsx";
import styles from "../styles/MediaParallaxManeger.ts";
import Label from "../../../CustomUIForms/Label/Label.tsx";
import TextInput from "../../../CustomUIForms/TextInput/TextInput.tsx";
import { observer } from "mobx-react";
import traitManagerStore from "../../../GlobalStates/TraitManegerStore.ts";
import { runInAction } from "mobx";

const MediaParallaxManager: React.FC = observer(() => {
  const { tempVerticalParallexCards, setTempVerticalParallexCards } = traitManagerStore;
  const {tempVerticalBackgroundSize ,setTempVerticalBackGroundSize} = traitManagerStore;
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [selectedColIndex, setSelectedColIndex] = useState(0);
  const [image, setImage] = useState(tempVerticalParallexCards?.parallaxItems[selectedRowIndex][selectedColIndex]?.img);
  const [effect, setEffect] = useState(tempVerticalParallexCards?.parallaxItems[selectedRowIndex][selectedColIndex]?.effect);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(1);

  const [ backGroundSize , setBackGroundSize ]  = useState("cover");

  
  useEffect(() => {
    setImage(tempVerticalParallexCards?.parallaxItems[selectedRowIndex][selectedColIndex]?.img);
    setEffect(tempVerticalParallexCards?.parallaxItems[selectedRowIndex][selectedColIndex]?.effect);
  }, [tempVerticalParallexCards, selectedRowIndex, selectedColIndex]);



  const updateImageInParallax = (newImageSrc: string) => {
    setImage(newImageSrc);
  };
  
  const handleEffectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEffect = parseInt(event.target.value);
    setEffect(newEffect);
  };
  const toggleBackgroundSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isCoverBackground = event.target.checked;
    setBackGroundSize(isCoverBackground ? "cover" : "contain")
  };

  const saveItems =()=>{
    runInAction(() => {
      const updatedItems = tempVerticalParallexCards?.parallaxItems as ImgParallax[][];
      if (updatedItems[selectedRowIndex] && updatedItems[selectedRowIndex][selectedColIndex]) {
        updatedItems[selectedRowIndex][selectedColIndex] = {
          ...updatedItems[selectedRowIndex][selectedColIndex],
          effect: effect as number,
          img:image as string,
        };
        return updatedItems;
      }
      setTempVerticalBackGroundSize({id:tempVerticalBackgroundSize?.id as string, isCover: backGroundSize})
      setTempVerticalParallexCards({id:tempVerticalParallexCards?.id as string, parallaxItems: updatedItems})
    });
  }



  const indexToRowCol = (index: number): { row: number; col: number } => {
    let count = 0;
    for (let row = 0; row < (tempVerticalParallexCards?.parallaxItems as ImgParallax[][]).length; row++) {
      for (let col = 0; col < (tempVerticalParallexCards?.parallaxItems[row] as ImgParallax[]).length; col++) {
        count++;
        if (count === index) {
          return { row, col };
        }
      }
    }
    return { row: 0, col: 0 };
  };

  const selectIndex = (flatIndex: number) => {
    const { row, col } = indexToRowCol(flatIndex);
    setSelectedRowIndex(row);
    setSelectedColIndex(col);
    setSelectedButtonIndex(flatIndex);
  };

  // Toggle backgroundSize when the switch is clicked
  const totalCells = tempVerticalParallexCards?.parallaxItems.reduce((sum, row) => sum + row.length, 0);

  const selectionButtons = Array.from({length: totalCells as number }, (_, i) => {
    const buttonIndex = i + 1;
    const isSelected = buttonIndex === selectedButtonIndex;

    return (
      <button
        style={{
          ...styles.cellNavigator,
          ...(isSelected ? styles.selectedButtonStyles : {}),
        }}
        onMouseOver={(e) => {
          const target = e.currentTarget as HTMLElement;
          const backgroundColor = styles.buttonHoverStyles.backgroundColor || '#cccccc';
          target.style.backgroundColor = backgroundColor;
        }}
        
        onMouseOut={(e) => {
          const target = e.currentTarget as HTMLElement;
          const backgroundColor = isSelected ? styles.cellNavigator.backgroundColor || '#cccccc' : 'transparent'; 
          target.style.backgroundColor = backgroundColor;
        }}
        
        key={buttonIndex}
        onClick={() => selectIndex(buttonIndex)}
      >
        {buttonIndex}
      </button>
    );
  });


  return (
    <div>
      <div style={styles.cellNavCont}>
        <div style={styles.buttonContainer}>
          {/* Switch Button */}
          <Label>
            <input
              type="checkbox"
              checked={backGroundSize === "cover"} // Assuming 'cover' means "on" and 'contain' means "off"
              onChange={toggleBackgroundSize} // Toggle the backgroundSize value
            />
            <span className="slider round"></span>
            image should contain not cover
          </Label>
          <span className="switch-label"></span>
        </div>
      </div>

      <Image image={image as string} setImage={updateImageInParallax} />

      <div style={styles.Input}>
        <Label htmlFor="effectInput" style={{height:"100%", alignSelf:"auto"}}>
        Effect 
        </Label>
        <TextInput
         type="number"
         id="effectInput"
         value={effect}
         onChange={handleEffectChange}
         min="0"
         max="100"
        />
      </div>

      <div style={styles.cellNavCont}>
        <div style={styles.buttonContainer}>{selectionButtons}</div>
      </div>

      
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <button
          style={{ display: 'inline-block',
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
          transition: 'all 0.3s',
          margin:"1rem auto"
          }} onClick={() => saveItems()}>Save Labels</button>
        </div>
    </div>
  );
});

export default MediaParallaxManager;
