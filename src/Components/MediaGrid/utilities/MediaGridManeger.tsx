import { useState, useEffect } from 'react';
import ImgGrid from '../interfaces/ImgGrid';
import Image from '../../../Plugins/Image/Image.tsx';
import styles from '../styles/MediaGridStylesManeger.ts';
import traitManagerStore from '../../../GlobalStates/TraitManegerStore.ts';
import { observer } from 'mobx-react';

const defaultImage: ImgGrid = { img: "https://media.shorthand.com/media/templates/set-b/placeholders/media-gallery-image-0.breakpoints-@0-2560x1440-564514.jpg" }
const defaultGridState: ImgGrid[][] = [
    [defaultImage, defaultImage],
    [defaultImage, defaultImage],
];

const MediaGridManager: React.FC = observer(() => {

    const { tempMediaGrid, setTempMediaGrid } = traitManagerStore;
    const [selectedRowIndex, setSelectedRowIndex] = useState(0);
    const [gridImages, setGridImages] = useState<ImgGrid[][]>(defaultGridState)
    const [selectedColIndex, setSelectedColIndex] = useState(0);
    const [image, setImage] = useState(gridImages[selectedRowIndex][selectedColIndex]?.img);
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(1);


    useEffect(() => {
        setGridImages(tempMediaGrid!.grid);
    }, [tempMediaGrid]);

    useEffect(() => {
        setImage(gridImages[selectedRowIndex][selectedColIndex]!.img);
    }, [gridImages, selectedRowIndex, selectedColIndex]);

    const updateImageInGrid = (newImageSrc: string) => {
        setGridImages(currentImages => {
            const newImages = currentImages.map(row => [...row]);
            if (newImages[selectedRowIndex] && newImages[selectedRowIndex][selectedColIndex]) {
                newImages[selectedRowIndex][selectedColIndex] = { ...newImages[selectedRowIndex][selectedColIndex], img: newImageSrc };
            }
            return newImages;
        });

        setImage(newImageSrc);
    };

    const handleSubmit = () => {

        setTempMediaGrid({ id: tempMediaGrid!.id, grid: gridImages });
    }

    const indexToRowCol = (index: number): { row: number; col: number } => {
        let count = 0;
        for (let row = 0; row < gridImages.length; row++) {
            for (let col = 0; col < gridImages[row].length; col++) {
                count++;
                if (count === index) {
                    return { row, col };
                }
            }
        }
        return { row: 0, col: 0 };
    };

    const selectIndex = (flatIndex: number) => {
        const { row, col } = indexToRowCol(flatIndex);
        setSelectedRowIndex(row);
        setSelectedColIndex(col);
        setSelectedButtonIndex(flatIndex);
    };

    const totalCells = gridImages.reduce((sum, row) => sum + row.length, 0);

    const selectionButtons = Array.from({ length: totalCells }, (_, i) => {
        const buttonIndex = i + 1;
        const isSelected = buttonIndex === selectedButtonIndex;

        return (
            <button
                style={{
                    ...styles.cellNavigator,
                    ...(isSelected ? styles.selectedButtonStyles : {}),
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = styles.buttonHoverStyles.backgroundColor)}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = isSelected ? styles.cellNavigator.backgroundColor : 'transparent')}
                key={buttonIndex}
                onClick={() => selectIndex(buttonIndex)}>
                {buttonIndex}
            </button>
        );
    });

    return (
        <div style={styles.formCont}>
            <Image image={image} setImage={updateImageInGrid} />

            <div style={styles.cellNavCont}>
                <div style={styles.buttonContainer}>{selectionButtons}</div>

            </div>
            <button
                style={styles.labelFormButton}
                onClick={() => handleSubmit()}>Save Grid!</button>
        </div>
    );
});

export default MediaGridManager;

