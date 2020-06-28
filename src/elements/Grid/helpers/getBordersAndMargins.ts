import { GridValues } from "../Grid.constants";

interface Options {
  rowIndex: number;
  colIndex: number;
  walls: number[][];
  marginUnit: number;
  borderRadiusUnit: number;
  isWall: boolean;
}

export const getBordersAndMargins = ({
  rowIndex,
  colIndex,
  walls,
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
  const isNotBottomEnclosure = rowIndex < walls.length - 2;
  const isNotRightEnclosure = colIndex < walls[rowIndex].length - 2;
  const isNotAnyEnclosure =
    isNotTopEnclosure &&
    isNotLeftEnclosure &&
    isNotBottomEnclosure &&
    isNotRightEnclosure;

  const squareAbove = isNotTopEnclosure
    ? walls[rowIndex - 1][colIndex]
    : undefined;
  const squareBelow = isNotBottomEnclosure
    ? walls[rowIndex + 1][colIndex]
    : undefined;
  const squareToLeft = isNotLeftEnclosure
    ? walls[rowIndex][colIndex - 1]
    : undefined;
  const squareToRight = isNotRightEnclosure
    ? walls[rowIndex][colIndex + 1]
    : undefined;

  /*
  console.log(rowIndex, colIndex);
  const squareToAboveLeft = isNotAnyEnclosure
    ? walls[rowIndex - 1][colIndex - 1]
    : undefined;
  const squareToAboveRight = isNotAnyEnclosure
    ? walls[rowIndex + 1][colIndex - 1]
    : undefined;
  const squareToBelowLeft = isNotAnyEnclosure
    ? walls[rowIndex - 1][colIndex + 1]
    : undefined;
  const squareToBelowRight = isNotAnyEnclosure
    ? walls[rowIndex + 1][colIndex + 1]
    : undefined;
    */

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

    console.log(
      "row",
      rowIndex,
      "col",
      colIndex,
      squareAbove,
      squareToLeft,
      walls[rowIndex][colIndex],
      squareAbove && squareAbove === GridValues.WALL,
      squareToLeft && squareToLeft === GridValues.WALL
    );
  }

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
