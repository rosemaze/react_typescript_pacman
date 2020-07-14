import { observable, action, computed } from "mobx";
import { Ghost } from "./models/Ghost.model";
import { BaseStore } from "../Base/Base.store";
import { getRandomDirection } from "./helpers/getRandomDirection";
import { DIRECTIONS_GRID } from "../Game/Game.constants";
import { Direction } from "../Game/Game.types";
import { GHOST_STEP_INCREMENT } from "./Ghosts.constants";

export class GhostsStore {
  @observable
  ghostRed: Ghost;

  @observable
  ghostPink: Ghost;

  @observable
  baseStore: BaseStore;

  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
    this.ghostRed = new Ghost();
    this.ghostPink = new Ghost();
  }

  @action
  moveGhost = (ghost: Ghost) => {
    if (ghost.isGoingThroughEndOfLeftTunnel) {
      ghost.column = 27;
      ghost.x = ghost.column * GHOST_STEP_INCREMENT;
      return;
    }

    if (ghost.isGoingThroughEndOfRightTunnel) {
      ghost.column = 0;
      ghost.x = ghost.column * GHOST_STEP_INCREMENT;
      return;
    }

    const direction = getRandomDirection({
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
  setDirection = (ghost: Ghost, direction: Direction) => {
    ghost.direction = direction;
  };
}
