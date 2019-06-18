import { useState, useEffect } from "react";

export const useMousePosition = () => {
  const [x, setX] = useState();
  const [y, setY] = useState();

  useEffect(() => {
    window.addEventListener("mousemove", event => {
      setX(event.offsetX);
      setY(event.offsetY);
    });
  });

  return { x, y };
};
