import React from "react";
import mousetrap from "mousetrap";

import { Grid } from "./elements/Grid/Grid";
import { Ghost } from "./elements/Ghost/Ghost";
import { Pacman } from "./elements/Pacman/Pacman";
import { Stats } from "./elements/Stats/Stats";
import { mapKeyToDirection } from "./helpers/mapKeyToDirection";
import { StoreContext } from "./hooks/useStores";
import { BaseStore } from "./stores/Base/Base.store";
import { GameWrapper } from "./styles/GameWrapper.style";
import { GridWrapper } from "./styles/GridWrapper.style";

export type ShortcutHandler = (
  event: ExtendedKeyboardEvent,
  combo: string
) => any;

function App() {
  const baseStore = new BaseStore();
  const {
    ghostsStore: { ghostRed, ghostPink, ghostBlue, ghostOrange },
    pacmanStore: { setDirection: setPacmanDirection },
    gameStore: { isRunning, startGame },
  } = baseStore;

  const handleKeyPress = React.useCallback(
    (e: ExtendedKeyboardEvent) => {
      const direction = mapKeyToDirection(e.key);
      if (!direction) {
        return;
      }

      setPacmanDirection(direction);

      if (isRunning) {
        return;
      }

      startGame();
    },
    [isRunning, startGame, setPacmanDirection]
  );

  mousetrap.bind("up", handleKeyPress);
  mousetrap.bind("down", handleKeyPress);
  mousetrap.bind("left", handleKeyPress);
  mousetrap.bind("right", handleKeyPress);

  return (
    <StoreContext.Provider value={{ baseStore }}>
      <GameWrapper>
        <GridWrapper>
          <Grid />
          <Ghost ghost={ghostRed} />
          <Ghost ghost={ghostPink} />
          <Ghost ghost={ghostBlue} />
          <Ghost ghost={ghostOrange} />
          <Pacman />
        </GridWrapper>
        <Stats />
      </GameWrapper>
    </StoreContext.Provider>
  );
}

export default App;
