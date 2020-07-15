import React from "react";
import mousetrap from "mousetrap";
import { Grid } from "./elements/Grid/Grid";
import { Ghost } from "./elements/Ghost/Ghost";
import { Pacman } from "./elements/Pacman/Pacman";
import { GameWrapper } from "./styles/GameWrapper.style";

import { PacmanStore } from "./stores/Pacman/Pacman.store";
import { GameStore } from "./stores/Game/Game.store";
import { StoreContext } from "./hooks/useStores";
import { BaseStore } from "./stores/Base/Base.store";

// move
export type ShortcutHandler = (
  event: ExtendedKeyboardEvent,
  combo: string
) => any;

function App() {
  const baseStore = new BaseStore();
  const {
    ghostsStore: { ghostRed, ghostPink, ghostBlue, ghostOrange },
  } = baseStore;

  return (
    <StoreContext.Provider value={{ baseStore }}>
      <GameWrapper>
        <Grid />
        <Pacman />
        <Ghost ghost={ghostRed} />
        <Ghost ghost={ghostPink} />
        <Ghost ghost={ghostBlue} />
        <Ghost ghost={ghostOrange} />
      </GameWrapper>
    </StoreContext.Provider>
  );
}

export default App;
