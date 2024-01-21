import { useEffect, useState } from "react";

// swap the order of the item you are on with another one you select
function SpotOrder({
  items,
  setItems,
  activeIndex,
}: {
  items: Item[];
  setItems: (items: Item[]) => void;
  activeIndex: number;
}) {
  const [selected, setSelected] = useState(activeIndex);

  useEffect(() => {
    if (items && activeIndex != -1) {
      setSelected(activeIndex);
    }
  }, [activeIndex, items]);
  
  const swap = (activeIdx:number, idxToChangeTo:number) => {
    if (activeIdx!== idxToChangeTo) {
      const updatedItems = [...items];
      [updatedItems[activeIdx], updatedItems[idxToChangeTo]] = [updatedItems[idxToChangeTo], updatedItems[activeIdx]];
      setItems(updatedItems);
    }
  };

  const handleSelectChange = (event) => {
    const selectedIndex = parseInt((event.target as HTMLSelectElement).value, 10);
    setSelected(selectedIndex);
    swap(activeIndex,selectedIndex)
  };

  return (
    <div
      style={{...formStyles.spotOrderHolder }}
    >
      <p
        style={{
          fontSize: "12px",
          fontWeight: "400",
          lineHeight: "normal",
          height: "15px",
          width: "63px",
          color: "#bababa",
          fontFamily: `Helvetica Neue`,
        }}
      >
        Spot Order
      </p>

      <select
        style={{ height: "28px", width: "69px", backgroundColor: "#462627", border: "none", color: "white" }}
        onChange={handleSelectChange}
        value={selected}
      >
        {items.map((_, idx) => (
          <option style={{ color: "white" }} value={idx}>
            {idx + 1}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SpotOrder;
