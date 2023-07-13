import {
  useEffect,
  useRef,
  useState,
  MouseEvent,
  MouseEventHandler,
} from "react";
import Palette from "./Palette/Palette";
import useMousePosition from "@/hooks/useMousePosition";
import type { Brush, BrushPos, Stroke } from "@/types/canvas";
import { Socket } from "socket.io-client";
import { CanvasEvent } from "@/types/event";

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

const Sizes: { [key: number]: number } = {
  0: 2,
  1: 5,
  2: 15,
  3: 35,
  4: 50,
};

const DURATION = 10;
const throttle = (function () {
  let timeout: any = undefined;
  return function throttle(callback: () => void) {
    if (timeout === undefined) {
      callback();
      timeout = setTimeout(() => {
        // allow another call to be throttled
        timeout = undefined;
      }, DURATION);
    }
  };
})();

/**
 * Wraps callback in a function and throttles it.
 * @returns Wrapper function
 */
function throttlify(callback: (arg0: any) => void) {
  return function throttlified(event: any) {
    throttle(() => {
      callback(event);
    });
  };
}

type CanvasProps = {
  socket?: Socket | null; // Because of offline mode, socket is an optional parameter
};

const Canvas = (props: CanvasProps) => {
  const [brush, setBrush] = useState<Brush>({
    color: 0,
    size: 1,
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
      let ctx = canvasCtxRef.current;

      if (ctx) {
        ctx.globalCompositeOperation = "source-over";
        // Filter to enforce pixelated look
        ctx.filter = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><filter id="f" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncA type="discrete" tableValues="0 1"/></feComponentTransfer></filter></svg>#f')`;
        ctx.imageSmoothingEnabled = false;
        ctx.lineJoin = ctx.lineCap = "round";
      }
    }
  }, []);

  useEffect(() => {
    if (!props.socket) return;

    props.socket.on("stroke", (receivedStroke: Stroke) => {
      //console.log("Received stroke!");
      stroke(receivedStroke, true);
    });

    props.socket.on("clear", () => {
      console.log("Clearing....");
      clearCanvas(true);
    });

    return () => {
      // Dismount socket events
      props.socket!.off("stroke");
      props.socket!.off("clear");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.socket]);

  const changeColor = (color: number): void => {
    setBrush({ ...brush, color });
  };

  const changeTool = (tool: string): void => {
    setBrush({ ...brush, tool });
  };

  const changeBrushSize = (size: number): void => {
    setBrush({ ...brush, size });
  };

  /**
   * This function is what runs when the clear button is pressed.
   * This is so that the data from the onClick event doesn't
   * get passed into the eventReceived parameter, which oddly enough
   * doesn't create an error when given the wrong type...
   */
  const handleClearCanvas = () => {
    clearCanvas(false);
  };

  /**
   *
   * @param eventReceived Whether or not the event comes from another socket. Defaults to false
   * @returns
   */
  const clearCanvas = (eventReceived: boolean = false): void => {
    if (canvasRef.current) {
      let ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (eventReceived || !props.socket) return;
      props.socket.emit(CanvasEvent.Clear);
    }
  };

  const handleMouseDown: MouseEventHandler = (
    e: MouseEvent<HTMLCanvasElement>
  ) => {
    handleBrushPos(e);
    setPrevBrushPos({ x: brushPos.x, y: brushPos.y });
    switch (brush.tool) {
      case "pencil": {
        setDrawing(true);
      }
      case "fill": {
        let floodColor = Colors[brush.color];
        let fillColor = Array.from(
          canvasCtxRef
            .current!.getImageData(brushPos.x, brushPos.y, 1, 1)
            .data.slice(0, 3)
        );
        floodFill(brushPos.x, brushPos.y, [0, 0, 0], "");
      }
    }
  };

  const handleMouseMove: MouseEventHandler = (
    e: MouseEvent<HTMLCanvasElement>
  ) => {
    handleBrushPos(e);
    if (drawing) {
      stroke({ startPos: prevBrushPos, endPos: brushPos, brush }, false);
      setPrevBrushPos({ x: brushPos.x, y: brushPos.y });
    }
  };

  const handleMouseUp: MouseEventHandler = (
    e: MouseEvent<HTMLCanvasElement>
  ) => {
    if (drawing) {
      // This makes sure that if a user clicks the canvas without moving it will still draw.
      if (prevBrushPos.x === brushPos.x && prevBrushPos.y === brushPos.y) {
        stroke({ startPos: brushPos, endPos: brushPos, brush }, false);
      }
    }
    setDrawing(false);
  };

  const stroke = (data: Stroke, eventReceived: boolean = false): void => {
    let ctx = canvasCtxRef.current;
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(data.startPos.x, data.startPos.y);
    ctx.lineTo(data.endPos.x, data.endPos.y);
    ctx.strokeStyle = Colors[data.brush.color];
    ctx.lineWidth = Sizes[data.brush.size];
    ctx.stroke();
    ctx.closePath();

    if (eventReceived || !props.socket) return;
    props.socket.emit(CanvasEvent.Stroke, data);
  };

  /**
   * Recursive function to simulate flood fill tool
   *
   * @param x x-coordinate of pixel
   * @param y y-coordinate of pixel
   * @param fillColor color to be flooded
   * @param checkColor color to be filled
   */
  const floodFill = (
    x: number,
    y: number,
    fillColor: number[],
    checkColor: string
  ): void => {};

  return (
    <div className="flex flex-col align-center rounded mx-2 md:ml-0 md:p-2 max-w-3xl bg-slate-700">
      <h1 className="flex-1 text-3xl font-bold">_ _ _ _ _ _</h1>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={throttlify(handleMouseMove)}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        width="600"
        height="500"
        id="gamecanvas"
        className="bg-white mb-2"
        aria-label="Game Canvas"
      ></canvas>
      <Palette
        defaultBrush={brush}
        changeColor={changeColor}
        changeTool={changeTool}
        changeBrushSize={changeBrushSize}
        clearCanvas={handleClearCanvas}
      />
    </div>
  );
};

export default Canvas;
