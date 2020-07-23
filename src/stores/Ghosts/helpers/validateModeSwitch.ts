import { GhostMode } from "../models/Ghost.types";
import { Ghost } from "../../../elements/Ghost/Ghost";

export const validateModeSwitch = (options: {
  currentMode: GhostMode;
  nextMode: GhostMode;
}) => {
  const { currentMode, nextMode } = options;
  switch (nextMode) {
    case GhostMode.Blinking:
      switch (currentMode) {
        case GhostMode.Blinking:
          // no need to do anything
          return false;
        case GhostMode.Normal:
          // NOT ALLOWED
          return false;
        case GhostMode.Homing:
          // NOT ALLOWED
          return false;
        case GhostMode.Evasive:
          // Evasive ghost will turn to blinking as magic dot effect starts to wear off
          return true;
        case GhostMode.Spawning:
          // NOT ALLOWED
          return false;
      }
      break;

    case GhostMode.Evasive:
      switch (currentMode) {
        case GhostMode.Blinking:
          // NOT ALLOWED
          return false;
        case GhostMode.Normal:
          // Normal ghost will turn evasive if pacman eats a magic dot
          return true;
        case GhostMode.Homing:
          // NOT ALLOWED
          return false;
        case GhostMode.Evasive:
          // no need to do anything
          return false;
        case GhostMode.Spawning:
          // NOT ALLOWED
          return false;
      }

    case GhostMode.Homing:
      switch (currentMode) {
        case GhostMode.Blinking:
          // Blinking ghost will turn to homing if eaten by pacman
          return true;
        case GhostMode.Normal:
          // NOT ALLOWED
          return false;
        case GhostMode.Homing:
          // no need to do anything
          return false;
        case GhostMode.Evasive:
          // Evasive ghost will turn to homing if eaten by pacman
          return true;
        case GhostMode.Spawning:
          // NOT ALLOWED
          return false;
      }

    case GhostMode.Normal:
      switch (currentMode) {
        case GhostMode.Blinking:
          // Blinking ghost will eventually switch back to normal when magic dot effect is over
          return true;
        case GhostMode.Normal:
          // do nothing
          return false;
        case GhostMode.Homing:
          // NOT ALLOWED
          return false;
        case GhostMode.Evasive:
          // NOT ALLOWED
          return false;
        case GhostMode.Spawning:
          // Spawning ghost will turn to normal when it is time to leave the home
          return true;
      }

    case GhostMode.Spawning:
      switch (currentMode) {
        case GhostMode.Blinking:
          // NOT ALLOWED
          return false;
        case GhostMode.Normal:
          // NOT ALLOWED
          return false;
        case GhostMode.Homing:
          // Homing ghost will turn to spawning when it reaches its home
          return true;
        case GhostMode.Evasive:
          // NOT ALLOWED
          return false;
        case GhostMode.Spawning:
          // do nothing
          return false;
      }

    default:
      return false;
  }
};
