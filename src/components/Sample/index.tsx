import * as React from "react";
import loadImage from "blueimp-load-image";
import image from "../../images/rotate.jpg";

class ImageViewer extends React.Component<any, any> {
  imageCanvas = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    loadImage(
      image,
      img => {
        img.className = "fit_to_parent"; // css class: { max-width: 100%; max-height: 100%; }
        this.imageCanvas.current!.appendChild(img);
      },
      { orientation: true }
      // {}
    );
  }

  public render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        ref={this.imageCanvas}
      />
    );
  }
}

export default ImageViewer;
