import { LatLngBoundsExpression } from "leaflet";
// Single Item contains title, dimensions, position, and description

export interface TempMappingPoints{
  id:string;
  image:string;
  items:ItemObject[];
}
export interface ItemObject {
  title?: string;
  dimensions?: LatLngBoundsExpression;
  position?: string;
  description?: string;
}
export interface FormProps {
  items: ItemObject[];
  setItems: (i: ItemObject[]) => void;
  img: string;
  setImg: (i: string) => void;
}

export interface FormPointProps {
  currentItem: ItemObject;
  prev: () => void;
  next: () => void;
  idx: number;
  length: number;
  updateItemsArray: (i: ItemObject) => void;
}
export interface FormPosition {
  dim: LatLngBoundsExpression;
  setDim: (dim: LatLngBoundsExpression) => void;
}

export interface PointOfProps {
  bounds: LatLngBoundsExpression;
  active?: boolean;
  setBounds?: () => void;
  otherBounds?: LatLngBoundsExpression;
}

export interface labelTextProp{
  labelTitle: string;
  labelDescreption: string;
  position: string;
}