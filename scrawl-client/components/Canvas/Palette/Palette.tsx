import {
  ChangeEventHandler,
  MouseEventHandler,
  MouseEvent,
  ChangeEvent,
} from "react";

interface PaletteProps {
  changeColor: (color: number) => void;
  changeTool: (tool: string) => void;
  changeBrushSize: (size: number) => void;
  clearCanvas: () => void;
}

const Palette = ({
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

  return (
    <div className="flex w-full">
      <button
        value={0}
        aria-label="Black"
        onClick={e => changeColor(parseInt(e.currentTarget.value))}
        className="w-8 h-8 bg-black"
      ></button>
      <button
        value={1}
        aria-label="Gray"
        onClick={handleColorClick}
        className="w-8 h-8 bg-gray-500"
      ></button>
      <button
        value={2}
        aria-label="White"
        onClick={handleColorClick}
        className="w-8 h-8 bg-white text-black"
      ></button>
      <button
        value={3}
        aria-label="Red"
        onClick={handleColorClick}
        className="w-8 h-8 bg-red-500"
      ></button>
      <button
        value={4}
        aria-label="Orange"
        onClick={handleColorClick}
        className="w-8 h-8 bg-orange-500"
      ></button>
      <button
        value={5}
        aria-label="Yellow"
        onClick={handleColorClick}
        className="w-8 h-8 bg-yellow-500"
      ></button>
      <button
        value={6}
        aria-label="Green"
        onClick={handleColorClick}
        className="w-8 h-8 bg-green-500"
      ></button>
      <button
        value={7}
        aria-label="Blue"
        onClick={handleColorClick}
        className="w-8 h-8 bg-blue-500"
      ></button>
      <div className="flex h-8 px-4">
        <input
          type="range"
          min={10}
          max={50}
          defaultValue={10}
          step={10}
          onChange={handleSizeChange}
          className="w-32"
        ></input>
      </div>
      <button value="pencil" onClick={handleToolClick} className="w-8 h-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-full h-full"
          aria-label="Pencil Tool"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      <button onClick={clearCanvas} className="w-8 h-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-full h-full"
          aria-label="Clear Canvas"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
};

export default Palette;
