import React, { useRef, useEffect } from "react";
import imageSrc from "../../images/axo.jpg";

const Playground = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const image = new Image();
  image.src = imageSrc;

  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const canvasContex = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvasContex.drawImage(image, 0, 0);

    canvas.toBlob(blob => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(blob as Blob);

      fileReader.onload = () => {
        imageRef.current!.src = fileReader.result as string;
      };
    });
  };

  return (
    <div>
      <h1>Image</h1>
      <img src={imageSrc} />
      <img ref={imageRef} />
    </div>
  );
};

export default Playground;
