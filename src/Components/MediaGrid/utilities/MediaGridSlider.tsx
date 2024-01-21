import { useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import styles from '../styles/FullSlider.ts'
import ImgGrid from "../interfaces/ImgGrid.ts"

type MediaGridSlider = {
    images: ImgGrid[],
    setSliderOpen(value: boolean): void,
}

const MediaGridSlider: React.FC<MediaGridSlider> = ({ images, setSliderOpen }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        console.log(images)
    }, []);

    const nextSlide = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1)
        }
        else {
            setCurrentIndex(0);
        }
    }
    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
        else {
            setCurrentIndex(images.length - 1);
        }
    }
    return (

        <>
            <div style={styles.darkBG} className="darkBg" />
            <div style={styles.centered}>
                <div style={styles.modal}>
                    <button style={styles.closeBtn} onClick={() => setSliderOpen(false)}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>
                    <button style={styles.prevButton} onClick={prevSlide}>
                        <FaAngleLeft />
                    </button>
                    <div style={{ backgroundImage: `url(${images[currentIndex].img})`, backgroundSize: "cover", width: "100%", height: "calc(100vh - 193px)", backgroundPosition: "center" }}></div>
                    <button style={styles.nextButton} onClick={nextSlide}>
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </>
    )
}

export default MediaGridSlider;
