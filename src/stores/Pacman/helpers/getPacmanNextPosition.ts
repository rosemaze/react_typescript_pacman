import { Direction } from "../../Game/Game.types";
import { paths, INTERVAL_MOVE } from "../../Game/Game.constants";
import { GridValues } from "../../../elements/Grid/Grid.constants";
import { BRICK_MAGNITUDE } from "../../../elements/Grid/features/GridUnit/styles/Wall.style";

interface Options {
  direction: Direction;
  row: number;
  col: number;
  x: number;
  y: number;
  incrementValue: number;
}

export interface PacmanNextPosition {
  rowIndex: number;
  colIndex: number;
  x: number;
  y: number;
  canMove: boolean;
  hasDot: boolean;
  stepInterval: number;
}

export const getPacmanNextPosition = (options: Options) => {
  const { direction, row, col, x, y, incrementValue } = options;
  const nextPosition: PacmanNextPosition = {
    rowIndex: row,
    colIndex: col,
    x,
    y,
    canMove: true,
    hasDot: false,
    stepInterval: INTERVAL_MOVE,
  };

  switch (direction) {
    case Direction.Down:
      const squareBelow = paths[row + 1][col];
      if (squareBelow === GridValues.WALL) {
        nextPosition.y = row * BRICK_MAGNITUDE;
        nextPosition.canMove = false;
      } else {
        // TODO: Add food info
        /*
                if (gJabbaArray[row+1][col]==1){
                    gCurrentMoveInterval = INTERVAL_MOVE;
                    // Tell the main caller that pacman is about to eat a dot so that the count can be updated to win the game
                    movementObj.hasDot = true;
                } */
        nextPosition.rowIndex = row + 1;
        nextPosition.colIndex = col;
        nextPosition.y = y + incrementValue;
      }
      break;

    case Direction.Up:
      const squareAbove = paths[row - 1][col];

      if (squareAbove === GridValues.WALL) {
        // There's a wall in this direction
        nextPosition.y = row * BRICK_MAGNITUDE;
        nextPosition.canMove = false;
      } else {
        nextPosition.rowIndex = row - 1;
        nextPosition.colIndex = col;
        nextPosition.y = y - incrementValue;
      }
      break;

    case Direction.Left:
      const squareToTheLeft = paths[row][col - 1];

      if (squareToTheLeft === GridValues.WALL) {
        // There's a wall in this direction
        nextPosition.x = col * BRICK_MAGNITUDE;
        nextPosition.canMove = false;
      } else {
        nextPosition.rowIndex = row;
        nextPosition.colIndex = col - 1;
        nextPosition.x = x - incrementValue;
      }
      break;

    case Direction.Right:
      const squareToTheRight = paths[row][col + 1];

      if (squareToTheRight === GridValues.WALL) {
        // There's a wall in this direction
        nextPosition.x = col * BRICK_MAGNITUDE;
        nextPosition.canMove = false;
      } else {
        nextPosition.rowIndex = row;
        nextPosition.colIndex = col + 1;
        nextPosition.x = x + incrementValue;
      }
      break;

    default:
      // do nothing
      break;
  }

  return nextPosition;
};
