export type BrushPos = {
  x: number;
  y: number;
};

export type Brush = {
  color: number;
  size: number;
  tool: string;
};

export type Stroke = {
  startPos: BrushPos;
  endPos: BrushPos;
  brush: Brush;
};

export type RGBColor = {
  r: number;
  g: number;
  b: number;
};
