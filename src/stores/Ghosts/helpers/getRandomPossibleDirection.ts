import { getOppositeDirection } from "./getOppositeDirection";
import { getPossibleDirections } from "./getPossibleDirections";
import { Direction } from "../../../App.types";

export const getRandomPossibleDirection = (options: {
  row: number;
  col: number;
  currentDirection: Direction;
  directionsGrid: number[][];
}) => {
  const { row, col, directionsGrid, currentDirection } = options;

  // 1. Get possible directions for the current grid position
  // 2. Remove opposite direction
  // ## Ghosts are not allowed to reverse direction unless frightened,
  // so remove the direction opposite to the current direction
  const possibleDirections = getPossibleDirections({
    row,
    col,
    directionsGrid,
  }).filter(
    (direction) => direction !== getOppositeDirection(currentDirection)
  );

  // Pick one direction randomly from the pool of possible directions
  const randomIndex = Math.floor(Math.random() * possibleDirections.length);

  return possibleDirections[randomIndex];
};
