import { useEffect, useState } from "react";
import FormPoint from "./FormPoint";

import Button from "./Button";
import { PiCopy, PiTrash } from "react-icons/pi";
import { ItemObject } from "../../interface";
import { FormProps } from "../../interface";
import RenamedImage from "./index";
import useImageLoader from "../hooks/useImageLoader";
import { observer } from "mobx-react";
import traitManagerStore from "../../../../GlobalStates/TraitManegerStore";

const Form = observer(({ items, setItems, img, setImg }: FormProps) => {
  const { tempMappingPointsItems, setTempMappingPointsItems } = traitManagerStore;
  const [current, setCurrent] = useState(0);
  const [currentItem, setCurrentItem] = useState<ItemObject>(tempMappingPointsItems?.items[0] as ItemObject);

  const { height, width, imageLoaded } = useImageLoader(tempMappingPointsItems?.image as string);
  const prev = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  const next = () => {
    setCurrent((prev) => Math.min(prev + 1, (tempMappingPointsItems?.items as ItemObject[]).length - 1));
  };

  useEffect(() => {
    setCurrentItem(tempMappingPointsItems?.items[current] as ItemObject);
  }, [tempMappingPointsItems, current]);

  const addNewItem = () => {
    imageLoaded
      ? setTempMappingPointsItems({id:tempMappingPointsItems?.id as string, 
        image:tempMappingPointsItems?.image as string,
        items:[
          ...tempMappingPointsItems?.items as ItemObject[],
          {
                title: "test 1",
                description: "test 1 description",
                dimensions: [
                  [0, 0],
                  [height as number, width as number],
                ],
                position: "right",
              }
        ]})
      : null;
  };

  useEffect(() => {
    setCurrentItem(tempMappingPointsItems?.items[current] as ItemObject);
  }, [current, tempMappingPointsItems]);

  const updateItemsArray = (updatedItem: ItemObject) => {
    const updatedItems = [...tempMappingPointsItems?.items as ItemObject[]];
    updatedItems[current] = updatedItem;
    setTempMappingPointsItems({id:tempMappingPointsItems?.id as string,image:tempMappingPointsItems?.image as string ,items:updatedItems as ItemObject[]});
  };

  const deleteItem = () => {
    const updatedItems = [...tempMappingPointsItems?.items as ItemObject[]];
    if (!(updatedItems.length > 1)) {
      throw new Error("Cannot delete the last item.")
    } 

    updatedItems.splice(current, 1);
    setTempMappingPointsItems({
      id: tempMappingPointsItems?.id as string,
      image: tempMappingPointsItems?.image as string,
      items: updatedItems as ItemObject[],
    });

    setCurrent((prev) => Math.min(prev, updatedItems.length - 1));
  };
  
  return (
    <div>
      <div
        style={{
          display: "flex",
          // width: "304px",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 auto",
          marginTop: "1rem",
        }}
      >
        <Button onClick={addNewItem} icon={<PiCopy />} text={"Copy"} />
        <Button onClick={deleteItem} icon={<PiTrash />} text={"delete"} />
      </div>

      <RenamedImage image={tempMappingPointsItems?.image as string} setImage={setImg} />
      <FormPoint
        currentItem={currentItem}
        prev={prev}
        next={next}
        idx={current}
        length={(tempMappingPointsItems?.items as ItemObject[]).length}
        updateItemsArray={updateItemsArray}
      />
    </div>
  );
});

export default Form;
