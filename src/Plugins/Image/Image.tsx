import {  useEffect } from 'react'
import styles from './styles';
import { observer } from 'mobx-react';
import assetManagerStore from '../../GlobalStates/AssetManagerStore';

type ImageProps = {
    image: string,
    setImage: (value: string) => void
}
const Image: React.FC<ImageProps> = observer(({ image, setImage }) => {


    const { setOpenAssetManegerModal, imageInStore } = assetManagerStore;
    const dropzoneStyles = image
        ? { width: "100%" }
        : {};

    useEffect(() => {
        setImage(imageInStore)

    }, [imageInStore])

    return (
        <div
            style={{ ...styles.selectedImgCont, ...dropzoneStyles }}
        >

            {!image ? (
                <svg

                    onClick={() => setOpenAssetManegerModal(true)}
                    style={{ color: "white", height: "100%" }} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            ) : (

                <div

                    onClick={() => setOpenAssetManegerModal(true)}
                    style={{ ...styles.selectedImage, backgroundImage: `url(${image})`, backgroundPosition: "center" }}></div>
            )}

        </div>

    )
});

export default Image

