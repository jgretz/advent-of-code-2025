import { sumReduce } from "../shared";
import { exampleData, puzzleData } from "./data";

function parseData(data: string) {
  return data.split("\n").map((line) => line.split("").map(Number));
}

function largestNumberFromArray(arr: number[]) {
  return arr.reduce((max, curr) => (curr > max ? curr : max), -Infinity);
}

function largestComboNumberFromArray(comboLength: number) {
  return function (arr: number[]) {
    const { slots } = Array(comboLength)
      .fill(0)
      .reduce(
        ({ prevIndex, slots: currentSlots }, _, index) => {
          const searchSpace = arr.slice(prevIndex);
          const requiredLength = comboLength - index;

          const number = largestNumberFromArray(
            searchSpace.slice(0, searchSpace.length - requiredLength + 1)
          );

          return {
            prevIndex: arr.indexOf(number, prevIndex) + 1,
            slots: [...currentSlots, number],
          };
        },
        {
          prevIndex: 0,
          slots: [],
        } as { prevIndex: number; slots: number[] }
      );

    return Number(slots.join(""));
  };
}

function solve(data: string, comboLength: number) {
  return parseData(data)
    .map(largestComboNumberFromArray(comboLength))
    .reduce(sumReduce)
    .toString();
}

const problem1 = {
  example: function () {
    return solve(exampleData, 2);
  },
  puzzle: function () {
    return solve(puzzleData, 2);
  },
};

const problem2 = {
  example: function () {
    return solve(exampleData, 12);
  },
  puzzle: function () {
    return solve(puzzleData, 12);
  },
};

export default { problem1, problem2 };
