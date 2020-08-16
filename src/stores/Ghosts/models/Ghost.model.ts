import { observable, computed, action } from "mobx";
import { Direction } from "../../../App.types";
import { GhostColor, GhostMode, Ghost } from "./Ghost.types";
import { validateModeSwitch } from "../helpers/validateModeSwitch";
import {
  DURATION_SPRITE_INVISIBLE,
  DURATION_GHOST_EVASIVE,
  DURATION_GHOST_BLINKING,
} from "../../Game/Game.constants";
import { BaseStore } from "../../Base/Base.store";

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
  isVisible: boolean = true;

  @observable
  releaseTimeout?: number = undefined;

  @observable
  invisibleTimeout?: number = undefined;

  @observable
  evasiveTimeout?: number = undefined;

  baseStore: BaseStore; // Does this need to be observable

  constructor(baseStore: BaseStore, color: GhostColor, initialData: Ghost) {
    this.color = color;
    this.baseStore = baseStore;
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
    this.invisibleTimeout = undefined;
    this.evasiveTimeout = undefined;
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

    if (nextMode === GhostMode.Homing) {
      // Hide ghost and pacman if it was eaten
      this.isVisible = false;
      this.baseStore.pacmanStore.setIsVisibleTimeout();

      clearTimeout(this.invisibleTimeout);

      // Set ghost and pacman back to visible after 2.5 secs
      this.invisibleTimeout = setTimeout(() => {
        this.isVisible = true;
      }, DURATION_SPRITE_INVISIBLE);
    } else if (nextMode === GhostMode.Evasive) {
      // Prolong evasive period if a magic pill was eaten
      clearTimeout(this.evasiveTimeout);

      this.evasiveTimeout = setTimeout(() => {
        this.mode = GhostMode.Blinking;
      }, DURATION_GHOST_EVASIVE);
    } else if (nextMode === GhostMode.Blinking) {
      // Set ghost eventually back to normal if it is already blinking
      clearTimeout(this.evasiveTimeout);

      this.evasiveTimeout = setTimeout(() => {
        this.mode = GhostMode.Normal;
      }, DURATION_GHOST_BLINKING);
    }

    this.mode = nextMode;
  };
}
