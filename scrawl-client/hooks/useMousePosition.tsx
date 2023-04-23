import { useEffect, useState } from "react";

interface MousePositionTypes {
  x: number;
  y: number;
}

const useMousePosition = (
  global: boolean = false
): [MousePositionTypes, (event: MouseEvent) => void] => {
  const [mouseCoords, setMouseCoords] = useState<MousePositionTypes>({
    x: 0,
    y: 0,
  });

  const handleCursorMovement = (event: MouseEvent): void => {
    //@ts-ignore
    let rect = event.target.getBoundingClientRect();
    setMouseCoords({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (global) {
      window.addEventListener("mousemove", handleCursorMovement);
      return () => {
        window.removeEventListener("mousemove", handleCursorMovement);
      };
    }
  }, [global]);

  return [mouseCoords, handleCursorMovement];
};

export default useMousePosition;
