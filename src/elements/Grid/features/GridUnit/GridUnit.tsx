import React from "react";
// import { Dot } from "./styles/Dot.style";
import { MagicDot } from "./styles/MagicDot.style";
import { Wall, BORDER_MARGIN, BORDER_RADIUS } from "./styles/Wall.style";
import { getBordersAndMargins } from "./helpers/getBordersAndMargins";
import { GRID } from "../../Grid.constants";
import { useStores } from "../../../../hooks/useStores";
import { reactive } from "../../../../helpers/reactive";

enum DotState {
  Eaten = "eaten",
  Uneaten = "uneaten",
}

interface Props {
  id: string;
  isWall: boolean;
  hasDot: boolean;
  hasMagicDot: boolean;
  rowIndex: number;
  colIndex: number;
}

const GridUnitComponent: React.FC<Props> = (props) => {
  const { id, isWall, hasMagicDot, rowIndex, colIndex } = props;

  // Maybe move this a helper in the styled component
  const {
    marginTop,
    marginBottom,
    marginRight,
    marginLeft,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  } = getBordersAndMargins({
    rowIndex,
    colIndex,
    grid: GRID,
    marginUnit: BORDER_MARGIN,
    borderRadiusUnit: BORDER_RADIUS,
    isWall,
  });

  const {
    baseStore: { gameStore },
  } = useStores();
  // const { eatenDotIds } = gameStore;

  /* SLOW: has to render every dot in the path
  const dotState = React.useMemo(
    () => (eatenDotIds.includes(id) ? DotState.Eaten : DotState.Uneaten),
    [eatenDotIds.length, id]
  );
  */

  return (
    <Wall
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginBottom={marginBottom}
      rowIndex={rowIndex}
      colIndex={colIndex}
      borderTopLeftRadius={borderTopLeftRadius}
      borderTopRightRadius={borderTopRightRadius}
      borderBottomLeftRadius={borderBottomLeftRadius}
      borderBottomRightRadius={borderBottomRightRadius}
      isWall={isWall}
      key={`${colIndex}_${rowIndex}`}
      id={`col_${colIndex}_row_${rowIndex}_top_${rowIndex * 15}_left_${
        colIndex * 15
      }`}
    >
      {hasMagicDot && <MagicDot id={id} />}
    </Wall>
  );
};

export const GridUnit = reactive(GridUnitComponent);

//// {dotState === DotState.Uneaten && <Dot id={id} />}
