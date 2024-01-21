 export interface ImgParallax {
    img: string,
    effect: number
}

export interface TempHorizantalParllax{
    id:string;
    dir?:string;
    backgroundSize?:string;
    parallaxItems:ImgParallax[][];
}
