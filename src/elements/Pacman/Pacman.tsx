import React from "react";
import { PacmanWrapper } from "./styles/PacmanWrapper.style";
import { reactive } from "../../helpers/reactive";
import { useStores } from "../../hooks/useStores";

export const PacmanComponent: React.FC = () => {
  const {
    baseStore: { pacmanStore },
  } = useStores();
  const { x, y } = pacmanStore;

  return <PacmanWrapper x={x} y={y} />;
};

export const Pacman = reactive(PacmanComponent);
