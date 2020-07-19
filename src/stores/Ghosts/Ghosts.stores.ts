import { observable, action } from "mobx";
import { GhostStore } from "./models/Ghost.model";
import { BaseStore } from "../Base/Base.store";
import { getRandomPossibleDirection } from "./helpers/getRandomPossibleDirection";
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
    this.ghostRed = new GhostStore(GhostColor.Red, GHOST_INITIAL_DATA);
    this.ghostPink = new GhostStore(GhostColor.Pink, GHOST_INITIAL_DATA);
    this.ghostBlue = new GhostStore(GhostColor.Blue, GHOST_INITIAL_DATA);
    this.ghostOrange = new GhostStore(GhostColor.Orange, GHOST_INITIAL_DATA);
  }

  @action
  moveGhost = (ghost: GhostStore) => {
    if (ghost.isGoingThroughEndOfLeftTunnel) {
      ghost.column = 27;
      ghost.x = ghost.column * GHOST_STEP_INCREMENT;
      console.log("going thru left tunnel");
      return;
    }

    if (ghost.isGoingThroughEndOfRightTunnel) {
      ghost.column = 0;
      ghost.x = ghost.column * GHOST_STEP_INCREMENT;
      console.log("going thru right tunnel");
      return;
    }

    const direction = getRandomPossibleDirection({
      col: ghost.column,
      row: ghost.row,
      currentDirection: ghost.direction,
      directionsGrid: DIRECTIONS_GRID,
    });

    this.setDirection(ghost, direction);

    switch (direction) {
      case Direction.Left:
        ghost.column = ghost.column - 1;
        ghost.x = ghost.x + GHOST_STEP_INCREMENT;
        break;
      case Direction.Right:
        ghost.column = ghost.column + 1;
        ghost.x = ghost.x - GHOST_STEP_INCREMENT;
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
  };

  @action
  setDirection = (ghost: GhostStore, direction: Direction) => {
    ghost.direction = direction;
  };
}
