import { useEffect, useState } from 'react';

const useImageLoader = (img:string) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [width, setWidth] = useState<number|null>(null);
  const [height, setHeight] = useState<number|null>(null);

  useEffect(() => {
    const imageToBeLoaded = new Image();

    const handleLoad = () => {
      setImageLoaded(true);
      setHeight(imageToBeLoaded.height);
      setWidth(imageToBeLoaded.width);
    };

    const handleError = () => {
      throw new Error("Something wrong happened while loading the image");
    };

    imageToBeLoaded.src = img;
    imageToBeLoaded.onload = handleLoad;
    imageToBeLoaded.onerror = handleError;

    // Cleanup function to remove event listeners
    return () => {
      imageToBeLoaded.removeEventListener("load", handleLoad);
      imageToBeLoaded.removeEventListener("error", handleError);
    };
  }, [img]);

  return { imageLoaded, width, height };
};

export default useImageLoader;
