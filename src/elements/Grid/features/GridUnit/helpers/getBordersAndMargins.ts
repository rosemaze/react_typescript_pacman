import { GridValues, GRID } from "../../../Grid.constants";

interface Options {
  rowIndex: number;
  colIndex: number;
  grid: number[][];
  marginUnit: number;
  borderRadiusUnit: number;
  isWall: boolean;
}

export const getBordersAndMargins = ({
  rowIndex,
  colIndex,
  grid,
  marginUnit,
  borderRadiusUnit,
  isWall,
}: Options) => {
  let marginTop = 0,
    marginBottom = 0,
    marginRight = 0,
    marginLeft = 0,
    borderTopLeftRadius = 0,
    borderTopRightRadius = 0,
    borderBottomLeftRadius = 0,
    borderBottomRightRadius = 0;

  const isNotTopEnclosure = rowIndex > 0;
  const isNotLeftEnclosure = colIndex > 0;
  const isNotBottomEnclosure = rowIndex < grid.length - 2;
  const isNotRightEnclosure = colIndex < grid[rowIndex].length - 2;

  const squareAbove = isNotTopEnclosure
    ? grid[rowIndex - 1][colIndex]
    : undefined;
  const squareBelow = isNotBottomEnclosure
    ? grid[rowIndex + 1][colIndex]
    : undefined;
  const squareToLeft = isNotLeftEnclosure
    ? grid[rowIndex][colIndex - 1]
    : undefined;
  const squareToRight = isNotRightEnclosure
    ? grid[rowIndex][colIndex + 1]
    : undefined;

  if (isWall) {
    if (
      squareAbove &&
      [GridValues.DOT, GridValues.MAGIC_DOT, GridValues.NO_DOT].includes(
        squareAbove
      )
    ) {
      marginTop = marginUnit;
    }

    if (
      squareBelow &&
      [GridValues.DOT, GridValues.MAGIC_DOT, GridValues.NO_DOT].includes(
        squareBelow
      )
    ) {
      marginBottom = marginUnit;
    }

    if (
      squareToLeft &&
      [GridValues.DOT, GridValues.MAGIC_DOT, GridValues.NO_DOT].includes(
        squareToLeft
      )
    ) {
      marginLeft = marginUnit;
    }

    if (
      squareToRight &&
      [GridValues.DOT, GridValues.MAGIC_DOT, GridValues.NO_DOT].includes(
        squareToRight
      )
    ) {
      marginRight = marginUnit;
    }
  }

  const currentSquare = GRID[rowIndex][colIndex];

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
