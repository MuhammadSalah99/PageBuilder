import { SharedProps } from './index';
import { Dispatch, SetStateAction } from "react";

export interface Item {
  imgId: string;
  picTitle: string;
  title: string;
  description: string;
  cta?: string;
  idx?: number;
}

export interface TempHoverGalleryItems{
  id:string;
  items: Item[];
}

export interface Layer {
  isActive?: boolean;
  link: string;
  easeIn?: boolean;
  easeOut?: boolean;
  easeInOut?: boolean;
  onClick: () => void;
}

export interface TitleSMProps {
  isActive: boolean;
  title?: string;
  picTitle: string;
  description: string;
  cta?: string;
  idx: number;
  onClick: () => void;
  editingMode:(i:string,x:string,j:number)=>void;
}

export interface FormProps {
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
}


export interface CurrentItemProps{
  imgId: string;
  picTitle: string;
  title: string;
  description: string;
  cta: string;
}

export interface FormItemProps{
  currentItem:Item;
  prev: () => void;
  next: () => void;
  idx: number;
  length: number;
  updateItemsArray: (i: CurrentItemProps) => void;
  addItem: () => void;
  deleteItem: () => void;
}

export interface SharedProps{
  editingMode:(i:string,j:string,k:number)=>void;
   index:number;
}

export interface NewTitleProps extends SharedProps{
  headingStyles:React.CSSProperties;
  picTitle:string; 

}

