import { Direction, Sprite } from "../../App.types";

export interface Pacman extends Sprite {
  previousDirection: Direction;
}
