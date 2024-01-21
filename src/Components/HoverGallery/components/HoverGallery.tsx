import { useEffect, useState } from "react";
import { IMG1_PATH, IMG2_PATH, IMG3_PATH, IMG4_PATH } from "../assets";
import { TitleSM } from "../utils/preview/TitleSM";
import { LayerSM } from "../utils/preview/LayerSM";
import Form from "../utils/Form/Form";
import { Item } from "../interfaces";
import { styles } from "../styles/styles";
import traitManagerStore from "../../../GlobalStates/TraitManegerStore";
import useCustomId from "../../ImageCompare/useComponentId";
import { observer } from "mobx-react";

const defaultVal=[
  { imgId: IMG1_PATH, picTitle: `1`, title: `Test Feature1`, description: `Test Feature`, cta: "" },
  { imgId: IMG2_PATH, picTitle: "2", title: "Test Feature2", description: `Test Feature`, cta: "" },
  { imgId: IMG3_PATH, picTitle: "3", title: "Test Feature3", description: `Test Feature`, cta: "" },
  { imgId: IMG4_PATH, picTitle: "4", title: "Test Feature4", description: `Test Feature`, cta: "" },
]
const HoverGallery = observer(() => {
  const { openTraitManeger, setOpenTraitManeger, setComponentManeger, componentManeger, tempHoverGalleryCards, setTempHoverGalleryCards} = traitManagerStore;
  const id = useCustomId();

  const [shown, setShown] = useState(-1);
  const [items, setItems] = useState<Item[]>(defaultVal);
  
  useEffect(() => {
    if (tempHoverGalleryCards?.id === id) {
        setItems(tempHoverGalleryCards.items);
    }
}, [tempHoverGalleryCards]);

const addTraitManeger=()=>{
  setTempHoverGalleryCards({id:id, items:items})
  setComponentManeger(<Form items={items} setItems={setItems} />)
  setOpenTraitManeger(true);
}

const editingMode = (field: string, value: string, index: number) => {
  if (!tempHoverGalleryCards) return;

  const updatedItems = tempHoverGalleryCards.items.map((item, i) => {
    if (i === index) {
      return {
        ...item,
        [field]: value,
      };
    }
    return item;
  });

  setTempHoverGalleryCards({ id: tempHoverGalleryCards.id, items: updatedItems });
};




  return (
    <>
      <div
        onClick={() => addTraitManeger()}
        style={styles.galleryOuterWrapper}
      >
        <div
          style={styles.galleryInnerWrapper}
        >
          <div
            style={styles.galleryPlacement}
          >
            <div
              style={styles.internalWrapper}
            >
              <div style={styles.flexContainer}>
                {items.map((img, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      minWidth: shown === idx ? "100%" : "0px",
                      position: "relative",
                      overflow: "hidden",
                      width: `${(100 - (items.length - 1)) / items.length}%`,
                      transition: "min-width 0.5s ease",
                    }}
                    onClick={() => setShown(idx)}
                  >
                    <LayerSM link={img.imgId} isActive={shown === idx} easeIn={true} onClick={() => setShown(-1)} />
                    <TitleSM
                      key={idx}
                      onClick={() => setShown(idx)}
                      title={img.title}
                      picTitle={img.picTitle}
                      description={img.description}
                      cta={img.cta}
                      isActive={shown === idx}
                      idx={idx}
                      editingMode={editingMode}
                    />
                  </div>
                ))}
              </div>
              {items.length === 0 && (
                <h3 style={styles.errorComponent}>Add more Items!</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default HoverGallery;
