import React from "react";
import { PacmanWrapper } from "./styles/PacmanWrapper.style";
import { reactive } from "../../helpers/reactive";
import { useStores } from "../../hooks/useStores";
import mousetrap from "mousetrap";
import { INTERVAL_MOVE } from "./Pacman.constants";

export const PacmanComponent: React.FC = () => {
  const { pacmanStore, gameStore } = useStores();
  const { x, y, incrementX } = pacmanStore;
  const { isRunning, setIsRunning } = gameStore;
  let interval = null;

  const handleKeyPress = React.useCallback(
    (e: ExtendedKeyboardEvent) => {
      if (isRunning) {
        console.log("going to return");
        return;
      }

      setIsRunning(true);
      console.log("gonna increment", x);
      interval = setInterval(() => incrementX(10), INTERVAL_MOVE);
    },
    [incrementX, x, isRunning, setIsRunning, interval]
  );

  mousetrap.bind("down", handleKeyPress);
  mousetrap.bind("left", handleKeyPress);

  return <PacmanWrapper x={x} y={y} />;
};

export const Pacman = reactive(PacmanComponent);
