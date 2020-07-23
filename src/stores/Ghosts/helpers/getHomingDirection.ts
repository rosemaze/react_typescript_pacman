import { Direction } from "../../../App.types";
import { GhostMode } from "../models/Ghost.types";
import { getPossibleDirections } from "./getPossibleDirections";
import { getOppositeDirection } from "./getOppositeDirection";
import { getRandomNumberWithFloor } from "./getRandomNumberWithFloor";

interface HomingDirectionResult {
  direction: Direction;
  mode: GhostMode;
}

export const getHomingDirection = (options: {
  row: number;
  col: number;
  currentDirection: Direction;
  directionsGrid: number[][];
}): HomingDirectionResult => {
  let result = {
    direction: Direction.Up,
    mode: GhostMode.Homing,
  };
  const { col, row, currentDirection, directionsGrid } = options;

  // Heuristics to enter home if we are near by
  if (col == 13) {
    if (row === 11 || row === 12 || row === 13) {
      // If we are in front of door just go inside
      return {
        ...result,
        direction: Direction.Down,
      };
    }

    if (row === 14) {
      // If we are in the house switch ghost mode to spawning
      return {
        direction: Direction.Right,
        mode: GhostMode.Spawning,
      };
    }
  }

  if (col == 9 && (row == 17 || row == 14)) {
    return {
      ...result,
      direction: Direction.Up,
    };
  }

  if ((col == 9 || col == 12) && row == 11) {
    return {
      ...result,
      direction: Direction.Right,
    };
  }

  if ((col === 15 || col === 18) && row === 11) {
    return {
      ...result,
      direction: Direction.Left,
    };
  }

  if (col === 18 && row === 17) {
    return {
      ...result,
      direction: Direction.Left,
    };
  }

  // We are not anywhere near the home, get all possible directions
  const possibleDirections = getPossibleDirections({
    row,
    col,
    directionsGrid,
  }).filter(
    (direction) => direction !== getOppositeDirection(currentDirection)
  );
  let newDirection =
    possibleDirections[getRandomNumberWithFloor(possibleDirections.length)];

  // If we are further away horizontally then try to go horizontal
  if (Math.abs(14 - col) > Math.abs(15 - row)) {
    const optimumHorizontalDirection =
      14 - col > 0 ? Direction.Right : Direction.Left;

    if (possibleDirections.includes(optimumHorizontalDirection)) {
      newDirection = optimumHorizontalDirection;
    }
    return { ...result, direction: newDirection };
  }

  // Go vertically
  const optimumVerticalDirection = 15 - row > 0 ? Direction.Down : Direction.Up;
  if (possibleDirections.includes(optimumVerticalDirection)) {
    newDirection = optimumVerticalDirection;
  }
  return {
    ...result,
    direction: newDirection,
  };
};
