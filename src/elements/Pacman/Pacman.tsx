import React from "react";
import { PacmanWrapper } from "./styles/PacmanWrapper.style";
import { reactive } from "../../helpers/reactive";
import { useStores } from "../../hooks/useStores";
import animationLeft from "../../assets/pacman/pacman-animation1-left.gif";
import animationRight from "../../assets/pacman/pacman-animation1-right.gif";
import animationDown from "../../assets/pacman/pacman-animation1-down.gif";
import animationUp from "../../assets/pacman/pacman-animation1-up.gif";
import { Direction } from "../../App.types";

export const PacmanComponent: React.FC = () => {
  const {
    baseStore: { pacmanStore },
  } = useStores();
  const { x, y, direction } = pacmanStore;

  const animation = React.useMemo(() => {
    switch (direction) {
      case Direction.Left:
        return animationLeft;
      case Direction.Right:
        return animationRight;
      case Direction.Down:
        return animationDown;
      case Direction.Up:
        return animationUp;
    }
  }, [direction]);

  return (
    <PacmanWrapper x={x} y={y}>
      <img src={animation} width={20} height={20} />
    </PacmanWrapper>
  );
};

export const Pacman = reactive(PacmanComponent);
