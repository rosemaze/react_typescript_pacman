import { observable, action } from "mobx";
import { Direction } from "../Game/Game.types";
import { INCREMENT_MOVE } from "./Pacman.constants";
import { getPacmanNextPosition } from "./helpers/getPacmanNextPosition";
import { BaseStore } from "../Base/Base.store";

export class PacmanStore {
  @observable
  x: number = 210;

  @observable
  y: number = 345;

  @observable
  row: number = 23;

  @observable
  column: number = 14;

  @observable
  direction: Direction = Direction.Left;

  @observable
  previousDirection: Direction = Direction.Left;

  @observable
  baseStore: BaseStore;

  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action
  movePacman = () => {
    let nextPosition = getPacmanNextPosition({
      row: this.row,
      col: this.column,
      x: this.x,
      y: this.y,
      direction: this.direction,
      incrementValue: INCREMENT_MOVE,
    });

    // If user moves against a wall, make pacman
    // continue in previous (currently moving) direction
    if (!nextPosition.canMove) {
      this.setDirection(this.previousDirection);

      nextPosition = getPacmanNextPosition({
        row: this.row,
        col: this.column,
        x: this.x,
        y: this.y,
        direction: this.direction,
        incrementValue: INCREMENT_MOVE,
      });
    }

    const { x, y, rowIndex, colIndex } = nextPosition;

    // Warning: this might be updating asynchronously ?
    this.setPreviousDirection(this.direction);

    this.x = x;
    this.y = y;
    this.row = rowIndex;
    this.column = colIndex;
  };

  @action
  setDirection = (direction: Direction) => {
    this.direction = direction;
  };

  @action
  setPreviousDirection = (direction: Direction) => {
    this.previousDirection = direction;
  };
}
