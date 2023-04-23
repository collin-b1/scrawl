import {
  useEffect,
  useRef,
  useState,
  MouseEvent,
  ChangeEvent,
  MouseEventHandler,
  ChangeEventHandler,
} from "react";
import Palette from "./Palette/Palette";
import useMousePosition from "@/hooks/useMousePosition";
import type { Brush, BrushPos } from "@/types/canvas";

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
  const [brush, setBrush] = useState<Brush>({
    color: 0,
    size: 10,
    tool: "pencil",
  });
  const [brushPos, handleBrushPos] = useMousePosition();
  const [prevBrushPos, setPrevBrushPos] = useState<BrushPos>({ x: 0, y: 0 });
  const [drawing, setDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext("2d");
    }
  }, []);

  const changeColor = (color: number): void => {
    setBrush({ ...brush, color });
  };

  const changeTool = (tool: string): void => {
    setBrush({ ...brush, tool });
  };

  const changeBrushSize = (size: number): void => {
    setBrush({ ...brush, size });
  };

  const clearCanvas = (): void => {
    if (canvasRef.current) {
      let ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleMouseDown: MouseEventHandler = (
    e: MouseEvent<HTMLCanvasElement>
  ) => {
    handleBrushPos(e);
    setPrevBrushPos({ x: brushPos.x, y: brushPos.y });
    if (brush.tool === "pencil") {
      setDrawing(true);
    } else {
    }
  };

  const handleMouseMove: MouseEventHandler = (
    e: MouseEvent<HTMLCanvasElement>
  ) => {
    handleBrushPos(e);
    if (drawing) {
      stroke(brushPos.x, brushPos.y);
    }
  };

  const handleMouseUp: MouseEventHandler = (
    e: MouseEvent<HTMLCanvasElement>
  ) => {
    setDrawing(false);
  };

  const stroke = (x: number, y: number) => {
    let ctx = canvasCtxRef.current;

    if (ctx) {
      ctx.globalCompositeOperation = "source-over";

      // Filter to enforce pixelated look
      ctx.filter = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><filter id="f" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncA type="discrete" tableValues="0 1"/></feComponentTransfer></filter></svg>#f')`;
      ctx.imageSmoothingEnabled = false;
      ctx.lineJoin = ctx.lineCap = "round";
      ctx.lineWidth = brush.size;
      ctx.strokeStyle = Colors[brush.color];

      ctx.beginPath();
      ctx.moveTo(prevBrushPos.x, prevBrushPos.y);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();

      setPrevBrushPos({ x: brushPos.x, y: brushPos.y });
    }
  };

  return (
    <div className="rounded mx-2 md:ml-0 md:p-2 max-w-3xl bg-slate-700">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        width="500"
        height="400"
        id="gamecanvas"
        className="bg-white mb-2"
        aria-label="Game Canvas"
      ></canvas>
      <Palette
        changeColor={changeColor}
        changeTool={changeTool}
        changeBrushSize={changeBrushSize}
        clearCanvas={clearCanvas}
      />
    </div>
  );
};

export default Canvas;
