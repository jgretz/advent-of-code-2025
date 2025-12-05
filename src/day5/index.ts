import { sumReduce } from "../shared";
import { exampleData, puzzleData } from "./data";

interface Range {
  start: number;
  end: number;
}

const isRange = (line: string): boolean => line.includes("-");

const parseRange = (line: string): Range => {
  const [start, end] = line.split("-").map(Number);
  if (!start || !end || isNaN(start) || isNaN(end)) {
    throw new Error(`Invalid range line: ${line}`);
  }

  return { start, end } satisfies Range;
};

const parseIngredient = (line: string): number => Number(line);

const parseData = (data: string) => {
  const lines = data.trim().split("\n");
  const emptyIndex = lines.indexOf("");

  const ranges = lines.slice(0, emptyIndex).filter(isRange).map(parseRange);

  const ingredients = lines
    .slice(emptyIndex + 1)
    .filter((line) => line.length > 0)
    .map(parseIngredient);

  return { ranges, ingredients };
};

const mergeRanges = (ranges: Range[]): Range[] => {
  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const merged: Range[] = [];

  for (const range of sorted) {
    const last = merged[merged.length - 1];
    if (!last || range.start > last.end + 1) {
      merged.push(range);
    } else {
      last.end = Math.max(last.end, range.end);
    }
  }

  return merged;
};

const isInRange = (ingredient: number, ranges: Range[]): boolean => {
  return ranges.some(
    (range) => ingredient >= range.start && ingredient <= range.end
  );
};

const solve1 = (data: string): number => {
  const { ranges, ingredients } = parseData(data);
  const mergedRanges = mergeRanges(ranges);

  return ingredients.filter((ingredient) => isInRange(ingredient, mergedRanges))
    .length;
};

const solve2 = (data: string): number => {
  const { ranges } = parseData(data);
  const mergedRanges = mergeRanges(ranges);

  return mergedRanges
    .map((range) => range.end - range.start + 1)
    .reduce(sumReduce);
};

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
