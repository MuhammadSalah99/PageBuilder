import { useState } from 'react';
import styles from '../styles/UploadedAssetsStyles.ts';
import ImageData from '../interfaces/ImageInterface.ts';
import localForage from 'localforage';
import assetManegerStore from '../../../GlobalStates/AssetManagerStore.ts';
import { RxCheck } from 'react-icons/rx';

type UploadedAssetsPropsType = {
    ImagesData: ImageData[],
    setImagesData: (value: ImageData[]) => void,
    setClose: (value: boolean) => void
}
const UploadedAssets: React.FC<UploadedAssetsPropsType> = ({ ImagesData, setImagesData, setClose }) => {
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const [pickedImage, setPickedImage] = useState<string>("");

    const { setImageInStore, imageInStore } = assetManegerStore;


    const handleImageClick = (url: string) => {
        setPickedImage(url);
    }
    const handleSubmit = () => {
        setImageInStore(pickedImage);
        setClose(false);
    }
    const handleRemoveImage = async (name: string, url: string) => {
        const newImagesData = ImagesData.filter((imageData: ImageData) => imageData.name !== name);
        setImagesData(newImagesData);

        if (imageInStore === url) {
            setImageInStore("");
            console.log('Image removed');
        }

        try {
            await localForage.removeItem(name);
        } catch (error) {
            console.error('There was an error removing the image from IndexedDB:', error);
        }
    };

    return (
        <div style={styles.modalActions}>
            <div style={styles.uploadedCont}>
                {ImagesData.slice().map((image: ImageData, index: number) => (
                    <div key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(1)}
                        style={{
                            ...styles.uploadedPreviewCont,
                        }}
                    >
                        <div
                            onClick={() => handleImageClick(image.blob)}
                            style={{
                                ...styles.previewImage, backgroundImage: `url(${image.blob})`,
                                ...(image.url === pickedImage ? { backgroundColor: "#6d6d6d", border: "2px solid #C1393B" } : {})
                            }}>

                            {hoveredIndex === index && <button style={styles.removeButton} onClick={() => handleRemoveImage(image.name, image.url)}>X</button>}
                            {image.url === pickedImage && (
                                <div style={styles.selectCheck}>
                                    <RxCheck />
                                </div>
                            )
                            }
                        </div>
                        <div
                            onClick={() => handleImageClick(image.blob)}
                            style={styles.imageMeta}>
                            <p style={{ ...styles.nameSpan, ...(image.url === pickedImage ? { color: "white" } : {}) }}>{image.name}</p>
                        </div>
                    </div>
                ))}

            </div>
            <button onClick={handleSubmit} style={{
                ...styles.submitButton,
                ...(pickedImage != '' ? { backgroundColor: "#ED1C25", color: "white" } : {})
            }}>
                Add
            </button>
        </div>
    );
}

export default UploadedAssets;

