import { useState, useEffect } from 'react';
import ImageCardForm from './utilities/ImageCardForm';
import styles from './styles/ImageCardStyles.ts';
import CardInterface, { BulletsStyle } from './interfaces/CardInterface.ts';
import { RxDotFilled } from 'react-icons/rx';
import { observer } from 'mobx-react';
import traitManagerStore from '../../GlobalStates/TraitManegerStore.ts';
import EditableText from './utilities/EditibleText.tsx';
import NavigationButtons from './utilities/NavigationButtons.tsx';
import BulletStyleForm from './utilities/BulletStyleForm.tsx';

const ImageCard: React.FC = observer(() => {

    const [cards, setCards] = useState<CardInterface[]>([
        { id: 0, image: 'https://a.vev.design/resized/landscape-lake-night-star-sky-5055384/2100.jpg', title: 'Title', content: 'Click to change!' },
        { id: 1, image: 'https://a.vev.design/resized/landscape-lake-night-star-sky-5055384/2100.jpg', title: 'Title 2', content: 'Click to change!' }
    ]);
    const [bulletStyle, setBulletStyle] = useState<BulletsStyle>({ activeColor: "#ED1C24", nonActiveColor: "#D0D0D0" });
    const [currentIndex, setCurrentIndex] = useState(0)
    const { tempBulletStyle, setTempBulletStyle, setOpenTraitManeger, setComponentManeger, setTempCards, tempCards } = traitManagerStore;
    const generateRandomNumber = () => {
        return Math.floor(100000 + Math.random() * 900000);
    };



    const [ImageCardId,] = useState(generateRandomNumber());

    useEffect(() => {
        if (tempCards?.id === ImageCardId) {
            setCards(tempCards.cards);
        }
    }, [tempCards]);

    useEffect(() => {
        if (tempBulletStyle?.id === ImageCardId) {
            setBulletStyle(tempBulletStyle.style);
        }
    }, [tempBulletStyle]);

    const openImageCardTraits = () => {
        setTempCards({ id: ImageCardId, cards });
        setComponentManeger(<ImageCardForm />);
        setOpenTraitManeger(true);
    };


    const openBulletStyleManager = () => {
        setTempBulletStyle({ id: ImageCardId, style: bulletStyle })
        setComponentManeger(<BulletStyleForm />)
    }


    const handleTitleChange = (newTitle: string) => {
        const updatedCards = [...cards];
        updatedCards[currentIndex].title = newTitle;
        setCards(updatedCards);
        setTempCards({ id: ImageCardId, cards: cards });
    };

    const handleContentChange = (newContent: string) => {
        const updatedCards = [...cards];
        updatedCards[currentIndex].content = newContent;
        setCards(updatedCards);
        setTempCards({ id: ImageCardId, cards: cards });
    };

    const onBlur = () => {
        setTempCards({ id: ImageCardId, cards: cards });
    };


    const bulletClick = (currentIndex: number) => {
        setCurrentIndex(currentIndex);
        openBulletStyleManager();
    }

    return (
        <div style={styles.imageCardCont}>
            <div onClick={openImageCardTraits}
                style={styles.card}>
                <img src={cards[currentIndex].image} style={styles.image} />
                <div style={styles.container}>
                    <EditableText
                        text={cards[currentIndex].title}
                        onTextChange={handleTitleChange}
                        style={styles.title}
                        isTextArea={false}
                        onBlur={onBlur}
                    />
                    <EditableText
                        text={cards[currentIndex].content}
                        onTextChange={handleContentChange}
                        style={styles.content}
                        isTextArea={true}
                        onBlur={onBlur}
                    />
                </div>
            </div>
            {cards.length > 1 && (
                <>
                    <NavigationButtons currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} cardLeng={cards.length} />
                </>
            )}
            <div style={styles.pointerNav}>
                {cards.map((_, cardIndex) => (
                    <div
                        key={cardIndex}
                        onClick={() => bulletClick(cardIndex)}
                    >
                        <RxDotFilled
                            style={{
                                ...styles.navPoint,
                                ...(currentIndex == cardIndex ?
                                    { "color": bulletStyle.activeColor } :
                                    { "color": bulletStyle.nonActiveColor })
                            }}
                        />
                    </div>
                ))}
            </div>

        </div>
    )
});

export default ImageCard;

