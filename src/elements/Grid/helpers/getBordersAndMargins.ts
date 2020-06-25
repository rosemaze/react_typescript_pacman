import { GridValues } from "../Grid.constants";

interface Options {
  rowIndex: number;
  colIndex: number;
  walls: number[][];
  marginUnit: number;
  borderRadiusUnit: number;
}

export const getBordersAndMargins = ({
  rowIndex,
  colIndex,
  walls,
  marginUnit,
  borderRadiusUnit,
}: Options) => {
  let marginTop = 0,
    marginBottom = 0,
    marginRight = 0,
    marginLeft = 0,
    borderTopLeftRadius = 0,
    borderTopRightRadius = 0,
    borderBottomLeftRadius = 0,
    borderBottomRightRadius = 0;

  /*
  const isNotTopWall = rowIndex > 0;
  const isNotLeftWall = colIndex > 0;
  const isNotBottomWall = rowIndex < walls.length - 1;
  const isNotRightWall = colIndex < walls[rowIndex].length - 1;
  const squareAbove = isNotTopWall ? walls[rowIndex - 1][colIndex] : undefined;
  const squareToLeft = isNotLeftWall
    ? walls[rowIndex][colIndex - 1]
    : undefined;
  const squareBelow = isNotBottomWall
    ? walls[rowIndex + 1][colIndex]
    : undefined;
  const squareToRight = isNotRightWall ? walls[rowIndex][colIndex + 1];
*/

  /*
  if (rowIndex > 0 && walls[rowIndex - 1][colIndex] != GridValues.WALL) {
    marginTop = marginUnit;
    if (colIndex > 0 && walls[rowIndex][colIndex - 1] != GridValues.WALL) {
      borderBottomRightRadius = borderRadiusUnit;
    } else if (
      rowIndex < walls[rowIndex].length - 1 &&
      walls[rowIndex][colIndex + 1] != 0
    ) {
      borderTopLeftRadius = borderRadiusUnit;
    }
  }
  if (
    rowIndex < walls.length - 1 &&
    walls[rowIndex + 1][colIndex] != GridValues.WALL
  ) {
    marginBottom = marginUnit;
    if (rowIndex > 0 && walls[rowIndex][colIndex - 1] != GridValues.WALL) {
      borderBottomLeftRadius = borderRadiusUnit;
    } else if (
      rowIndex < walls[rowIndex].length - 1 &&
      walls[rowIndex][colIndex + 1] != GridValues.WALL
    ) {
      borderBottomRightRadius = borderRadiusUnit;
    }
  }

  if (colIndex > 0 && walls[rowIndex][colIndex - 1] != GridValues.WALL) {
    marginLeft = marginUnit;
  }

  if (
    colIndex < walls[rowIndex].length - 1 &&
    walls[rowIndex][colIndex + 1] != GridValues.WALL
  ) {
    marginRight = marginUnit;
  }
  */

  const currentSquare = walls[rowIndex][colIndex];

  switch (currentSquare) {
    case GridValues.WALL_TOP_LEFT_BORDER:
      borderTopLeftRadius = borderRadiusUnit;
      break;
    case GridValues.WALL_TOP_RIGHT_BORDER:
      borderTopRightRadius = borderRadiusUnit;
      break;
    case GridValues.WALL_BOTTOM_RIGHT_BORDER:
      borderBottomRightRadius = borderRadiusUnit;
      break;
    case GridValues.WALL_BOTTOM_LEFT_BORDER:
      borderBottomLeftRadius = borderRadiusUnit;
      break;
  }

  return {
    marginTop,
    marginBottom,
    marginRight,
    marginLeft,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  };
};
