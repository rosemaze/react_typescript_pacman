import { observable, action } from "mobx";
import { Directions } from "../Game/Game.types";
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
  direction: Directions = Directions.Left;

  baseStore: BaseStore;

  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action
  movePacman = () => {
    const {
      x,
      y,
      rowIndex,
      colIndex,
      canMove,
      hasDot,
      stepInterval,
    } = getPacmanNextPosition({
      row: this.row,
      col: this.column,
      x: this.x,
      y: this.y,
      direction: this.direction,
      incrementValue: INCREMENT_MOVE,
    });

    this.x = x;
    this.y = y;
    this.row = rowIndex;
    this.column = colIndex;
  };

  @action
  setDirection = (direction: Directions) => {
    this.direction = direction;
  };
}
