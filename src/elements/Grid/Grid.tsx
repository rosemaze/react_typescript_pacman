import React from "react";
import {
  GridValues,
  walls,
  BORDER_RADIUS,
  BORDER_MARGIN,
} from "./Grid.constants";
import { getBordersAndMargins } from "./helpers/getBordersAndMargins";
import { Wall } from "./styles/Wall.style";

export const Grid: React.FC = () => {
  console.log("rendering grid");

  return (
    <>
      {walls.map((row, rowIndex) => {
        let isWall = false;

        return row.map((col, colIndex) => {
          isWall = [
            GridValues.WALL,
            GridValues.WALL_BOTTOM_LEFT_BORDER,
            GridValues.WALL_BOTTOM_RIGHT_BORDER,
            GridValues.WALL_TOP_LEFT_BORDER,
            GridValues.WALL_TOP_RIGHT_BORDER,
          ].includes(col);

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
            walls,
            marginUnit: BORDER_MARGIN,
            borderRadiusUnit: BORDER_RADIUS,
            isWall,
          });

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
            />
          );
        });
      })}
    </>
  );
};
