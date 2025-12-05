import { match } from "ts-pattern";
import { exampleData, puzzleData } from "./data";

const ROLL = "@";

function parseData(data: string) {
  return data.split("\n").map((line) => line.split(""));
}

function createMatrix(data: string[][]) {
  const matrix: string[][] = [];
  for (let i = 0; i < data.length; i++) {
    matrix[i] = [];

    if (data[i] === undefined) continue;

    for (let j = 0; j < data[i]!.length; j++) {
      matrix[i]![j] = data[i]![j]!;
    }
  }
  return matrix;
}

function incrementItemCount(i: number, j: number, matrix: number[][]) {
  if (i < 0 || j < 0) return;
  if (i >= matrix.length) return;
  if (j >= (matrix[i] ? matrix[i]!.length : 0)) return;

  matrix[i]![j] = (matrix[i]![j] || 0) + 1;
}

function createCountMatrix(data: string[][]) {
  const matrix: number[][] = [];

  // Initialize matrix with zeros
  for (let i = 0; i < data.length; i++) {
    matrix[i] = [];

    for (let j = 0; j < data[i]!.length; j++) {
      matrix[i]![j] = 0;
    }
  }

  // Count adjacent "@" characters
  for (let i = 0; i < data.length; i++) {
    if (data[i] === undefined) continue;

    for (let j = 0; j < data[i]!.length; j++) {
      const char = data[i]![j]!;
      if (char !== ROLL) continue;

      incrementItemCount(i, j - 1, matrix);
      incrementItemCount(i, j + 1, matrix);
      incrementItemCount(i - 1, j, matrix);
      incrementItemCount(i + 1, j, matrix);
      incrementItemCount(i - 1, j - 1, matrix);
      incrementItemCount(i - 1, j + 1, matrix);
      incrementItemCount(i + 1, j - 1, matrix);
      incrementItemCount(i + 1, j + 1, matrix);
    }
  }

  return matrix;
}

function isAccessible(isRoll: boolean, count: number) {
  return isRoll && count < 4;
}

function countAccessible(rollMatrix: string[][], countMatrix: number[][]) {
  const rolls = rollMatrix.flat();

  return countMatrix.flat().reduce((acc, count, index) => {
    const isRoll = rolls[index] === ROLL;
    if (!isAccessible(isRoll, count)) return acc;

    return acc + 1;
  }, 0);
}

function removeAccessibleRoles(
  rollMatrix: string[][],
  countMatrix: number[][]
) {
  return rollMatrix.map((row, i) =>
    row.map((item, j) => {
      const isRoll = item === ROLL;
      const count = countMatrix[i]![j]!;

      return isAccessible(isRoll, count) ? "." : item;
    })
  );
}

function solve1(data: string) {
  const parsedData = parseData(data);
  const rollMatrix = createMatrix(parsedData);
  const countMatrix = createCountMatrix(rollMatrix);

  return countAccessible(rollMatrix, countMatrix);
}

function solve2(data: string) {
  const parsedData = parseData(data);
  let rollMatrix = createMatrix(parsedData);

  let totalAccessibleCount = 0;
  while (true) {
    const countMatrix = createCountMatrix(rollMatrix);
    const accessibleCount = countAccessible(rollMatrix, countMatrix);

    if (accessibleCount === 0) break;

    totalAccessibleCount += accessibleCount;
    rollMatrix = removeAccessibleRoles(rollMatrix, countMatrix);
  }

  return totalAccessibleCount;
}

function printMatrix(
  matrix: (string | number)[][],
  formatter?: (item: string | number, i: number, j: number) => string
) {
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i]?.map((item, j) =>
      formatter ? formatter(item, i, j) : item.toString()
    );

    console.log(row?.join("") ?? "");
  }
}

function format(rollMatrix: string[][]) {
  return (item: string | number, i: number, j: number) => {
    const isRoll = rollMatrix[i]![j] === ROLL;
    const notAccessibleChar = isRoll ? ROLL : ".";

    return isAccessible(isRoll, item as number) ? "x" : notAccessibleChar;
  };
}

const problem1 = {
  example: function () {
    return solve1(exampleData).toString();
  },
  puzzle: function () {
    return solve1(puzzleData).toString();
  },
};

const problem2 = {
  example: function () {
    return solve2(exampleData).toString();
  },
  puzzle: function () {
    return solve2(puzzleData).toString();
  },
};

export default { problem1, problem2 };
