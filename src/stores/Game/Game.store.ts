import { observable, action } from "mobx";
import { createTransformer } from "mobx-utils";
import { BaseStore } from "../Base/Base.store";
import { PacmanStore } from "../Pacman/Pacman.store";
import { GRID } from "../../elements/Grid/Grid.constants";
import { getGridId } from "./helpers/getGridId";

export class GameStore {
  @observable
  isRunning: boolean = false;

  @observable
  dots = observable.map<string, boolean>();

  @observable
  @action
  setIsRunning = (gameIsRunning: boolean) => {
    this.isRunning = gameIsRunning;
  };

  @observable
  eatenDotIds = observable.array<string>();

  baseStore: BaseStore;

  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action
  updateGameArea = () => {
    const {
      pacmanStore: { movePacman },
      ghostsStore: { moveGhost, ghostRed },
    } = this.baseStore;

    movePacman();

    moveGhost(ghostRed);

    // THIS IS SLOW CUZ IT RENDERS THE ENTIRE PATH MAP
    const { row, column } = this.baseStore.pacmanStore;

    this.eatenDotIds.push(getGridId({ colIndex: column, rowIndex: row }));
  };

  getDot = createTransformer((coord: string) => {
    const dot = this.dots.get(coord);

    return !!dot;
  });

  setDotAsEaten = (coord: string) => {
    this.dots.set(coord, false);
  };
}
