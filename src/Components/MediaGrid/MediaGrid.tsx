import { useState, useEffect } from 'react'
import ImgGrid from './interfaces/ImgGrid'
import styles from './styles/MediaGrid';
import MediaGridManeger from './utilities/MediaGridManeger';
import traitManagerStore from '../../GlobalStates/TraitManegerStore.ts';
import previewManagerStore from '../../GlobalStates/PreviewManagerStore.ts';
const defaultImage: ImgGrid = { img: "https://media.shorthand.com/media/templates/set-b/placeholders/media-gallery-image-0.breakpoints-@0-2560x1440-564514.jpg" }
import { FaTrashCan } from "react-icons/fa6";
import { observer } from 'mobx-react';


const defaultGridState: ImgGrid[][] = [
    [defaultImage, defaultImage],
    [defaultImage, defaultImage],
];

const MediaGrid: React.FC = observer(() => {

    const { setOpenTraitManeger, setComponentManeger, setTempMediaGrid, tempMediaGrid } = traitManagerStore;
    const { isPreview } = previewManagerStore;

    const [gridImages, setGridImages] = useState<ImgGrid[][]>(defaultGridState)
    const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
    const [hoveredCellIndex, setHoveredCellIndex] = useState<{ row: number; col: number } | null>(null);
    const [sliderOpen, setSliderOpen] = useState(false);

    const generateRandomNumber = () => {
        return Math.floor(100000 + Math.random() * 900000);
    };


    const [mediaGridId,] = useState(generateRandomNumber());

    useEffect(() => {
        if (tempMediaGrid?.id === mediaGridId) {
            const updateGridImages = () => {
                return tempMediaGrid.grid;
            };

            setGridImages(updateGridImages);
        }
    }, [tempMediaGrid, mediaGridId]);

    const openGridTraits = () => {
        if (!isPreview) {
            const passedGrid = { id: mediaGridId, grid: gridImages }
            setTempMediaGrid(passedGrid);
            setComponentManeger(<MediaGridManeger />);
            setOpenTraitManeger(true);
        }
        else {
            setSliderOpen(true)
        }
    };


    const renderImageOrSvg = (img: ImgGrid) => {
        return (
            <div onClick={openGridTraits} style={{ backgroundImage: `url(${img.img})`, ...styles.imageBgStyle }}>
            </div>
        )
    };

    const addImageToLeft = (rowIndex: number, colIndex: number) => {
        setGridImages(currentImages => {
            if (currentImages[rowIndex].length >= 4) {
                return currentImages;
            }

            const newImages = currentImages.map(row => [...row]);

            newImages[rowIndex].splice(colIndex, 0, defaultImage);

            const passedGrid = { id: mediaGridId, grid: newImages }
            setTempMediaGrid(passedGrid);

            return newImages;
        });

    };

    const addImageRight = (rowIndex: number, colIndex: number) => {
        setGridImages(currentImages => {
            if (currentImages[rowIndex].length >= 4) {
                return currentImages;
            }

            const newImages = currentImages.map(row => [...row]);

            newImages[rowIndex].splice(colIndex + 1, 0, defaultImage);

            const passedGrid = { id: mediaGridId, grid: newImages }
            setTempMediaGrid(passedGrid);
            return newImages;
        });
    };


    const addImageTop = (rowIndex: number) => {
        setGridImages(currentImages => {
            const newRow = [defaultImage];
            const newImages = [
                ...currentImages.slice(0, rowIndex),
                newRow,
                ...currentImages.slice(rowIndex),
            ];
            const passedGrid = { id: mediaGridId, grid: newImages }
            setTempMediaGrid(passedGrid);
            return newImages;
        });
    };

    const addImageBottom = (rowIndex: number) => {
        setGridImages(currentImages => {
            const newRow = [defaultImage];

            const newImages = [
                ...currentImages.slice(0, rowIndex + 1),
                newRow,
                ...currentImages.slice(rowIndex + 1),
            ];

            const passedGrid = { id: mediaGridId, grid: newImages }
            setTempMediaGrid(passedGrid);
            return newImages;
        });
    };

    const removeImage = (rowIndex: number, colIndex: number) => {
        setGridImages(currentImages => {
            const newImages = currentImages.map(row => [...row]);
            newImages[rowIndex].splice(colIndex, 1);
            if (newImages[rowIndex].length === 0) {
                newImages.splice(rowIndex, 1);
            }
            const passedGrid = { id: mediaGridId, grid: newImages };
            setTempMediaGrid(passedGrid);
            return newImages;
        });
    };
    // {isPreview && sliderOpen && (
    //  <MediaGridSlider images={gridImages.flat()} setSliderOpen={setSliderOpen} />
    // )}

    return (
        <div style={{ height: "100%" }} >
            {gridImages.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    style={{ ...styles.gridCont, height: `${100 / gridImages.length}%` }}
                    onMouseEnter={() => setHoveredRowIndex(rowIndex)}
                    onMouseLeave={() => setHoveredRowIndex(null)}
                >
                    {hoveredRowIndex === rowIndex && !isPreview && (
                        <>
                            <button
                                onClick={() => addImageTop(rowIndex)}
                                style={{ ...styles.addGridCellButtonTop, ...styles.addCellButton, ...(hoveredRowIndex === rowIndex ? styles.buttonShow : {}) }}
                            >
                                +
                            </button>
                            <button
                                onClick={() => addImageBottom(rowIndex)}
                                style={{ ...styles.addGridCellButtonBottom, ...styles.addCellButton, ...(hoveredRowIndex === rowIndex ? styles.buttonShow : {}) }}
                            >
                                +
                            </button>
                        </>
                    )}
                    {row.map((img, colIndex) => (
                        <div
                            key={colIndex}
                            style={{
                                ...styles.gridCell,
                                ...(row.length === 2 ?
                                    styles.twoCells : {}),
                                ...(row.length === 1 ?
                                    styles.singleCell : {}),
                                ...(row.length === 3 ?
                                    styles.threeCells : {}),
                                ...(row.length === 4 ?
                                    styles.fourCells : {})
                            }}
                            onMouseEnter={() => setHoveredCellIndex(
                                { row: rowIndex, col: colIndex }
                            )}

                            onMouseLeave={() => setHoveredCellIndex(null)}
                        >
                            <div style={{ width: "100%", height: "100%" }}>

                                {renderImageOrSvg(img)}
                                {hoveredCellIndex?.row === rowIndex &&
                                    hoveredCellIndex?.col === colIndex &&
                                    !isPreview && (
                                        <button style={styles.removeImgButton}
                                            onClick={() => removeImage(rowIndex, colIndex)}>
                                            <FaTrashCan />
                                        </button>
                                    )}
                                {hoveredCellIndex?.row === rowIndex &&
                                    hoveredCellIndex?.col === colIndex &&
                                    row.length < 4 && !isPreview && (
                                        <>
                                            <button
                                                onClick={() => addImageToLeft(rowIndex, colIndex)}
                                                style={{ ...styles.addGridCellButtonLeft, ...styles.addCellButton, ...styles.buttonShow }}
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() => addImageRight(rowIndex, colIndex)}
                                                style={{ ...styles.addGridCellButtonRight, ...styles.addCellButton, ...styles.buttonShow }}
                                            >
                                                +
                                            </button>
                                        </>
                                    )}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
});

export default MediaGrid

