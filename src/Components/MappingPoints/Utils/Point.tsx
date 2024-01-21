import { useEffect } from "react";
import { Rectangle, useMap } from "react-leaflet";
import { PointOfProps } from "../interface";

const whiteColor = { fill:false , color:"red" };

function Point({ bounds }: PointOfProps) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);

  return map ? <Rectangle bounds={bounds} pathOptions={whiteColor} /> : null;

}

export default Point;
