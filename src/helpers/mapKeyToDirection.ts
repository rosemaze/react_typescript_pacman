import { Direction } from "../App.types";

export const mapKeyToDirection = (key: string) => {
  switch (key) {
    case "ArrowLeft":
      return Direction.Left;
    case "ArrowRight":
      return Direction.Right;
    case "ArrowDown":
      return Direction.Down;
    case "ArrowUp":
      return Direction.Up;
    default:
      return undefined;
  }
};
