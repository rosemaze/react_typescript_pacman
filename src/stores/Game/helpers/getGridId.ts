export const getGridId = (options: { colIndex: number; rowIndex: number }) =>
  options.colIndex + "_" + options.rowIndex;
