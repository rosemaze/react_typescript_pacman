import { PacmanStore } from "../Pacman/Pacman.store";
import { GameStore } from "../Game/Game.store";
import { GhostsStore } from "../Ghosts/Ghosts.stores";
import { PACMAN_INITIAL_DATA } from "../Pacman/Pacman.constants";

export class BaseStore {
  gameStore: GameStore;

  pacmanStore: PacmanStore;

  ghostsStore: GhostsStore;

  constructor() {
    this.gameStore = new GameStore(this);
    this.pacmanStore = new PacmanStore(this, PACMAN_INITIAL_DATA);
    this.ghostsStore = new GhostsStore(this);
  }
}
