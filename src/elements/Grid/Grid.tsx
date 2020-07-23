import React from "react";
import { GridValues, GRID } from "./Grid.constants";
import { GridUnit } from "./features/GridUnit/GridUnit";
import { getGridId } from "../../stores/Game/helpers/getGridId";

export const Grid: React.FC = () => {
  return (
    <>
      {GRID.map((row, rowIndex) => {
        let isWall = false;
        let hasDot = false;
        let hasMagicDot = false;

        return row.map((col, colIndex) => {
          isWall = [
            GridValues.WALL,
            GridValues.WALL_BOTTOM_LEFT_BORDER,
            GridValues.WALL_BOTTOM_RIGHT_BORDER,
            GridValues.WALL_TOP_LEFT_BORDER,
            GridValues.WALL_TOP_RIGHT_BORDER,
          ].includes(col);

          hasDot = [GridValues.DOT].includes(col);
          hasMagicDot = [GridValues.MAGIC_DOT].includes(col);

          return (
            <GridUnit
              isWall={isWall}
              rowIndex={rowIndex}
              colIndex={colIndex}
              hasDot={hasDot}
              hasMagicDot={hasMagicDot}
              id={getGridId({ colIndex, rowIndex })}
            />
          );
        });
      })}
    </>
  );
};
