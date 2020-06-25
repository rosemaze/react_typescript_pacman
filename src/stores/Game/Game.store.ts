import { observable, action } from "mobx";

export class GameStore {
  @observable
  isRunning: boolean = false;

  @action
  setIsRunning = (gameIsRunning: boolean) => {
    this.isRunning = gameIsRunning;

    console.log("setting isRunning", this.isRunning);
  };

  @action
  updateGameArea = () => {
    movePacman();
  };
}
