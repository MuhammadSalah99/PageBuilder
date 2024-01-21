import { useEffect, useState, useSyncExternalStore } from "react";
import {ImgParallax} from "../interfaces/ImgParallax";
import Image from "../../../Plugins/Image/Image.tsx";
import styles from "../styles/MediaParallaxManeger.ts";
import { observer } from "mobx-react";
import Label from "../../../CustomUIForms/Label/Label.tsx";
import TextInput from "../../../CustomUIForms/TextInput/TextInput.tsx";
import traitManagerStore from "../../../GlobalStates/TraitManegerStore.ts";
import { runInAction } from "mobx";

const MediaParallaxManager: React.FC = observer(
  () => {
    const { tempHorizantalParllax, setTempHorizantalParllax } = traitManagerStore;
    const [selectedRowIndex, setSelectedRowIndex] = useState(0);
    const [selectedColIndex, setSelectedColIndex] = useState(0);
    const [image, setImage] = useState(tempHorizantalParllax?.parallaxItems[selectedRowIndex][selectedColIndex]?.img);
    const [effect, setEffect] = useState(
      tempHorizantalParllax?.parallaxItems[selectedRowIndex][selectedColIndex]?.effect
    );
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(1);
    const [ backGroundSize , setBackGroundSize ]  = useState("cover");
    const [dir, setDir] = useState("ltr");
    useEffect(() => {
      setImage(tempHorizantalParllax?.parallaxItems[selectedRowIndex][selectedColIndex]?.img);
      setEffect(tempHorizantalParllax?.parallaxItems[selectedRowIndex][selectedColIndex]?.effect);
    }, [tempHorizantalParllax, selectedRowIndex, selectedColIndex]);

    const updateImageInParallax = (newImageSrc: string) => {
      // runInAction(() => {
      //   const updatedItems = tempHorizantalParllax?.parallaxItems as ImgParallax[][];
      //   if (updatedItems[selectedRowIndex] && updatedItems[selectedRowIndex][selectedColIndex]) {
      //     updatedItems[selectedRowIndex][selectedColIndex] = {
      //       ...updatedItems[selectedRowIndex][selectedColIndex],
      //       img: newImageSrc,
      //     };
      //     return updatedItems;
      //   }
      //   setTempHorizantalParllax({
      //     id: tempHorizantalParllax?.id as string,
      //     dir: tempHorizantalParllax?.dir,
      //     parallaxItems: updatedItems,
      //     backgroundSize: tempHorizantalParllax?.backgroundSize,
      //   });
      // });
      setImage(newImageSrc);
    };

    const handleEffectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newEffect = parseInt(event.target.value);
      // runInAction(() => {
      //   const updatedItems = tempHorizantalParllax?.parallaxItems as ImgParallax[][];
      //   if (updatedItems[selectedRowIndex] && updatedItems[selectedRowIndex][selectedColIndex]) {
      //     updatedItems[selectedRowIndex][selectedColIndex] = {
      //       ...updatedItems[selectedRowIndex][selectedColIndex],
      //       effect: newEffect,
      //     };
      //     return updatedItems;
      //   }
      // });
      setEffect(newEffect);
    };
    const toggleBackgroundSize = (event: React.ChangeEvent<HTMLInputElement>) => {
      const isCoverBackground = event.target.checked;
      setBackGroundSize(isCoverBackground ? "cover":"contain");
      // setTempHorizantalParllax({
      //   id: tempHorizantalParllax?.id as string,
      //   dir: tempHorizantalParllax?.dir,
      //   parallaxItems: tempHorizantalParllax?.parallaxItems as ImgParallax[][],
      //   backgroundSize: isCoverBackground ? "cover" : "contain",
      // });
    };
    const toggleDir = (event: React.ChangeEvent<HTMLInputElement>) => {
      const isRTL = event.target.checked;
      setDir(isRTL ? "ltr":"rtl");
      // setTempHorizantalParllax({
      //   id: tempHorizantalParllax?.id as string,
      //   dir: isRTL ? "ltr" : "rtl",
      //   parallaxItems: tempHorizantalParllax?.parallaxItems as ImgParallax[][],
      //   backgroundSize:tempHorizantalParllax?.backgroundSize,
      // });
    };

    const saveItems =()=>{
            runInAction(() => {
        const updatedItems = tempHorizantalParllax?.parallaxItems as ImgParallax[][];
        if (updatedItems[selectedRowIndex] && updatedItems[selectedRowIndex][selectedColIndex]) {
          updatedItems[selectedRowIndex][selectedColIndex] = {
            ...updatedItems[selectedRowIndex][selectedColIndex],
            effect: effect as number,
            img:image as string,
          };
          return updatedItems;
        }
        setTempHorizantalParllax({id:tempHorizantalParllax?.id as string, parallaxItems: updatedItems , dir:dir, backgroundSize:backGroundSize})
      });
    }

    const indexToRowCol = (index: number): { row: number; col: number } => {
      let count = 0;
      for (let row = 0; row < (tempHorizantalParllax?.parallaxItems as ImgParallax[][]).length; row++) {
        for (let col = 0; col <( tempHorizantalParllax?.parallaxItems[row] as ImgParallax[]).length; col++) {
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
    const totalCells = tempHorizantalParllax?.parallaxItems.reduce((sum, row) => sum + row.length, 0) as number;

    const selectionButtons = Array.from({ length: totalCells }, (_, i) => {
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
                checked={backGroundSize === "cover" ? true : false} // Assuming 'cover' means "on" and 'contain' means "off"
                onChange={toggleBackgroundSize} // Toggle the backgroundSize value
              />
              <span className="slider round"></span>
              image should contain not cover
            </Label>
            <span className="switch-label"></span>
          </div>
        </div>
        <div style={styles.cellNavCont}>
          <div style={styles.buttonContainer}>
            {/* Switch Button */}
            <Label>
              <input
                type="checkbox"
                checked={dir === "ltr" ? true : false} // Assuming 'ltr' means "on" and 'rtl' means "off"
                onChange={toggleDir} //
              />
              <span className="slider round"></span>
              Direction should LTR not RTL
            </Label>
            <span className="switch-label"></span>
          </div>
        </div>

        <Image image={image as string} setImage={updateImageInParallax} />

        <div style={styles.Input}>
          <Label htmlFor="effectInput" style={{ height: "100%", alignSelf: "auto" }}>
            Effect
          </Label>
          <TextInput type="number" id="effectInput" value={effect} onChange={handleEffectChange} min="0" max="100" />
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
  }
);

export default MediaParallaxManager;
