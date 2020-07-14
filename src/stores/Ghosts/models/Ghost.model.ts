import { observable, computed } from "mobx";
import { Direction } from "../../Game/Game.types";

export class Ghost {
  @observable
  x: number = 195;

  @observable
  y: number = 165;

  @observable
  column: number = 13;

  @observable
  row: number = 11;

  @observable
  direction: Direction = Direction.Up;

  @computed
  get isGoingThroughEndOfLeftTunnel() {
    return (
      this.row === 14 && this.column === 0 && this.direction === Direction.Left
    );
  }

  @computed
  get isGoingThroughEndOfRightTunnel() {
    return (
      this.row === 14 &&
      this.column === 27 &&
      this.direction === Direction.Right
    );
  }
}
