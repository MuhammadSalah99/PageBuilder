import { useEffect, useState } from "react";
import FormPoint from "./FormPoint";
import { FormProps, Item } from "../../interfaces";
import traitManagerStore from "../../../../GlobalStates/TraitManegerStore";
import { observer } from "mobx-react";

const Form = observer(({ items, setItems }: FormProps) => {
  // Form strategy
  const { tempHoverGalleryCards, setTempHoverGalleryCards } = traitManagerStore;
  const [current, setCurrent] = useState(0);
  const [currentItem, setCurrentItem] = useState<Item>(tempHoverGalleryCards?.items[0] as Item);

  const prev = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  const next = () => {
    setCurrent((prev) => Math.min(prev + 1, (tempHoverGalleryCards?.items as Item[]).length - 1));
  };

  useEffect(() => {
    setCurrentItem(tempHoverGalleryCards?.items[current] as Item);
  }, [tempHoverGalleryCards, current]);

  const addNewItem = () => {
    setTempHoverGalleryCards({
      id: tempHoverGalleryCards?.id as string,
      items: [
        ...(tempHoverGalleryCards?.items as Item[]),
        { imgId: "", description: "", cta: "", title: "", picTitle: "" },
      ],
    });
  };

  useEffect(() => {
    setCurrentItem(tempHoverGalleryCards?.items[current] as Item);
  }, [current, tempHoverGalleryCards]);

  const updateItemsArray = (updatedItem: Item) => {
    const updatedItems = [...(tempHoverGalleryCards?.items as Item[])];
    updatedItems[current] = updatedItem;
    setTempHoverGalleryCards({ id: tempHoverGalleryCards?.id as string, items: updatedItems });
  };

  const deleteItem = () => {
    const updatedItems = [...(tempHoverGalleryCards?.items as Item[])];
    if (!(updatedItems.length > 1)) {
      throw new Error("cannot delete the last item ");
    }
    updatedItems.splice(current, 1);
    setTempHoverGalleryCards({
      id: tempHoverGalleryCards?.id as string,
      items: updatedItems,
    });

    setCurrent((prev) => Math.min(prev, updatedItems.length - 1));
  };


  return (
    <>
      <FormPoint
        currentItem={currentItem}
        prev={prev}
        next={next}
        idx={current}
        length={(tempHoverGalleryCards?.items as Item[]).length}
        updateItemsArray={updateItemsArray}
        addItem={addNewItem}
        deleteItem={deleteItem}
      />

    </>
  );
});

export default Form;
