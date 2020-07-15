import { observable, computed } from "mobx";
import { Direction } from "../../Game/Game.types";
import { GhostColor } from "../Ghosts.types";

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

  color: GhostColor;

  constructor(ghostColor: GhostColor) {
    this.color = ghostColor;
  }

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
