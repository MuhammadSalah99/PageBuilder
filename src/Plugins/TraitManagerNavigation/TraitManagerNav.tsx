import styles from "./style/styles.ts"
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import assetManagerStore from "../../GlobalStates/AssetManagerStore.ts";

type TraitManagerNavType = {
    currentIndex: number,
    setCurrentIndex: (value: number) => void,
    contentLength: number,
    setImage: (value: string) => void
}

const TraitManagerNav: React.FC<TraitManagerNavType> = ({ currentIndex, setCurrentIndex, contentLength, setImage }) => {

    const { setOpenAssetManegerModal } = assetManagerStore;



    const goToNextForm = () => {
        if (currentIndex < contentLength- 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
        else {
            setCurrentIndex(0);
        }
    }

    const goToPrevForm = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
        else {
            setCurrentIndex(contentLength - 1);
        }
    }
    return (

        <div style={styles.imageNav}>

            <div style={styles.imageNavCont} onClick={() => setOpenAssetManegerModal(true)}>
                <FaEdit />
            </div>

            <div
                style={styles.arrowCont}
            >
                <button
                    onClick={() => {
                        goToPrevForm()
                    }}
                    style={styles.arrowButton}
                >
                    <RiArrowLeftSLine style={styles.arrowSvg} />
                </button>
                <p
                    style={styles.arrowValue}
                >
                    {currentIndex + 1} / {contentLength}
                </p>
                <button
                    style={styles.arrowButton}
                    onClick={() => {
                        goToNextForm()
                    }}
                >
                    <RiArrowRightSLine style={styles.arrowSvg} />
                </button>
            </div>

            <div style={styles.imageNavCont} onClick={() => setImage('')}>
                <FaRegTrashAlt />
            </div>

        </div>
 )
}

export default TraitManagerNav
