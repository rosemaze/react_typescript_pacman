import { observable, action } from "mobx";
import { useStores } from "../../hooks/useStores";
import { Directions } from "./Game.types";
import { BaseStore } from "../Base/Base.store";

export class GameStore {
  @observable
  isRunning: boolean = false;

  @action
  setIsRunning = (gameIsRunning: boolean) => {
    this.isRunning = gameIsRunning;

    console.log("setting isRunning", this.isRunning);
  };

  baseStore: BaseStore;

  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action
  updateGameArea = () => {
    this.baseStore.pacmanStore.movePacman();
  };
}
