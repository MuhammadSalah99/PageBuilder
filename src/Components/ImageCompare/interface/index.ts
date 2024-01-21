
export interface IProps {
  aspectRatio?: "taller" | "wider";
  handle?: React.ReactNode;
  handleSize?: number;
  hover?: boolean;
  leftImageAlt?: string;
  leftImageCss?: object;
  onSliderPositionChange?: (position: number) => void;
  rightImageAlt?: string;
  rightImageCss?: object;
  skeleton?: React.ReactNode;
  sliderLineColor?: string;
  sliderLineWidth?: number;
  sliderPositionPercentage?: number;
  vertical?: boolean;
  compId:string;
}

export interface ImageComparison {
  rightImage: string; 
  rightImageHeader: string;
  rightImageDescription: string;
  leftImage: string;
  leftImageHeader: string;
  leftImageDescription: string;
  isAuto?:boolean;
  delay:number;
  step:number
}

export interface TempImageComparisonCards{
  id:string;
  cards:ImageComparison;
}

export interface StylesProps {
  horizontal:boolean;
  containerWidth:number;
  sliderPosition:number;
  containerHeight:number;
  rightImageCss:React.CSSProperties;
  leftImageCss:React.CSSProperties;
  hover:boolean;
  handleSize:number;
  sliderLineWidth:number;
  sliderLineColor:string;
  isSliding:boolean;
}

export interface ImageSectionProps{
  onload:()=> void;
  imageAlt:string;
  imageRef:React.RefObject<HTMLImageElement>;
  src:string;
  style:React.CSSProperties;
  testId?:string;
}

export interface HandleProps {
  slider: React.CSSProperties;
  line: React.CSSProperties;
  handle: string;
  handleCustom: React.CSSProperties;
  handleDefault: React.CSSProperties;
  leftArrow: React.CSSProperties;
  rightArrow: React.CSSProperties;
}


export interface HeadingLabelProps {
  labelContainer: React.CSSProperties;
  label: React.CSSProperties;
  heading: React.CSSProperties;
  imageHeader: string;
  description: string;
  paragraph: React.CSSProperties;
  editing:boolean;
  setEditing:(i:boolean)=>void;
  onTitleChange:(i:string)=>void;
  onDescreptionChange:(i:string)=>void;
}

export interface FormComponentProps {
  titleName?: string;
  title: string;
  setTitle: (i: string) => void;
  titleLabel: string;

  descName?: string;
  description: string;
  setDescription: (i: string) => void;
  descLabel: string;
}


export interface sideSections {
  onLoad: () => void;
  alt: string;
  imageRef: React.RefObject<HTMLImageElement>;
  src: string;
  imageStyle: React.CSSProperties;
  header?: string;
  editing: boolean;
  setEditing: (i: boolean) => void;
  labelContainerStyle: React.CSSProperties;
  labelStyles: React.CSSProperties;
  headingStyles: React.CSSProperties;
  imageHeader: string;
  imageDescreption: string;
  paragraphStyles: React.CSSProperties;

  onTitlechange:(i:string)=>void;

  onDescreptionChange:(i:string) =>void;
}