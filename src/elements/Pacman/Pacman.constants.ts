import { Sprite } from "./Pacman.types";

export const INTERVAL_MOVE = 130; //65; // milliseconds

export const INITIAL_SETTINGS: Sprite = {
  isMoving: false,
  id: "pacmanDiv",
  stepsRatio: 1,
  previousDirection: "",
  currentDirection: "",
  liveDirection: "",
  intervalMover: 0,
  row: 23,
  column: 14,
  x: 210,
  y: 345,
  steps: 0,
};
