import { makeObservable, observable, action } from 'mobx';
import { TempCardInterface,  TempNavButtonStyle, TempBulletStyle} from '../Components/ImageCard/interfaces/CardInterface';
import { TempLabels } from '../Components/LabeledImage/interfaces/LabelInterfaces';
import { TempImgGrid } from '../Components/MediaGrid/interfaces/ImgGrid';
import { TempVerticalParallax } from '../Components/VirticalParallax/interfaces/ImgParallax';
import { TempHorizantalParllax } from '../Components/HorizontalParallax/interfaces/ImgParallax';
import { TempImageComparisonCards } from '../Components/ImageCompare/interface';
import { TempHoverGalleryItems} from '../Components/HoverGallery/interfaces';
import { TempMappingPoints } from '../Components/MappingPoints/interface';
import { TempShapeTraits } from '../Components/Shapes/Interfaces/ShapesInterfaces'; 

class TraitManagerStore {

    openTraitManeger: boolean = false;
    componentManeger: React.ReactNode | null = null;

    tempCards: TempCardInterface | null = null;
    tempNavStyle: TempNavButtonStyle | null = null;
    tempBulletStyle: TempBulletStyle | null = null;

    tempLabels: TempLabels | null = null;
    tempMediaGrid: TempImgGrid | null = null;

    tempVerticalParallexCards:TempVerticalParallax | null =null;
    tempVerticalBackgroundSize:{id:string; isCover:string} | null = null;

    tempHorizantalParllax:TempHorizantalParllax |null =null;
    tempImageComparisonCards:TempImageComparisonCards |null = null;

    tempHoverGalleryCards:TempHoverGalleryItems | null = null; 
    tempMappingPointsItems:TempMappingPoints|null =null;

    tempShapTraits: TempShapeTraits | null = null;

    constructor() {
        makeObservable(this, {

            openTraitManeger: observable,
            componentManeger: observable,

            tempCards: observable,
            tempNavStyle: observable,
            tempBulletStyle: observable,

            tempLabels: observable,
            tempMediaGrid: observable,
            
            tempVerticalParallexCards: observable,
            tempVerticalBackgroundSize:observable,

            tempHorizantalParllax:observable,
            tempImageComparisonCards:observable,

            tempHoverGalleryCards:observable,
            tempShapTraits: observable,
            setTempShapeTrairs: action,
            setTempHoverGalleryCards:action,

            tempMappingPointsItems:observable,
            setTempMappingPointsItems:action,
    
            setOpenTraitManeger: action,
            setComponentManeger: action,

            setTempCards: action,
            setTempNavStyle: action,
            setTempBulletStyle: action,
            
            setTempLabels: action,
            setTempMediaGrid: action,
            
            setTempVerticalParallexCards:action,
            setTempVerticalBackGroundSize:action,

            setTempHorizantalParllax:action,
            setTempImageComparisonCards:action,
        });
    }

    setOpenTraitManeger = (value: boolean) => {
        this.openTraitManeger = value;
    };

    setComponentManeger = (component: React.ReactNode) => {
        this.componentManeger = component;
    };


    setTempCards = (newTempCards: TempCardInterface) => {
        this.tempCards = newTempCards;
    };

    setTempNavStyle = (newTempNavStye: TempNavButtonStyle) => {
        this.tempNavStyle = newTempNavStye;
    };

    setTempBulletStyle = (newTempBulletStyle: TempBulletStyle) => {
        this.tempBulletStyle = newTempBulletStyle;
    };

    setTempLabels = (newTempLabels: TempLabels) => { 
        this.tempLabels = newTempLabels;
    };

    setTempMediaGrid = (newTempGrid: TempImgGrid) => {
        this.tempMediaGrid = newTempGrid;
    }

    setTempVerticalParallexCards =(newVParallax:TempVerticalParallax)=>{
        this.tempVerticalParallexCards = newVParallax;
    }

    setTempVerticalBackGroundSize=(newVal:{id:string, isCover:string})=>{
        this.tempVerticalBackgroundSize = newVal;
    }
    
    setTempHorizantalParllax =(newVParallax:TempHorizantalParllax)=>{
        this.tempHorizantalParllax = newVParallax;
    }
    
    setTempImageComparisonCards =(newCards: TempImageComparisonCards) =>{
        this.tempImageComparisonCards = newCards;
    }

    setTempHoverGalleryCards =(newItems:TempHoverGalleryItems)=>{
        this.tempHoverGalleryCards = newItems;
    }
    
    setTempMappingPointsItems=(newItems:TempMappingPoints)=>{
        this.tempMappingPointsItems = newItems;
    }

    setTempShapeTrairs = (value: TempShapeTraits) => {
        this.tempShapTraits = value;
    }
}

const traitManagerStore = new TraitManagerStore();
export default traitManagerStore;

