import { GridValues } from "../../../elements/Grid/Grid.constants";

export const getHasPacmanEatenAMagicDot = (options: {
  pacmanRow: number;
  pacmanCol: number;
  grid: number[][];
}) => (options.grid[options.pacmanRow][options.pacmanCol] === GridValues.MAGIC_DOT);
