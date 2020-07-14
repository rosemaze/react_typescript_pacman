import { POSSIBLE_DIRECTIONS } from "../../Game/Game.constants";
import { Direction } from "../../Game/Game.types";

export const getPossibleDirections = (options: {
  row: number;
  col: number;
  directionsGrid: number[][];
}) => {
  const { row, col, directionsGrid } = options;

  const currentPossibleDirections = directionsGrid[row][col];
  switch (currentPossibleDirections) {
    case POSSIBLE_DIRECTIONS.Top:
      return [Direction.Up];

    case POSSIBLE_DIRECTIONS.Bottom:
      return [Direction.Down];

    case POSSIBLE_DIRECTIONS.Left:
      return [Direction.Left];

    case POSSIBLE_DIRECTIONS.Right:
      return [Direction.Right];

    case POSSIBLE_DIRECTIONS.TopRight:
      return [Direction.Up, Direction.Right];

    case POSSIBLE_DIRECTIONS.TopRightBottom:
      return [Direction.Up, Direction.Right, Direction.Down];

    case POSSIBLE_DIRECTIONS.TopRightBottomLeft:
      return [Direction.Up, Direction.Right, Direction.Down, Direction.Left];

    case POSSIBLE_DIRECTIONS.TopBottom:
      return [Direction.Up, Direction.Down];

    case POSSIBLE_DIRECTIONS.TopLeft:
      return [Direction.Up, Direction.Left];

    case POSSIBLE_DIRECTIONS.TopRightLeft:
      return [Direction.Up, Direction.Right, Direction.Left];

    case POSSIBLE_DIRECTIONS.TopBottomLeft:
      return [Direction.Up, Direction.Down, Direction.Left];

    case POSSIBLE_DIRECTIONS.BottomRightLeft:
      return [Direction.Right, Direction.Down, Direction.Left];

    case POSSIBLE_DIRECTIONS.BottomRight:
      return [Direction.Right, Direction.Down];

    case POSSIBLE_DIRECTIONS.BottomLeft:
      return [Direction.Down, Direction.Left];

    case POSSIBLE_DIRECTIONS.LeftRight:
      return [Direction.Left, Direction.Right];

    default:
      throw Error("error: no possible direction");
      return [];
  }
};
