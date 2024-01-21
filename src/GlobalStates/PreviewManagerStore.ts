import { makeObservable, observable, action } from 'mobx';

class PreviewManagerStore {
    isPreview: boolean = false;

    constructor() {
        makeObservable(this, {
            isPreview: observable,
            setIsPreview: action,
        });
    }

    setIsPreview = (value: boolean) => {
        this.isPreview = value;
    }
}


const previewManagerStore = new PreviewManagerStore();
export default previewManagerStore;
