import React from "react";
import { GhostWrapper } from "./styles/GhostWrapper.style";
import { Direction } from "../../App.types";
import { reactive } from "../../helpers/reactive";
import { GhostStore } from "../../stores/Ghosts/models/Ghost.model";
import { GhostColor, GhostMode } from "../../stores/Ghosts/models/Ghost.types";
import ghostRedLeft from "../../assets/ghosts/ghost-left.gif";
import ghostRedRight from "../../assets/ghosts/ghost-right.gif";
import ghostRedDown from "../../assets/ghosts/ghost-down.gif";
import ghostRedUp from "../../assets/ghosts/ghost-up.gif";
import ghostBlueLeft from "../../assets/ghosts/ghost-aqua-left.gif";
import ghostBlueRight from "../../assets/ghosts/ghost-aqua-right.gif";
import ghostBlueDown from "../../assets/ghosts/ghost-aqua-down.gif";
import ghostBlueUp from "../../assets/ghosts/ghost-aqua-up.gif";
import ghostPinkLeft from "../../assets/ghosts/ghost-pink-left.gif";
import ghostPinkRight from "../../assets/ghosts/ghost-pink-right.gif";
import ghostPinkDown from "../../assets/ghosts/ghost-pink-down.gif";
import ghostPinkUp from "../../assets/ghosts/ghost-pink-up.gif";
import ghostOrangeLeft from "../../assets/ghosts/ghost-orange-left.gif";
import ghostOrangeRight from "../../assets/ghosts/ghost-orange-right.gif";
import ghostOrangeDown from "../../assets/ghosts/ghost-orange-down.gif";
import ghostOrangeUp from "../../assets/ghosts/ghost-orange-up.gif";
import ghostEvasive from "../../assets/ghosts/ghost-scared.gif";
import ghostBlinking from "../../assets/ghosts/ghost-scared-changing.gif";
import ghostHoming from "../../assets/ghosts/ghost-homing.png";

interface Props {
  ghost: GhostStore;
}

export const GhostComponent: React.FC<Props> = (props) => {
  const { ghost } = props;

  const animation = React.useMemo(() => {
    if (ghost.mode === GhostMode.Evasive) {
      return ghostEvasive;
    }

    if (ghost.mode === GhostMode.Blinking) {
      return ghostBlinking;
    }

    if (ghost.mode === GhostMode.Homing) {
      return ghostHoming;
    }

    switch (ghost.direction) {
      case Direction.Left:
        switch (ghost.color) {
          case GhostColor.Red:
            return ghostRedLeft;
          case GhostColor.Pink:
            return ghostPinkLeft;
          case GhostColor.Blue:
            return ghostBlueLeft;
          case GhostColor.Orange:
            return ghostOrangeLeft;
        }
      case Direction.Right:
        switch (ghost.color) {
          case GhostColor.Red:
            return ghostRedRight;
          case GhostColor.Pink:
            return ghostPinkRight;
          case GhostColor.Blue:
            return ghostBlueRight;
          case GhostColor.Orange:
            return ghostOrangeRight;
        }
      case Direction.Down:
        switch (ghost.color) {
          case GhostColor.Red:
            return ghostRedDown;
          case GhostColor.Pink:
            return ghostPinkDown;
          case GhostColor.Blue:
            return ghostBlueDown;
          case GhostColor.Orange:
            return ghostOrangeDown;
        }
      case Direction.Up:
        switch (ghost.color) {
          case GhostColor.Red:
            return ghostRedUp;
          case GhostColor.Pink:
            return ghostPinkUp;
          case GhostColor.Blue:
            return ghostBlueUp;
          case GhostColor.Orange:
            return ghostOrangeUp;
        }
    }
  }, [ghost.direction]);

  return (
    <GhostWrapper x={ghost.x} y={ghost.y}>
      <img src={animation} width={20} height={20} />
    </GhostWrapper>
  );
};

export const Ghost = reactive(GhostComponent);
