import { useState, ChangeEvent, useEffect } from 'react';
import styles from './styles/CustomAssetsManegerStyles';
import { RiCloseLine, RiSearchLine } from 'react-icons/ri';
import localForage from 'localforage';
import UploadedAssets from './utilities//UploadedAssets.tsx';
import ImageData from './interfaces/ImageInterface';
import ImageUploader from './utilities//ImageUploader';
import assetManagerStore from '../../GlobalStates/AssetManagerStore.ts';

localForage.config({
    name: 'myApp',
    storeName: 'imageStore',
    description: 'Stores user uploaded images',
});

const CustomAssetManeger: React.FC = () => {

    const [imagesData, setImagesData] = useState<ImageData[]>([])
    const [activeTab, setActiveTab] = useState<string>("All");
    const [filteredData, setFilteredData] = useState<ImageData[]>(imagesData);
    const [, setSearchPhrase] = useState('');

    const { setOpenAssetManegerModal } = assetManagerStore;

    useEffect(() => {
        loadImageData(activeTab);
    }, [activeTab])

    useEffect(() => {
        setFilteredData(imagesData);
        setActiveTab("All");
    }, [])

    const loadImageData = async (tab: string) => {
        try {
            const keys = await localForage.keys();
            const images = await Promise.all(keys.map(async (key:string) => {
                const imageData = await localForage.getItem(key) as ImageData;
                return {
                    ...imageData,
                    url: imageData.blob,
                };
            }));
            setImagesData(images);
            const tabImages = images.filter((item: ImageData) => {
                if (tab === "Image") {
                    return item.blob.startsWith('data:image');
                }
                if (tab === "Video") {
                    return item.blob.startsWith('data:video')
                }
                else {
                    return item;
                }
            })
            setFilteredData(tabImages);
        } catch (error) {
            console.error('There was an error loading the images: ', error);
        }
    };

    const handleTabChange = (tab: string) => {
        loadImageData(tab);
        setActiveTab(tab);
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();
        const filtered = imagesData.filter(item =>
            item.name.toLowerCase().includes(searchTerm)
        );
        setSearchPhrase(searchTerm);
        setFilteredData(filtered);
    };


    return (
        <>
            <div style={styles.darkBG} className="darkBg" onClick={() => setOpenAssetManegerModal(false)} />
            <div style={styles.centered}>
                <div style={styles.modal}>

                    <div style={styles.modalHeader}>
                        <div style={styles.headRow}>
                            <h5 style={styles.heading}>Select Image</h5>
                            <RiCloseLine style={styles.closeBtn} onClick={() => setOpenAssetManegerModal(false)} />
                        </div>
                        <div style={{ ...styles.headRow, width: "96%" }}>
                            <div style={styles.searchContainer}>
                                <input placeholder="Search" style={styles.searchInput} onChange={handleSearch} />
                                <RiSearchLine style={styles.searchIcon} />
                            </div>
                            <ImageUploader imagesData={imagesData} setImagesData={setImagesData} setActiveTab={setActiveTab} />
                        </div>

                        <div style={styles.tabButtonsCont}>
                            <button
                                style={{
                                    ...styles.tabButton,
                                    ...(activeTab === "All" ? styles.activeTabButton : {})
                                }}
                                onClick={() => handleTabChange("All")}
                            >
                                All
                            </button>
                            <button
                                style={{
                                    ...styles.tabButton,
                                    ...(activeTab === "Image" ? styles.activeTabButton : {})
                                }}
                                onClick={() => handleTabChange("Image")}
                            >
                                Image
                            </button>
                            <button
                                style={{
                                    ...styles.tabButton,
                                    ...(activeTab === "Video" ? styles.activeTabButton : {})
                                }}
                                onClick={() => handleTabChange("Video")}
                            >
                                Video
                            </button>
                        </div>
                    </div>

                    <UploadedAssets ImagesData={filteredData} setImagesData={setImagesData}  setClose={setOpenAssetManegerModal}/>
                </div>
            </div>
        </>
    );
}

export default CustomAssetManeger;



