import { useEffect, ChangeEvent } from 'react'
import ImageData from '../interfaces/ImageInterface';
import styles from '../styles/CustomAssetsManegerStyles';
import localForage from 'localforage';

type ImageUploaderProps = {
    imagesData: ImageData[],
    setImagesData: (image: ImageData[]) => void,
    setActiveTab: (tab: string) => void,
}




const ImageUploader: React.FC<ImageUploaderProps> = ({ imagesData, setImagesData, setActiveTab }) => {



    useEffect(() => {

        const loadImageData = async () => {
            try {
                const keys = await localForage.keys();
                const images = await Promise.all(keys.map(async (key) => {
                    const imageData = await localForage.getItem(key) as ImageData;
                    return {
                        ...imageData,
                        url: imageData.blob,
                    };
                }));
                setImagesData(images);
            } catch (error) {
                console.error('There was an error loading the images: ', error);
            }
        };

        loadImageData();
    }, []);



    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('test')
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageAlreadyExists = imagesData.some(
                (imageData) => imageData.name === file.name
            );

            if (imageAlreadyExists) {

                setActiveTab("uploadedAssets")
                return;
            }
            else {
                saveImageToIndexedDB(file);
                setActiveTab("uploadedAssets")
            }
            if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
                console.error(`${file.type} is not a supported format`);
            }

        }
    };

    const saveImageToIndexedDB = async (imageFile: File) => {
        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const imageData: ImageData = {
                    blob: e.target.result, 
                    name: imageFile.name,
                    width: 0,
                    height: 0, 
                };
                await localForage.setItem(imageFile.name, imageData);

                setImagesData(prev => [...prev, imageData]);
            };
            reader.readAsDataURL(imageFile);
        } catch (error) {
            console.error('There was an error uploading the image: ', error);
        }
    };


    return (
        <>
            <input
                type="file"
                id="file-upload" 
                onChange={handleImageChange}
                style={styles.droppableInput}
                multiple
                accept="image/*, video/*"
            />
            <label htmlFor="file-upload" style={styles.buttonStyle}>Upload Images</label> {/* This label works as a button */} 
        </>

    )
}

export default ImageUploader;
