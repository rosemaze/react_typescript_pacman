import { Direction } from "../../Game/Game.types";

export const getOppositeDirection = (direction: Direction) => {
  switch (direction) {
    case Direction.Down:
      return Direction.Up;
    case Direction.Up:
      return Direction.Down;
    case Direction.Left:
      return Direction.Right;
    case Direction.Right:
      return Direction.Left;
  }
};
