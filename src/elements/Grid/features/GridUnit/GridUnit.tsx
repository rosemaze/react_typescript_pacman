import React from "react";
// import { Dot } from "./styles/Dot.style";
import { Wall, BORDER_MARGIN, BORDER_RADIUS } from "./styles/Wall.style";
import { getBordersAndMargins } from "./helpers/getBordersAndMargins";
import { GRID, MAGIC_DOTS_COORDS } from "../../Grid.constants";
import { useStores } from "../../../../hooks/useStores";
import { reactive } from "../../../../helpers/reactive";
import { Dot } from "../Dot/Dot";
import { getCoord } from "../../../../stores/Game/helpers/getCoord";

interface Props {
  id: string;
  isWall: boolean;
  // hasDot: boolean;
  // hasMagicDot: boolean;
  rowIndex: number;
  colIndex: number;
}

const GridUnitComponent: React.FC<Props> = (props) => {
  const { isWall, rowIndex, colIndex } = props;

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

  const { dots } = gameStore;

  const coord = getCoord({ colIndex, rowIndex });
  const hasDot = dots.get(coord) === true;

  const isMagicDot = MAGIC_DOTS_COORDS.includes(coord);

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
      {hasDot && <Dot isMagicDot={isMagicDot} />}
    </Wall>
  );
};

export const GridUnit = reactive(GridUnitComponent);
