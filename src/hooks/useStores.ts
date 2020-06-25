import React from "react";
import { PacmanStore } from "../stores/Pacman.store";
import { GameStore } from "../stores/Game.store";

export const StoreContext = React.createContext<{
  pacmanStore: PacmanStore;
  gameStore: GameStore;
}>(undefined!);

export const useStores = () => React.useContext(StoreContext);

/*
export const StoreContext = React.createContext<StoresInterface>(undefined!);

export const useStores = () => React.useContext(StoreContext);
*/
