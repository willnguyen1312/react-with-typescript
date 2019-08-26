import React, { FC, useState, useRef, useEffect } from "react";
import styled from "styled-components";
// import console from "console";
// import console from "console";

const SliderWrapper = styled.div`
  width: 100%;
  display: inline-block;
  cursor: pointer;
  position: relative;
  padding: 12px 0px;
  color: #4a5157;
`;

const SliderRail = styled.span`
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: currentColor;
  border-radius: 1px;
`;

const SliderThumb: any = styled.span`
  width: 12px;
  height: 12px;
  position: absolute;
  margin-top: -4px;
  margin-left: -6px;
  border-radius: 50%;
  background-color: #e1e0e3;
  left: ${(props: any) => props.left * 100}%;
`;

interface SliderProps {
  min?: number;
  max?: number;
}

class Slider extends React.Component<SliderProps> {
  wrapperRef = React.createRef<HTMLDivElement>();
  containerRef = React.createRef<HTMLDivElement>();

  state = {
    isDragable: false,
    current: 0,
    max: 10,
    min: 0
  };

  getWrapperPosition = () => {
    const wrapper = this.wrapperRef.current as HTMLDivElement;
    const { left, width } = wrapper.getBoundingClientRect();

    return {
      left,
      right: left + width
    };
  };

  componentDidMount = () => {
    window.addEventListener("pointerdown", event => {
      console.log(event.clientX);
    });
    // window.addEventListener("mousemove", this.handleMouseMove);
    // window.addEventListener("mouseup", this.handleMouseUp);

    // const image = new Image();
    // image.src = "https://picsum.photos/id/516/1200/800";

    // image.style.maxHeight = "100%";
    // image.style.maxWidth = "100%";

    // image.onload = () => {
    //   const wrapper = this.containerRef.current as HTMLDivElement;
    //   wrapper.appendChild(image);
    // };
  };

  handleMouseMove = (event: MouseEvent) => {
    const {metaKey} = event
    if (this.state.isDragable) {
      const { clientX } = event;
      const { left, right } = this.getWrapperPosition();
      const width = right - left;
      const { min, max } = this.state;
      let current;

      if (clientX < left) {
        current = 0;
      } else if (clientX > right) {
        current = width;
      } else {
        current = clientX - left;
      }

      const percentage = current / (right - left);

      this.setState({
        current: percentage * (max - min)
      });
    }
  };

  handleMouseUp = () => {
    if (this.state.isDragable) {
      this.setState({ isDragable: false });
      console.log("mouseup");
    }
  };

  render() {
    const { min, max, current } = this.state;
    const left = (current / (max - min)) % 100;
    return (
      // <div style={{ backgroundColor: "#2D363F" }}>
      //   <h1>Slider</h1>
      //   <div
      //     style={{
      //       width: 200,
      //       height: 50,
      //       marginLeft: 20
      //     }}
      //   >
      //     <SliderWrapper
      //       ref={this.wrapperRef}
      //       onMouseDown={() =>
      //         this.setState({ isDragable: !this.state.isDragable })
      //       }
      //     >
      //       <SliderRail />
      //       <SliderThumb left={left} />
      //     </SliderWrapper>
      //   </div>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        ref={this.containerRef}
      />
      // </div>
    );
  }
}

export default Slider;
