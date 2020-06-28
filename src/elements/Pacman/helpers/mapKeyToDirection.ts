import { Directions } from "../../../stores/Game/Game.types";

export const mapKeyToDirection = (key: string) => {
  switch (key) {
    case "ArrowLeft":
      return Directions.Left;
    case "ArrowRight":
      return Directions.Right;
    case "ArrowDown":
      return Directions.Down;
    case "ArrowUp":
      return Directions.Up;
    default:
      return undefined;
  }
};
