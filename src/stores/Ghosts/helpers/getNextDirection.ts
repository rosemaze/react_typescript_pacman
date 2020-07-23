import { GhostStore } from "../models/Ghost.model";
import { GhostMode } from "../models/Ghost.types";
import { getHomingDirection } from "./getHomingDirection";
import { getRandomPossibleDirection } from "./getRandomPossibleDirection";

export const getNextDirection = (
  ghost: GhostStore,
  directionsGrid: number[][]
) => {
  if (ghost.mode === GhostMode.Homing) {
    return getHomingDirection({
      col: ghost.column,
      row: ghost.row,
      currentDirection: ghost.direction,
      directionsGrid,
    });
  }

  return {
    mode: ghost.mode,
    direction: getRandomPossibleDirection({
      col: ghost.column,
      row: ghost.row,
      currentDirection: ghost.direction,
      directionsGrid,
    }),
  };
};
