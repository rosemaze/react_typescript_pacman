import { observable, action } from "mobx";
import { createTransformer } from "mobx-utils";
import { BaseStore } from "../Base/Base.store";
import { getGridId } from "./helpers/getGridId";
import { getIsGhostAndPacmanInContact } from "./helpers/getIsGhostAndPacmanInContact";
import { GhostStore } from "../Ghosts/models/Ghost.model";
import {
  PACMAN_STEP_INCREMENT,
  PACMAN_INITIAL_DATA,
} from "../Pacman/Pacman.constants";
import { GhostMode } from "../Ghosts/models/Ghost.types";
import { GAME_UPDATE_RATE } from "./Game.constants";
import {
  GHOST_STEP_INCREMENT,
  GHOST_INITIAL_DATA,
} from "../Ghosts/models/Ghost.constants";

export class GameStore {
  @observable
  isRunning: boolean = false;

  @observable
  updateGameInterval?: number;

  @observable
  userLivesRemaining: number = 2;

  @observable
  dots = observable.map<string, boolean>();

  @observable
  eatenDotIds = observable.array<string>();

  @observable
  releasedGhosts = observable.array<GhostStore>();

  @observable
  gameTimeout?: number; // Use to set game to next round

  baseStore: BaseStore;

  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action
  startGame = () => {
    if (this.isRunning) {
      return;
    }

    this.setIsRunning(true);

    this.releaseGhostsStaggered();

    this.setUpdateGameInterval();
  };

  @action
  releaseGhostsStaggered = () => {
    const {
      ghostsStore: { ghostRed, ghostPink, ghostBlue, ghostOrange },
    } = this.baseStore;

    this.releasedGhosts.push(ghostRed);

    ghostPink.releaseTimeout = setTimeout(() => {
      this.releasedGhosts.push(ghostPink);
    }, 6000);

    ghostBlue.releaseTimeout = setTimeout(() => {
      this.releasedGhosts.push(ghostBlue);
    }, 12000);

    ghostOrange.releaseTimeout = setTimeout(() => {
      this.releasedGhosts.push(ghostOrange);
    }, 18000);
  };

  @action
  setUpdateGameInterval = () => {
    this.updateGameInterval = setInterval(this.updateGame, GAME_UPDATE_RATE);
  };

  @action
  updateGame = () => {
    const {
      pacmanStore: { movePacman, x: pacmanX, y: pacmanY },
      ghostsStore: { moveGhost },
    } = this.baseStore;

    movePacman();

    this.releasedGhosts.forEach((activeGhost) => {
      moveGhost(activeGhost);

      const isGhostAndPacmanInContact = getIsGhostAndPacmanInContact({
        pacmanX,
        pacmanY,
        ghostX: activeGhost.x,
        ghostY: activeGhost.y,
        contactThreshold: PACMAN_STEP_INCREMENT,
      });

      if (isGhostAndPacmanInContact) {
        switch (activeGhost.mode) {
          case GhostMode.Blinking:
          case GhostMode.Evasive:
            // pacman should eat ghost;
            this.doPacmanEatGhostSequence(activeGhost);

            break;
          case GhostMode.Homing:
            // pacman should just pass through ghost
            // do nothing
            break;
          case GhostMode.Normal:
            // ghost should eat pacman
            this.doGhostEatPacmanSequence();
            break;
          default:
            throw Error(
              "Unhandled ghost mode. todo: implement exhaustive check"
            );
        }
      }
    });

    // THIS IS SLOW CUZ IT RENDERS THE ENTIRE PATH MAP
    const { row, column } = this.baseStore.pacmanStore;

    this.eatenDotIds.push(getGridId({ colIndex: column, rowIndex: row }));
  };

  @action
  doPacmanEatGhostSequence = (ghost: GhostStore) => {
    // Temporarily pause the game
    clearInterval(this.updateGameInterval);

    // Update score
    // gEatenGhostsCount++;
    // updateScore(POINTS_FOR_GHOST[gEatenGhostsCount]);

    // Hide pacman and ghost when eaten
    // setPacmanDivClassName("invisible");
    // setEatenSpriteScore(curGhostObj.id, POINTS_FOR_GHOST[gEatenGhostsCount]);

    // Change ghost to homing mode
    ghost.setMode(GhostMode.Homing);

    //// Set pacman to visible
    //setPacmanDivClassName(
    //  KEY_NUMBER_TO_WORD[sprites.pacman.currentDirection]
    //);

    // Resume game after 1 second pause
    setTimeout(this.setUpdateGameInterval, 1000);
  };

  @action
  getDot = createTransformer((coord: string) => {
    const dot = this.dots.get(coord);

    return !!dot;
  });

  @action
  setDotAsEaten = (coord: string) => {
    this.dots.set(coord, false);
  };

  @action
  setIsRunning = (gameIsRunning: boolean) => {
    this.isRunning = gameIsRunning;
  };

  @action
  doGhostEatPacmanSequence = () => {
    // Stop updating the game
    clearInterval(this.updateGameInterval);

    // If last three ghosts haven't come out yet then kill release timeout
    this.clearAllReleaseGhostTimeouts();

    // showDyingPacmanGif;

    this.decrementUserLivesRemaining();

    // Set game to next life
    if (this.userLivesRemaining > 0) {
      this.setGameToNextLife();

      return;
    }

    // Game over
    // setTimeout(setGameOverText, 4500);
  };

  @action
  setGameToNextLife = () => {
    // Player just died, set everything back to original position
    if (this.userLivesRemaining > 0) {
      this.releasedGhosts.clear();

      this.resetSprites();

      // Wait two seconds, then set running flag to false, this will allow the key handler to start the next life
      this.gameTimeout = setTimeout(() => this.setIsRunning(false), 2000);

      // setReadyText();
    }
  };

  @action
  decrementUserLivesRemaining = () => {
    this.userLivesRemaining = this.userLivesRemaining - 1;
  };

  @action
  clearAllReleaseGhostTimeouts = () => {
    const {
      ghostsStore: { ghostPink, ghostBlue, ghostOrange },
    } = this.baseStore;

    clearTimeout(ghostPink.releaseTimeout);
    clearTimeout(ghostBlue.releaseTimeout);
    clearTimeout(ghostOrange.releaseTimeout);
  };

  @action
  resetSprites = () => {
    const {
      pacmanStore: { setInitialData },
      ghostsStore: { ghostRed, ghostPink, ghostBlue, ghostOrange },
    } = this.baseStore;

    setInitialData(PACMAN_INITIAL_DATA);
    ghostRed.setInitialData(GHOST_INITIAL_DATA);
    ghostPink.setInitialData(GHOST_INITIAL_DATA);
    ghostBlue.setInitialData(GHOST_INITIAL_DATA);
    ghostOrange.setInitialData(GHOST_INITIAL_DATA);
  };
}
