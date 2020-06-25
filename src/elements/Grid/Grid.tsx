import React from "react";
import {
  GridValues,
  paths,
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
      {paths.map((row, rowIndex) => {
        let isWall = false;

        return row.map((col, colIndex) => {
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
          });

          isWall = col === GridValues.WALL;

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
              id={`${colIndex}_${rowIndex}_top_${rowIndex * 15}_left_${
                colIndex * 15
              }`}
            />
          );
        });
      })}
    </>
  );
};
