import { Ghost, GhostMode } from "./Ghost.types";
import { Direction } from "../../../App.types";

export const GHOST_STEP_INCREMENT = 15;

export const GHOST_INITIAL_DATA: Ghost = {
  row: 11,
  column: 13,
  x: 195,
  y: 165,
  mode: GhostMode.Normal,
  direction: Direction.Up,
};
