import { makeObservable, observable, action } from 'mobx';

class AssetManagerStore {
    openAssetManegerModal = false;
    imageInStore = '';

    constructor() {
        makeObservable(this, {
            openAssetManegerModal: observable,
            imageInStore: observable,
            setOpenAssetManegerModal: action,
            setImageInStore: action,
        });
    }

    setOpenAssetManegerModal = (value: boolean) => {
        this.openAssetManegerModal = value;
    };

    setImageInStore = (image: string) => {
        this.imageInStore = image; 
    };
}

const assetManagerStore = new AssetManagerStore();
export default assetManagerStore;

