import { useEffect, useRef, useState } from "react";
import Palette from "./Palette/Palette";
import useMousePosition from "@/hooks/useMousePosition";

type CanvasProps = {};

const Colors: { [key: number]: string } = {
  0: "#000000",
  1: "#6b7280",
  2: "#ffffff",
  3: "#ef4444",
  4: "#f97316",
  5: "#eab308",
  6: "#22c55e",
  7: "#3b82f6",
};

const Canvas = (props: CanvasProps) => {
  const [color, setColor] = useState<number>(0);
  const [brushSize, setBrushSize] = useState<number>(10);
  const [brushPos, handleBrushPos] = useMousePosition();
  const [prevBrushPos, setPrevBrushPos] = useState({ x: 0, y: 0 });
  const [tool, setTool] = useState(0);
  const [drawing, setDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext("2d");
      let ctx = canvasCtxRef.current;
    }
  }, []);

  const changeColor = e => {
    setColor(e.target.value);
  };

  const changeTool = e => {
    setTool(e.target.value);
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      let ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleMouseDown = e => {
    handleBrushPos(e);
    setPrevBrushPos({ x: brushPos.x, y: brushPos.y });
    if (tool === 0) {
      setDrawing(true);
    } else {
    }
  };

  const handleMouseMove = e => {
    handleBrushPos(e);
    if (drawing) {
      //console.log(brushPos.x, brushPos.y);
      stroke(brushPos.x, brushPos.y);
    }
  };

  const handleMouseUp = e => {
    setDrawing(false);
  };

  const floodFill = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: number
  ) => {};

  const stroke = (x: number, y: number) => {
    let ctx = canvasCtxRef.current;

    if (ctx) {
      ctx.globalCompositeOperation = "source-over";
      ctx.imageSmoothingEnabled = false;
      ctx.lineJoin = ctx.lineCap = "round";
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = Colors[color];
      ctx.beginPath();
      ctx.moveTo(prevBrushPos.x, prevBrushPos.y);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();

      setPrevBrushPos({ x: brushPos.x, y: brushPos.y });
    }
  };

  return (
    <div className="rounded flex-1 mx-2 md:ml-0 md:p-2 w-1/2 max-w-3xl bg-slate-700">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        width="500"
        height="500"
        className="bg-white mx-auto mb-2"
      ></canvas>
      <Palette
        changeColor={changeColor}
        changeTool={changeTool}
        clearCanvas={clearCanvas}
      />
    </div>
  );
};

export default Canvas;
