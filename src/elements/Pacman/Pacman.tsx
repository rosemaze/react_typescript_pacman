import React from "react";
import { PacmanWrapper } from "./styles/PacmanWrapper.style";
import { reactive } from "../../helpers/reactive";
import { useStores } from "../../hooks/useStores";
import mousetrap from "mousetrap";
import { INTERVAL_MOVE } from "../../stores/Game/Game.constants";
import { mapKeyToDirection } from "./helpers/mapKeyToDirection";

export const PacmanComponent: React.FC = () => {
  const {
    baseStore: { pacmanStore, gameStore },
  } = useStores();
  const { x, y, setDirection } = pacmanStore;
  const { isRunning, setIsRunning, updateGameArea } = gameStore;
  let interval = null;

  const handleKeyPress = React.useCallback(
    (e: ExtendedKeyboardEvent) => {
      const direction = mapKeyToDirection(e.key);
      if (!direction) {
        return;
      }

      setDirection(direction);

      if (isRunning) {
        return;
      }

      setIsRunning(true);

      interval = setInterval(updateGameArea, INTERVAL_MOVE);
    },
    [x, isRunning, setIsRunning, interval, updateGameArea]
  );

  mousetrap.bind("up", handleKeyPress);
  mousetrap.bind("down", handleKeyPress);
  mousetrap.bind("left", handleKeyPress);
  mousetrap.bind("right", handleKeyPress);

  return <PacmanWrapper x={x} y={y} />;
};

export const Pacman = reactive(PacmanComponent);
