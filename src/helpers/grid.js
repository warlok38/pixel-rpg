import { GRID_SIZE } from "../consts";

export const gridCells = (n) => {
  return n * GRID_SIZE;
};

export const gridCellsArray = (start, count) => {
  if (
    !start ||
    !count ||
    typeof start !== "number" ||
    typeof count !== "number"
  ) {
    throw Error("Wrong arguments in gridCellsArray()");
  }
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(start + i * GRID_SIZE);
  }
  return result;
};

export const isSpaceFree = (walls, x, y) => {
  const str = `${x},${y}`;
  const isWallPresent = walls.has(str);

  return !isWallPresent;
};
