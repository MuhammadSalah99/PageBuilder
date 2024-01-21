interface ImageData {
    blob: string; // Blob data URL
    name: string;
    width: number;
    height: number;
    url?: string; // Optional, used for rendering
}

export default ImageData
