import { observable, computed, action } from "mobx";
import { Direction } from "../../../App.types";
import { GhostColor, GhostMode, Ghost } from "./Ghost.types";
import { validateModeSwitch } from "../helpers/validateModeSwitch";

export class GhostStore {
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

  @observable
  mode: GhostMode = GhostMode.Normal;

  color: GhostColor;

  @observable
  releaseTimeout?: number = undefined;

  constructor(color: GhostColor, initialData: Ghost) {
    this.color = color;

    this.setInitialData(initialData);
  }

  @action
  setInitialData = (initialData: Ghost) => {
    this.x = initialData.x;
    this.y = initialData.y;
    this.row = initialData.row;
    this.column = initialData.column;
    this.direction = initialData.direction;
    this.mode = initialData.mode;

    this.releaseTimeout = undefined;
  };

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

  @action
  setMode = (nextMode: GhostMode) => {
    if (!validateModeSwitch({ currentMode: this.mode, nextMode })) {
      return;
    }
    this.mode = nextMode;
  };
}
