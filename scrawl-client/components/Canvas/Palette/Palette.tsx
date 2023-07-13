import { Brush } from "@/types/canvas";
import PencilIcon from "./PencilIcon";
import TrashIcon from "./TrashIcon";
import {
  ChangeEventHandler,
  MouseEventHandler,
  MouseEvent,
  ChangeEvent,
} from "react";

interface PaletteProps {
  defaultBrush: Brush;
  changeColor: (color: number) => void;
  changeTool: (tool: string) => void;
  changeBrushSize: (size: number) => void;
  clearCanvas: () => void;
}

const Palette = ({
  defaultBrush,
  changeColor,
  changeTool,
  changeBrushSize,
  clearCanvas,
}: PaletteProps) => {
  const handleColorClick: MouseEventHandler = (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    changeColor(parseInt(e.currentTarget.value));
  };

  const handleToolClick: MouseEventHandler = (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    changeTool(e.currentTarget.value);
  };

  const handleSizeChange: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    changeBrushSize(parseInt(e.target.value));
  };

  const colors = [
    {
      name: "Black",
      classColor: "bg-black",
    },
    {
      name: "Gray",
      classColor: "bg-gray-500",
    },
    {
      name: "White",
      classColor: "bg-white text-black",
    },
    {
      name: "Red",
      classColor: "bg-red-500",
    },
    {
      name: "Orange",
      classColor: "bg-orange-500",
    },
    {
      name: "Yellow",
      classColor: "bg-yellow-500",
    },
    {
      name: "Green",
      classColor: "bg-green-500",
    },
    {
      name: "Blue",
      classColor: "bg-blue-500",
    },
  ];

  return (
    <div className="flex w-full">
      {colors.map((color, i) => (
        <div
          key={i}
          className="rounded mr-1 flex align-center rounded border-solid border-2 border-slate-400"
        >
          <button
            value={i}
            aria-label={color.name}
            onClick={handleColorClick}
            className={`w-8 h-8 flex-1 ${color.classColor}`}
          ></button>
        </div>
      ))}
      <div className="flex-1 flex align-center px-2">
        <input
          type="range"
          min={0}
          max={4}
          defaultValue={defaultBrush.size}
          step={1}
          onChange={handleSizeChange}
          className="w-32 flex-1"
        ></input>
      </div>
      <div className="flex align-center mr-1 rounded border-solid border-2 border-slate-400">
        <button value="pencil" onClick={handleToolClick} className="w-8 h-8">
          ✏️
        </button>
      </div>
      <div className="flex align-center mr-1 rounded border-solid border-2 border-slate-400">
        <button value="fill" onClick={handleToolClick} className="w-8 h-8">
          🪣
        </button>
      </div>
      <div className="flex align-center mr-1 rounded border-solid border-2 border-slate-400">
        <button onClick={clearCanvas} className="w-8 h-8">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default Palette;
