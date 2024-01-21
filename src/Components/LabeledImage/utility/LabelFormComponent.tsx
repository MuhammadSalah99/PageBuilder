import { useState, ChangeEvent, useEffect } from 'react';
import styles from '../styles/LabelFormStyle.ts';
import Label from '../interfaces/LabelInterfaces';
import Image from '../../../Plugins/Image/Image.tsx'
import { observer } from 'mobx-react';
import traitManagerStore from '../../../GlobalStates/TraitManegerStore.ts';
import TraitManagerNav from '../../../Plugins/TraitManagerNavigation/TraitManagerNav.tsx';
import { FaPlus, FaMinus } from "react-icons/fa";
import DEFAULT_LABEL from '../interfaces/DEFULT_LABEL.ts';

const LabelFormComponent: React.FC = observer(() => {

    const [image, setImage] = useState('');
    const [labels, setLabels] = useState<Label[]>([])
    const [formInput, setFormInput] = useState(
        {
            x: '0',
            y: '0',
            size: "41",
            title: '',
            desc: '',
            buttonTitle: '',
            buttonLink: '',
            dialougeColor: "#ED1C24",
            dialougeOpacity: 0.7,
            labelColor: "#ED1C24",
            dialougeWidth: "259",
            dialougeHeight: "314"
        });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [leftError, setLeftError] = useState('');
    const [showStyles, setShowStyles] = useState(false);
    const [showConfigs, setShowConfigs] = useState(false);

    const { tempLabels, setTempLabels } = traitManagerStore;

    useEffect(() => {
        setLabels(tempLabels!.labels);
        setImage(tempLabels!.image);
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'x' || name === 'y') {
            const numericValue = parseFloat(value);
            if (numericValue < 0 || numericValue > 100) {
                setLeftError('Value must be between 0 and 100');
            } else {
                setLeftError('');
            }
        }

        setFormInput(prevInput => {
            const updatedInput = {
                ...prevInput,
                [name]: value,
            };

            const newLabel = {
                id: labels[currentIndex] ? labels[currentIndex].id : labels.length,
                left: updatedInput.x,
                top: updatedInput.y,
                title: updatedInput.title,
                size: updatedInput.size,
                desc: updatedInput.desc,
                buttonTitle: updatedInput.buttonTitle,
                buttonLink: updatedInput.buttonLink,
                dialougeColor: updatedInput.dialougeColor,
                dialougeOpacity: updatedInput.dialougeOpacity,
                labelColor: updatedInput.labelColor,
                dialougeWidth: updatedInput.dialougeWidth,
                dialougeHeight: updatedInput.dialougeHeight
            };

            const updatedLabels = [...labels];
            if (labels[currentIndex]) {
                updatedLabels[currentIndex] = newLabel;
            } else {
                updatedLabels.push(newLabel);
            }

            setLabels(updatedLabels);


            return updatedInput;
        });
    };

    useEffect(() => {
        if (labels[currentIndex]) {
            setFormInput({
                x: labels[currentIndex].left,
                y: labels[currentIndex].top,
                title: labels[currentIndex].title,
                size: labels[currentIndex].size,
                desc: labels[currentIndex].desc,
                buttonTitle: labels[currentIndex].buttonTitle,
                buttonLink: labels[currentIndex].buttonLink,
                dialougeHeight: labels[currentIndex].dialougeHeight,
                dialougeWidth: labels[currentIndex].dialougeWidth,
                dialougeOpacity: labels[currentIndex].dialougeOpacity,
                labelColor: labels[currentIndex].labelColor,
                dialougeColor: labels[currentIndex].dialougeColor
            });
        }
    }, [currentIndex, labels]);

    const handleSubmit = () => {
        console.log('test')
        const submitTemps = { id: tempLabels!.id, labels: labels, image: image };
        setTempLabels(submitTemps)
    };

    const addNewLabel = () => {
        setLabels([{ id: 0, ...DEFAULT_LABEL }]);

        const newLabel = { id: labels.length, ...DEFAULT_LABEL };
        setLabels([...labels, newLabel]);
        setCurrentIndex(labels.length);
    };

    const handleShow = (e) => {
        e.preventDefault();
        setShowStyles(!showStyles);
    }

    const handleShowConfigs = (e) => {
        e.preventDefault();
        setShowConfigs(!showConfigs);
    }
    return (
        <>
            <Image image={image} setImage={setImage} />

            <TraitManagerNav
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                setImage={setImage}
                contentLength={labels.length}
            />

            <div style={styles.labelsButtonsCont}>
                {labels.map((_, index) => (
                    <div style={styles.labelsButton}>
                        <button
                            key={index}
                            style={{
                                ...styles.labelNavigatorButtons,
                                ...(currentIndex === index ?
                                    styles.selectedButtonStyles :
                                    {}
                                ),
                            }}
                            onClick={() => setCurrentIndex(index)}

                        >
                            <FaPlus />
                        </button>
                        <p style={styles.navButtonP}>
                            {index + 1}
                        </p>
                    </div>
                ))}

                {labels.length != 0 && (
                    <div style={styles.labelsButton}>
                        <button
                            style={styles.labelAddButton}
                            onClick={() => addNewLabel()}
                        >
                            <FaPlus />
                        </button>

                        <p style={styles.navButtonP}>
                            Add
                        </p>
                    </div>
                )}

            </div>

            <div style={
                {
                    ...styles.compManegmentContent,
                    ...(labels.length == 0 ?
                        { height: "100px" }
                        : {}),
                    ...(showStyles && showConfigs ?
                        { height: "884px" }
                        : {}),
                    ...(!showConfigs && !showStyles ?
                        { height: "154px" }
                        : {}),
                    ...(showConfigs && !showStyles ?
                        {height: "537px"}
                        : {})
                    

                }}>
                {labels.length != 0 ? (

                    <div style={styles.compFormManegment}>
                        <form key={labels[currentIndex]?.id}
                            style={styles.labelForm}
                            onSubmit={() => handleSubmit()}
                        >

                            <button style={styles.showStylesButton} onClick={(e) => handleShow(e)}>
                                <p>Styles</p>
                                {showStyles ? (<FaMinus />) : (<FaPlus />)}
                            </button>
                            {showStyles && (
                                <>
                                    <div style={styles.labelFormCaptionCont}>
                                        <p style={styles.rowTitle}>Position</p>
                                        <div style={styles.rowInput}>
                                            <label style={styles.labelInput}>X</label>
                                            <input
                                                type="text"
                                                style={styles.labelFormInput}
                                                placeholder={labels[currentIndex]?.left}
                                                name="x"
                                                value={formInput.x}
                                                onChange={handleInputChange}
                                            ></input>
                                        </div>
                                        <div style={styles.rowInput}>
                                            <label style={styles.labelInput}>Y</label>
                                            <input
                                                type="text"
                                                style={styles.labelFormInput}
                                                placeholder={labels[currentIndex]?.top}
                                                name="y"
                                                value={formInput.y}
                                                onChange={handleInputChange}
                                            ></input>
                                        </div>
                                    </div>
                                    {leftError &&
                                        <div style={styles.error}>
                                            {leftError}
                                        </div>
                                    }

                                    <div style={styles.labelFormCaptionCont}>
                                        <p style={styles.rowTitle}>Size</p>
                                        <div style={styles.rowInput}>
                                            <label style={styles.labelInput}>%</label>
                                            <input
                                                type="text"
                                                style={styles.labelFormInput}
                                                placeholder={labels[currentIndex]?.left}
                                                name="size"
                                                value={formInput.size}
                                                onChange={handleInputChange}
                                            ></input>
                                        </div>
                                        <div style={styles.rowInput}>
                                            <input
                                                type="range"
                                                style={styles.rangeInput}
                                                min={0}
                                                value={formInput.size}
                                                name="size"
                                                onChange={handleInputChange}
                                                step={2}
                                                max={100}
                                            />
                                        </div>
                                    </div>
                                    <div style={styles.labelFormCaptionCont}>
                                        <p style={styles.rowTitle}>Label<br /> Popup</p>
                                        <div style={styles.rowInput}>
                                            <label style={styles.labelInput}>W</label>
                                            <input
                                                type="text"
                                                style={styles.labelFormInput}
                                                placeholder={labels[currentIndex]?.dialougeWidth}
                                                name="dialougeWidth"
                                                value={formInput.dialougeWidth}
                                                onChange={handleInputChange}
                                            ></input>
                                        </div>
                                        <div style={styles.rowInput}>
                                            <label style={styles.labelInput}>H</label>
                                            <input
                                                type="text"
                                                style={styles.labelFormInput}
                                                placeholder={labels[currentIndex]?.dialougeHeight}
                                                name="dialougeHeight"
                                                value={formInput.dialougeHeight}
                                                onChange={handleInputChange}
                                            ></input>
                                        </div>
                                    </div>
                                    <div style={styles.labelFormCaptionCont}>
                                        <p style={styles.rowTitle}>PopUp Opacity</p>
                                        <div style={styles.rowInput}>
                                            <label style={styles.labelInput}>%</label>
                                            <input
                                                type="text"
                                                style={styles.labelFormInput}
                                                name="dialougeOpacity"
                                                value={labels[currentIndex]?.dialougeOpacity}
                                                onChange={handleInputChange}
                                            ></input>
                                        </div>
                                        <div style={styles.rowInput}>
                                            <input
                                                type="range"
                                                style={styles.rangeInput}
                                                min={0}
                                                value={formInput.dialougeOpacity}
                                                name="dialougeOpacity"
                                                onChange={handleInputChange}
                                                step={2}
                                                max={100}
                                            />
                                        </div>

                                    </div>
                                    <div style={styles.labelFormCaptionCont}>
                                        <p style={styles.rowTitle}>Label Color</p>
                                        <div style={styles.rowInput}>
                                            <input
                                                type="color"
                                                name="labelColor"
                                                value={formInput.labelColor}
                                                onChange={handleInputChange}
                                            ></input>
                                        </div>
                                    </div>
                                    <div style={styles.labelFormCaptionCont}>
                                        <p style={styles.rowTitle}>Label Popup Color</p>
                                        <div style={styles.rowInput}>
                                            <input
                                                type="color"
                                                name="dialougeColor"
                                                value={formInput.dialougeColor}
                                                onChange={handleInputChange}
                                            ></input>
                                        </div>
                                    </div>
                                </>
                            )}
                            <button style={styles.showStylesButton} onClick={(e) => handleShowConfigs(e)}>
                                <p>Configs</p>
                                {showConfigs ? (<FaMinus />) : (<FaPlus />)}
                            </button>
                            {showConfigs && (
                                <>
                                    <div style={styles.labelSingleFieldCont}>
                                        <label style={styles.labelForSingleField}>
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder={labels[currentIndex]?.title}
                                            style={styles.labelFormCaption}
                                            value={formInput.title}
                                            onChange={handleInputChange}
                                        ></input>
                                    </div>
                                    <div style={
                                        {
                                            ...styles.labelSingleFieldCont,
                                            height: "192px",
                                            marginTop: "0px",
                                            marginBottom: "18px"
                                        }}>
                                        <label style={styles.labelForSingleField}>
                                            Description
                                        </label>
                                        <textarea
                                            type="text"
                                            name="desc"
                                            placeholder={labels[currentIndex]?.desc}
                                            style={styles.labelFormTextArea}
                                            value={formInput.desc}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                    <div style={styles.labelSingleFieldCont}>
                                        <label style={styles.labelForSingleField}>
                                            CTA
                                        </label>
                                        <input
                                            type="text"
                                            name="buttonTitle"
                                            placeholder={labels[currentIndex]?.buttonTitle}
                                            style={styles.labelFormCaption}
                                            value={formInput.buttonTitle}
                                            onChange={handleInputChange}
                                        ></input>
                                    </div>

                                    <div style={styles.labelSingleFieldCont}>
                                        <label style={styles.labelForSingleField}>
                                            Button Link
                                        </label>
                                        <input
                                            type="text"
                                            name="buttonLink"
                                            placeholder={labels[currentIndex]?.buttonLink}
                                            style={styles.labelFormCaption}
                                            value={formInput.buttonLink}
                                            onChange={handleInputChange}
                                        ></input>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                ) : (

                    <div style={styles.labelsButton}>
                        <button
                            style={styles.labelAddButton}
                            onClick={() => addNewLabel()}
                        >
                            <FaPlus />
                        </button>
                        <p style={styles.navButtonP}>
                            Add
                        </p>
                    </div>

                )
                }
                <button
                    style={styles.labelFormButton}
                    onClick={() => handleSubmit()}>
                    Save Labels
                </button>
            </div>
        </>
    );
});

export default LabelFormComponent;
