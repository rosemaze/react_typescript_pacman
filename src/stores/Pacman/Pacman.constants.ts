import { PacmanStore } from "./Pacman.store";
import { Direction } from "../../App.types";

import { Pacman } from "./Pacman.types";

export const PACMAN_STEP_INCREMENT = 15;

export const PACMAN_INITIAL_DATA: Pacman = {
  x: 210,
  y: 345,
  row: 23,
  column: 14,
  direction: Direction.Left,
  previousDirection: Direction.Left,
};
