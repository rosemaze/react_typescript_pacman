export enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

export interface Sprite {
  x: number;
  y: number;
  row: number;
  column: number;
  direction: Direction;
}
