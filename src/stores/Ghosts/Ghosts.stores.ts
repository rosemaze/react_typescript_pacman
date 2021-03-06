import { observable, action } from "mobx";
import { GhostStore } from "./models/Ghost.model";
import { BaseStore } from "../Base/Base.store";
import { getNextDirection } from "./helpers/getNextDirection";
import { DIRECTIONS_GRID } from "../Game/Game.constants";
import { Direction } from "../../App.types";
import {
  GHOST_STEP_INCREMENT,
  GHOST_INITIAL_DATA,
} from "./models/Ghost.constants";
import { GhostColor } from "./models/Ghost.types";

export class GhostsStore {
  @observable
  ghostRed: GhostStore;

  @observable
  ghostPink: GhostStore;

  @observable
  ghostBlue: GhostStore;

  @observable
  ghostOrange: GhostStore;

  @observable
  baseStore: BaseStore;

  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
    this.ghostRed = new GhostStore(
      this.baseStore,
      GhostColor.Red,
      GHOST_INITIAL_DATA
    );
    this.ghostPink = new GhostStore(
      this.baseStore,
      GhostColor.Pink,
      GHOST_INITIAL_DATA
    );
    this.ghostBlue = new GhostStore(
      this.baseStore,
      GhostColor.Blue,
      GHOST_INITIAL_DATA
    );
    this.ghostOrange = new GhostStore(
      this.baseStore,
      GhostColor.Orange,
      GHOST_INITIAL_DATA
    );
  }

  @action
  moveGhost = (ghost: GhostStore) => {
    if (ghost.isGoingThroughEndOfLeftTunnel) {
      ghost.column = 27;
      ghost.x = 27 * GHOST_STEP_INCREMENT;
      return;
    }

    if (ghost.isGoingThroughEndOfRightTunnel) {
      ghost.column = 0;
      ghost.x = 0 * GHOST_STEP_INCREMENT;
      return;
    }

    const nextDirection = getNextDirection(ghost, DIRECTIONS_GRID);
    this.setDirection(ghost, nextDirection.direction);

    switch (nextDirection.direction) {
      case Direction.Left:
        ghost.column = ghost.column - 1;
        ghost.x = ghost.x - GHOST_STEP_INCREMENT;
        break;
      case Direction.Right:
        ghost.column = ghost.column + 1;
        ghost.x = ghost.x + GHOST_STEP_INCREMENT;
        break;
      case Direction.Up:
        ghost.row = ghost.row - 1;
        ghost.y = ghost.y - GHOST_STEP_INCREMENT;
        break;
      case Direction.Down:
        ghost.row = ghost.row + 1;
        ghost.y = ghost.y + GHOST_STEP_INCREMENT;
        break;
    }

    ghost.setMode(nextDirection.mode);
  };

  @action
  setDirection = (ghost: GhostStore, direction: Direction) => {
    ghost.direction = direction;
  };
}
