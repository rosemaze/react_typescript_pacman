import React from "react";
import mousetrap from "mousetrap";
import { Grid } from "./elements/Grid/Grid";
import { Pacman } from "./elements/Pacman/Pacman";
import { GameWrapper } from "./styles/GameWrapper.style";

import { PacmanStore } from "./stores/Pacman.store";
import { GameStore } from "./stores/Game.store";
import { StoreContext } from "./hooks/useStores";

// move
export type ShortcutHandler = (
  event: ExtendedKeyboardEvent,
  combo: string
) => any;

function App() {
  const pacmanStore = new PacmanStore();
  const gameStore = new GameStore();

  return (
    <StoreContext.Provider
      value={{ pacmanStore: pacmanStore, gameStore: gameStore }}
    >
      <GameWrapper>
        <Grid />
        <Pacman />
      </GameWrapper>
    </StoreContext.Provider>
  );
}

export default App;
