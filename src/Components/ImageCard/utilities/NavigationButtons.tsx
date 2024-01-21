import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import styles from '../styles/ImageCardStyles.ts';
import { useState, useEffect } from 'react';
import traitManagerStore from '../../../GlobalStates/TraitManegerStore.ts';
import NavigationStyleForm from './NavigationStyleForm.tsx';
import { NavButtonStyle } from '../interfaces/CardInterface.ts'
import { observer } from 'mobx-react';
import previewManagerStore from '../../../GlobalStates/PreviewManagerStore.ts';

type NavigationButtonsType = {
    currentIndex: number,
    setCurrentIndex: (value: number) => void,
    cardLeng: number
}

const NavigationButtons: React.FC<NavigationButtonsType> = observer(({ currentIndex, setCurrentIndex, cardLeng }) => {


    const { setComponentManeger, tempNavStyle, setTempNavStyle } = traitManagerStore;
    const { isPreview } = previewManagerStore

    const [navStyle, setNavStyle] = useState<NavButtonStyle>({ backgroundColor: "#ED1C25", size: "36px" })
    const [isDragging, setIsDragging] = useState(false);
    const [dragDistance, setDragDistance] = useState(0);
    const [lastDragDistance, setLastDragDistance] = useState(0);
    const [startX, setStartX] = useState(0);

    const generateRandomNumber = () => {
        return Math.floor(100000 + Math.random() * 900000);
    };

    const [NavButtonId,] = useState(generateRandomNumber());

    useEffect(() => {
        if (tempNavStyle?.id === NavButtonId) {
            setNavStyle(tempNavStyle!.style);
        }
    }, [tempNavStyle]);



    const openNavigationTraitManager = () => {
        setTempNavStyle({ id: NavButtonId, style: navStyle })
        setComponentManeger(<NavigationStyleForm />);
    };


    const onDragStart = (event: MouseEvent) => {
        event.preventDefault();
        setIsDragging(true);
        setStartX(event.clientX);
    };

    const onDragMove = (event: MouseEvent) => {
        event.preventDefault();
        if (isDragging && !isPreview) {
            const currentX = event.clientX;
            const distanceMoved = lastDragDistance - (startX - currentX) * 0.15;
            if (distanceMoved < 16 && distanceMoved > 0) {
                setDragDistance(distanceMoved);
            }
            else {
                return;
            }
        }
    };

    const onDragMoveRight = (event: MouseEvent) => {
        event.preventDefault();
        if (isDragging && !isPreview) {
            const currentX = event.clientX;
            const distanceMoved = lastDragDistance + (startX - currentX) * 0.15;
            if (distanceMoved < 16 && distanceMoved > 0) {
                setDragDistance(distanceMoved);
            }
            else {
                return;
            }
        }
    };

    const goToNext = (e: MouseEvent) => {
        e.preventDefault();
        if (isDragging) {
            setIsDragging(false);
            setLastDragDistance(dragDistance);
        }
        else {
            setIsDragging(true)

            onDragStart(e)

        }
        if (currentIndex < cardLeng - 1) {
            setCurrentIndex((prevIndex: number) => prevIndex + 1);
        }
        else {
            setCurrentIndex(0);
        }
        openNavigationTraitManager()
    }

    const goToPrev = (e: MouseEvent) => {
        e.preventDefault();
        if (isDragging) {
            setIsDragging(false);
            setLastDragDistance(dragDistance);
        }
        else {
            setIsDragging(true)
            onDragStart(e)
        }
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex: number) => prevIndex - 1);
        }
        else {
            setCurrentIndex(cardLeng - 1);
        }
        openNavigationTraitManager()
    }

    const onDragEnd = () => {
        setIsDragging(false);
        setLastDragDistance(dragDistance);
    }

    return (

        <>
            <button
                style={{
                    ...styles.cardNav,
                    left: `${dragDistance}%`,
                    backgroundColor: navStyle.backgroundColor,
                    width: navStyle.size,
                    height: navStyle.size,
                    ...(isDragging ? { cursor: "grab" } : { cursor: "default" })
                }}
                onMouseMove={onDragMove}
                onClick={(e) => goToPrev(e)}
                onMouseLeave={onDragEnd}
            >
                <RiArrowLeftSLine style={{ fontSize: `${parseInt(navStyle.size) / 1.8}px` }} />
            </button>
            <button
                style={{
                    ...styles.cardNav,
                    right: `${dragDistance}%`,
                    backgroundColor: navStyle.backgroundColor,
                    width: navStyle.size,
                    height: navStyle.size,
                    ...(isDragging ? { cursor: "grab" } : { cursor: "default" })
                }}
                onMouseMove={onDragMoveRight}
                onClick={(e) => goToNext(e)}
                onMouseLeave={onDragEnd}
            >
                <RiArrowRightSLine style={{ fontSize: `${parseInt(navStyle.size) / 1.8}px` }} />
            </button>
        </>
    )
})

export default NavigationButtons
