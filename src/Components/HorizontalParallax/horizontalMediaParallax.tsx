import {useEffect, useRef, useState} from 'react';
import {ImgParallax} from './interfaces/ImgParallax';
import styles from './styles/MediaParallax';
import MediaParallaxManeger from './utilities/MediaParallaxManeger';
import traitManagerStore from '../../GlobalStates/TraitManegerStore';
import { observer } from 'mobx-react';
import useCustomId from "../ImageCompare/useComponentId.ts";

const DEFAULT_IMGS = [
    {
        img: 'https://i.ibb.co/ZBDXbpb/Default-Image-Parallax-Horizontal-Background.webp',
        effect: 0,
    },
    {
        img: 'https://i.ibb.co/nwZ4TF9/Default-Image-Parallax-Horizontal-Middle.webp',
        effect: 0,
    },
    {
        img: 'https://i.ibb.co/yPnhwvw/Default-Image-Parallax-Horizontal-Foreground.webp',
        effect: 20,
    },
];


const defaultParallaxState: ImgParallax[][] = [[DEFAULT_IMGS[0], DEFAULT_IMGS[1], DEFAULT_IMGS[2]]];


const HorizontalMediaParallax: React.FC = observer(() => {
    const [parallaxImages, setParallaxImages] = useState<ImgParallax[][]>(defaultParallaxState);
    const [backgroundSize, setBackgroundSize] = useState('cover'); // Added backgroundSize state
    const [dir, setDir] = useState('ltr'); // Added backgroundSize state
    const { openTraitManeger, setOpenTraitManeger, setComponentManeger, componentManeger} = traitManagerStore;
    const {tempHorizantalParllax, setTempHorizantalParllax } =traitManagerStore;

    const id = useCustomId();

    useEffect(()=>{
        if (tempHorizantalParllax?.id === id) {
            setParallaxImages(tempHorizantalParllax.parallaxItems);
            setDir(tempHorizantalParllax.dir as string);
            setBackgroundSize(tempHorizantalParllax.backgroundSize as string);
        }
    },[tempHorizantalParllax])



    const openParallaxManeger = () => {
        setTempHorizantalParllax({id:id,parallaxItems:parallaxImages ,dir:dir , backgroundSize:backgroundSize})
        setComponentManeger(
            <MediaParallaxManeger
        />
        )
        setOpenTraitManeger(true);
    };

    const cmpRef = useRef<HTMLDivElement>(null);
    const iframe = document.querySelector("iframe") as HTMLIFrameElement;

    // Function to calculate the parallax effect based on the position of the component in the viewport
    const calculateParallax = (effect: number, top: number) => {
        const scrollY = dir == 'ltr' ? window.scrollY : (-window.scrollY);
        const componentTop = top - scrollY;
        // Check if the component is near the top of the screen
        if (componentTop <= 0) {
            // The component is at the top or above the top of the screen
            return (-top * effect) / 100;
        }
        // The component is not at the top
        return 0;
    };

    // Handle scroll event to update parallax effect
    useEffect(() => {
        const handleScroll = () => {
            if (cmpRef.current) {
                const top = cmpRef.current.getBoundingClientRect().top;
                const updatedParallaxImages = parallaxImages.map((row) =>
                    row.map((img) => ({
                        ...img,
                        parallaxOffset: calculateParallax(img.effect, top),
                    }))
                );
                setParallaxImages(updatedParallaxImages);
            }
        };
        iframe.contentWindow?.addEventListener('scroll', handleScroll);

        return () => {
            iframe.contentWindow?.removeEventListener('scroll', handleScroll);
        };
    }, [parallaxImages]);

    const renderImageOrSvg = (img: ImgParallax) => {
        const parallaxStyle:React.CSSProperties = {
            backgroundImage: `url(${img.img})`,
            backgroundSize: `${backgroundSize}`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 100%',
            top: "0px", // Apply the parallax effect here
            left: '0px',
            width: '100%',
            height: '100%',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            transform: `translate3d(${img.parallaxOffset}px,0, 0)`
        };

        return (
            <div className="parallax-element"
                 ref={cmpRef}
                 style={parallaxStyle}
            ></div>
        );
    };

    return (
        <div>
            {parallaxImages.map((row, rowIndex) => (
                <div key={rowIndex} style={styles.parallaxCont}>
                    {row.map((img, colIndex) => (
                        <div
                            key={colIndex}
                            style={styles.parallaxCell}
                            onClick={() => openParallaxManeger()}
                        >
                            {renderImageOrSvg(img)}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
});

export default HorizontalMediaParallax;
