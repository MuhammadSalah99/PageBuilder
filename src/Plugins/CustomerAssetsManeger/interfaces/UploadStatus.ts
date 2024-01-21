interface UploadStatus {
    name: string;
    progress: number;
    status: 'uploading' | 'done' | 'error';
}

export default UploadStatus;

