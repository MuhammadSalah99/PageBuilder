import React, { useState, useEffect, useRef } from 'react';
import ImgParallax from './interfaces/ImgParallax';
import styles from './styles/MediaParallax';
import MediaParallaxManeger from './utilities/MediaParallaxManeger';
import traitManagerStore from '../../GlobalStates/TraitManegerStore';
import { observer } from 'mobx-react';
import useCustomId from '../ImageCompare/useComponentId';

const DEFAULT_IMGS = [
    {
        img: 'https://i.ibb.co/JmSMwPS/Default-Image-Parallax-Vertical-Background.webp',
        effect: 70,
    },
    {
        img: 'https://i.ibb.co/GsKXzBK/Default-Image-Parallax-Vertical-Middle.webp',
        effect: 55,
    },
    {
        img: 'https://i.ibb.co/MZDxCft/Default-Image-Parallax-Vertical-Foreground.webp',
        effect: 30,
    },
];


const defaultParallaxState: ImgParallax[][] = [[DEFAULT_IMGS[0], DEFAULT_IMGS[1], DEFAULT_IMGS[2]]];

const VerticalMediaParalex: React.FC = observer(() => {
    const [parallaxImages, setParallaxImages] = useState<ImgParallax[][]>(defaultParallaxState);
    const [backgroundSize, setBackgroundSize] = useState('cover'); // Added backgroundSize state

    const {tempVerticalParallexCards, setTempVerticalParallexCards} = traitManagerStore;
    const {tempVerticalBackgroundSize ,setTempVerticalBackGroundSize} = traitManagerStore;
    const { openTraitManeger, setOpenTraitManeger, setComponentManeger, componentManeger } = traitManagerStore;

    const id = useCustomId();

    useEffect(()=>{
        if (tempVerticalParallexCards?.id === id) {
            setParallaxImages(tempVerticalParallexCards.parallaxItems);
            setBackgroundSize(tempVerticalBackgroundSize?.isCover as string)
        }
    },[tempVerticalParallexCards,tempVerticalBackgroundSize])

    const openParallaxManeger = () => {
        setTempVerticalBackGroundSize({id:id as string, isCover:backgroundSize as string})
        setTempVerticalParallexCards({id:id,parallaxItems:parallaxImages})
        setComponentManeger(
            <MediaParallaxManeger
            parallaxImages={parallaxImages}
            setParallaxImages={setParallaxImages}
            backgroundSize={backgroundSize}
            setBackgroundSize={setBackgroundSize}
        />
        )
        setOpenTraitManeger(true);
    };

    const cmpRef = useRef<HTMLDivElement>(null);
    const iframe = document.querySelector("iframe") as HTMLIFrameElement;
    // Function to calculate the parallax effect based on the position of the component in the viewport
    const calculateParallax = (effect: number, top: number) => {
        const scrollY = window.scrollY;
        const componentTop = top - scrollY;
        // Check if the component is near the top of the screen
        if (componentTop <= 0) {
            // The component is at the top or above the top of the screen
            return (-top * effect) / 100;
        }
        // The component is not at the top
        return 0;
    };

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
            transform: `translate3d(0, ${img.parallaxOffset}px, 0)`,
        };

        return (
            <div
                className={`parallax-element`}
                style={parallaxStyle}
                ref={cmpRef}
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

export default VerticalMediaParalex;
