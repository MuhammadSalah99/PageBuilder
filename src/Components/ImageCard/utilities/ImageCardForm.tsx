import { useState, useEffect, ChangeEvent } from 'react';
import styles from '../styles/ImageCardFormStyles';
import {  FaPlus  } from "react-icons/fa";
import Image from '../../../Plugins/Image/Image.tsx'
import CardInterface from '../interfaces/CardInterface.ts';
import { observer } from 'mobx-react';
import traitManagerStore from '../../../GlobalStates/TraitManegerStore.ts';
import TraitManagerNav from '../../../Plugins/TraitManagerNavigation/TraitManagerNav.tsx';


const ImageCardForm: React.FC = observer(() => {

    const [image, setImage] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [formInput, setFormInput] = useState({ title: "", content: "" })
    const { setTempCards, tempCards } = traitManagerStore;

    const [cards, setCards] = useState<CardInterface[]>(tempCards!.cards);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'content' && value.length > 300) {
            return;
        }

        setFormInput(prevInput => {
            const updatedInput = {
                ...prevInput,
                [name]: value,
            };
            const newCard = {
                id: cards[currentIndex] ? cards[currentIndex].id : cards.length,
                image: image,
                title: formInput.title,
                content: formInput.content,
            };


            const updatedCards = [...cards];

            if (cards[currentIndex]) {
                updatedCards[currentIndex] = newCard;
            }
            else {
                updatedCards.push(newCard)
            }

            setCards(updatedCards);

            return updatedInput;
        });
    };

    useEffect(() => {
        if (cards[currentIndex]) {
            setFormInput({
                title: cards[currentIndex].title,
                content: cards[currentIndex].content
            });
            setImage(cards[currentIndex].image)
        }
    }, [currentIndex]);

    const handleSubmit = () => {
        const newCard = {
            id: cards[currentIndex] ? cards[currentIndex].id : cards.length,
            image: image,
            title: formInput.title,
            content: formInput.content,
        }

        const updatedCards = [...cards];

        if (cards[currentIndex]) {
            updatedCards[currentIndex] = newCard;
        }
        else {
            updatedCards.push(newCard)
        }

        setCards(updatedCards);
        setTempCards({ id: tempCards!.id, cards: updatedCards });
    };

    const addNewCard = () => {
        const newCard = { id: cards.length, image: 'https://a.vev.design/resized/landscape-lake-night-star-sky-5055384/2100.jpg', title: 'Title', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' };
        const newCards = [...cards, newCard];
        setCards([...cards, newCard]);
        setCurrentIndex(cards.length);

        setTempCards({ id: tempCards!.id, cards: newCards });

    };


    return (

        <>
            <Image image={image} setImage={setImage} />
            <TraitManagerNav currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} contentLength={cards.length} setImage={setImage} />
            <div style={styles.compManegmentContent}>
                <div style={styles.compFormManegment}>
                    <form key={cards[currentIndex]?.id} style={styles.labelForm}>
                        <button style={styles.addButton} onClick={addNewCard}>
                            <>Add New <FaPlus /></>
                        </button>
                        <div style={styles.labelFormCaptionCont}>
                            <label>Title:</label>
                            <input
                                type="text"
                                style={styles.labelFormInput}
                                placeholder={cards[currentIndex]?.title}
                                name="title"
                                value={formInput.title}
                                onChange={handleInputChange}
                            ></input>
                        </div>
                        <div style={styles.labelFormCaptionCont}>
                            <label style={styles.contentLabel}>
                                <p>Description:</p>
                                <p style={styles.labelFormContentLength}>{formInput.content.length} / 300</p>
                            </label>
                            <textarea
                                name="content"
                                placeholder={cards[currentIndex]?.content}
                                style={styles.labelFormTextArea}
                                value={formInput.content}
                                onChange={handleInputChange}
                                maxLength={300}
                            ></textarea>
                        </div>

                    </form>
                    <button
                        style={styles.labelFormButton}
                        onClick={() => handleSubmit()}>Save Cards !</button>
                </div>
            </div>
        </>

    );
});

export default ImageCardForm;

