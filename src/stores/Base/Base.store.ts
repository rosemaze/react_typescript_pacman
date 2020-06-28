import { PacmanStore } from "../Pacman/Pacman.store";
import { GameStore } from "../Game/Game.store";

export class BaseStore {
  pacmanStore: PacmanStore;

  gameStore: GameStore;

  constructor() {
    this.pacmanStore = new PacmanStore(this);
    this.gameStore = new GameStore(this);
  }
}
