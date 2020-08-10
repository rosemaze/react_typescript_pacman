import { observable, action, ObservableMap } from "mobx";
import { createTransformer } from "mobx-utils";
import { BaseStore } from "../Base/Base.store";
import { getGridId } from "./helpers/getGridId";
import { getHasPacmanEatenAMagicDot } from "./helpers/getHasPacmanEatenAMagicDot";
import { getIsGhostAndPacmanInContact } from "./helpers/getIsGhostAndPacmanInContact";
import { GhostStore } from "../Ghosts/models/Ghost.model";
import {
  PACMAN_STEP_INCREMENT,
  PACMAN_INITIAL_DATA,
} from "../Pacman/Pacman.constants";
import { GhostMode } from "../Ghosts/models/Ghost.types";
import {
  GAME_UPDATE_RATE,
  DURATION_GHOST_EVASIVE,
  DURATION_GHOST_BLINKING,
} from "./Game.constants";
import { GHOST_INITIAL_DATA } from "../Ghosts/models/Ghost.constants";
import { GRID } from "../../elements/Grid/Grid.constants";
import { GameTimeouts } from "./Game.types";

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
  magicDots: ObservableMap<string, boolean> = new ObservableMap();

  @observable
  eatenDotIds = observable.array<string>();

  @observable
  releasedGhosts = observable.array<GhostStore>();

  @observable
  gameTimeout?: number; // Use to set game to next round, set timer for ghosts in evasive mode

  baseStore: BaseStore;

  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;

    this.magicDots.set("1_3", true); // col_row
  }

  @action
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
  setGameTimeout = (timeoutReason: GameTimeouts) => {
    switch (timeoutReason) {
      case GameTimeouts.StartNextLife:
        // Wait two seconds, then set running flag to false, this will allow the key handler to start the next life
        this.gameTimeout = setTimeout(() => this.setIsRunning(false), 2000);
        break;

      case GameTimeouts.EnterBlinkingMode:
        // Set ghosts to blinking once evasive duration is up, set timer for ghosts to exit evasive mode altogether
        this.gameTimeout = setTimeout(() => {
          this.setAllReleasedGhostsMode(GhostMode.Blinking);
          this.setGameTimeout(GameTimeouts.ExitEvasiveMode);
        }, DURATION_GHOST_EVASIVE);
        break;

      case GameTimeouts.ExitEvasiveMode:
        // Set ghosts to normal once blinking duration is up
        this.gameTimeout = setTimeout(
          () => this.setAllReleasedGhostsMode(GhostMode.Normal),
          DURATION_GHOST_BLINKING
        );
        break;

      default:
        break;
    }
  };

  @action
  setAllReleasedGhostsMode(mode: GhostMode) {
    this.releasedGhosts.forEach((ghost) => ghost.setMode(mode));
  }

  @action
  setUpdateGameInterval = () => {
    this.updateGameInterval = setInterval(this.updateGame, GAME_UPDATE_RATE);
  };

  @action
  updateGame = () => {
    const {
      pacmanStore: {
        movePacman,
        x: pacmanX,
        y: pacmanY,
        row: pacmanRow,
        column: pacmanCol,
      },
      ghostsStore: { moveGhost },
    } = this.baseStore;

    // Pacman
    movePacman();

    const hasPacmanEatenAMagicDot = getHasPacmanEatenAMagicDot({
      pacmanRow,
      pacmanCol,
      grid: GRID,
    });
    if (this.magicDots.get(pacmanCol + "_" + pacmanRow)) {
      console.log("we are here setting dot to", pacmanCol + "_" + pacmanRow);
      this.magicDots.set(pacmanCol + "_" + pacmanRow, false);
    }

    if (hasPacmanEatenAMagicDot) {
      this.setAllReleasedGhostsMode(GhostMode.Evasive);

      // Set the timer for magic dot effect to wear off
      this.setGameTimeout(GameTimeouts.EnterBlinkingMode);
    }

    // For each released ghost
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
          case GhostMode.Spawning:
            // pacman should just pass through ghost
            // do nothing
            break;
          case GhostMode.Normal:
            // ghost should eat pacman
            this.doGhostEatPacmanSequence();

            break;
          default:
            throw Error(
              `Unhandled ghost mode.${activeGhost.mode} todo: implement exhaustive check`
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
  getMagicDot = createTransformer((coord: string) => {
    const magicDot = this.magicDots.get(coord);

    return magicDot;
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

      this.setGameTimeout(GameTimeouts.StartNextLife);

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
