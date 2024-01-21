import { Suspense, useEffect, useRef, useState } from "react";
import defaultImage from "../../assets/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass.png";
import { CRS, LatLngBoundsExpression } from "leaflet";
import { MapContainer, ImageOverlay } from "react-leaflet";
import PointToObserve from "./Utils/PointToObserve";
import Point from "./Utils/Point";
import "leaflet/dist/leaflet.css";
import Form from "./Utils/Form/Form";
import { ItemObject } from "./interface";
import useImageLoader from "./Utils/hooks/useImageLoader";
import { componentStyles } from "./Styles/styles";
import traitManagerStore from "../../GlobalStates/TraitManegerStore";
import useCustomId from "../ImageCompare/useComponentId";
import { observer } from "mobx-react";

const MappingPoints=observer(()=> {
  const { openTraitManeger, setOpenTraitManeger, setComponentManeger, componentManeger,tempMappingPointsItems, setTempMappingPointsItems} = traitManagerStore;
  const id = useCustomId();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [image, setImage] = useState(tempMappingPointsItems?.image as string);
  const { height, width, imageLoaded } = useImageLoader(image);
  // the items for now are represented
  
  useEffect(()=>{
    setTempMappingPointsItems({id:id, items:items, image:defaultImage})
  },[])
  
  const [items, setItems] = useState<ItemObject[]>([
    {
      title: "Golden Dome 0",
      dimensions: [
        [0, 0],
        [986, 1247],
      ],
      position: "right",
      description: "test test test ",
    },
    {
      title: "Golden Dome 1",
      dimensions: [
        [300, width!+500],
        [200, width!+500],
      ],
      position: "right",
      description: "test test test ",
    },
    {
      title: "Golden Dome 2",
      dimensions: [
        [0, 0],
        [986, 1247],
      ],
      position: "right",
      description: "test test test ",
    },
  ]);

  const [bounds, setBounds] = useState<ItemObject>(items[0]);

  useEffect(() => {
    if (tempMappingPointsItems?.id === id) {
        setItems(tempMappingPointsItems.items);
        setImage(tempMappingPointsItems.image)
    }
}, [tempMappingPointsItems]);

const addTraitManeger=()=>{
  setTempMappingPointsItems({id:id, image:image, items:items})
  setComponentManeger( <Form items={items} setItems={setItems} img={image} setImg={setImage} />)
  setOpenTraitManeger(true);
}

  return (
    <>
      <Suspense fallback={<p>Loading ...</p>}>
        {imageLoaded && height != 0 && width != 0 && (
          <>
            <MapContainer
              center={[(height as number) / 2, (width as number) / 2]}
              zoom={0}
              maxBoundsViscosity={1.0}
              maxBounds={[
                [0, 0],
                [height, width],
              ]}
              dragging={false}
              zoomControl={false}
              style={componentStyles.mapContainer}
              scrollWheelZoom={false}
              minZoom={0}
              crs={CRS.Simple}
              attributionControl={false}
            >
              <ImageOverlay
                url={image}
                bounds={[
                  [0, 0],
                  [height as number, width as number],
                ]}
              />

              {bounds && <Point bounds={bounds.dimensions as LatLngBoundsExpression} />}
            </MapContainer>
          </>
        )}
        <div onClick={() => addTraitManeger()} ref={containerRef} style={componentStyles.pointsContainerWrapper}>
          {items.map((item, idx) => (
            <PointToObserve
              containerRef={containerRef.current as HTMLDivElement}
              key={idx}
              idx={idx}
              setBounds={(i) => setBounds(items[i])}
              length={items.length}
              item={item.title as string}
              itemDescreption={item.description as string}
              position={item.position as string}
            />
          ))}
        </div>
      </Suspense>
    </>
  );
})

export default MappingPoints;
