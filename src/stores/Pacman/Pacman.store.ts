import { observable, action } from "mobx";

export class PacmanStore {
  @observable
  x: number = 210;

  @observable
  y: number = 345;

  @action
  incrementX = (inc: number) => {
    this.x = this.x + inc;
  };

  @action
  incrementY = (inc: number) => {
    this.y = this.y + inc;
  };

  @action
  movePacman = () => {
    const { incX, incY } = getNextPosition;
    this.y = this.y + incY;
    this.x = this.x + incX;
  };
}
