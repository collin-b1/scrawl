import { useEffect, useState, MouseEvent } from "react";

interface MousePositionTypes {
  x: number;
  y: number;
}

const useMousePosition = (
  global: boolean = false
): [MousePositionTypes, (event: MouseEvent<HTMLElement>) => void] => {
  const [mouseCoords, setMouseCoords] = useState<MousePositionTypes>({
    x: 0,
    y: 0,
  });

  const handleCursorMovement = (event: MouseEvent<HTMLElement>): void => {
    //@ts-ignore
    let rect = event.target.getBoundingClientRect();
    setMouseCoords({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return [mouseCoords, handleCursorMovement];
};

export default useMousePosition;
