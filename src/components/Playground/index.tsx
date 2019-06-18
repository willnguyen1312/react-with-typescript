import React from "react";
import { useMousePosition } from "./useMousePosition";

const Rock = () => {
  const { x, y } = useMousePosition();
  return (
    <div>
      <h1 data-testid="xPosition">{x}</h1>
      <h1 data-testid="yPosition">{y}</h1>
    </div>
  );
};

export default Rock;
