import { Sprite } from "../../../App.types";

export interface Ghost extends Sprite {
  mode: GhostMode;
}

export enum GhostColor {
  Red = "red",
  Pink = "pink",
  Blue = "blue",
  Orange = "orange",
}

export enum GhostMode {
  Normal = "normal",
  Evasive = "evasive",
  Blinking = "blinking",
  Homing = "homing",
}
