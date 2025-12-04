import { exampleData, puzzleData } from "./data";

function parseData(data: string) {
  return data.split(",").map((range) => {
    const [start, end] = range.split("-").map(Number);
    if (!start || !end) {
      throw new Error(`Invalid range: ${range}`);
    }

    return Array(end - start + 1)
      .fill(0)
      .map((_, index) => (start + index).toString());
  });
}

function isValid1(id: string) {
  if (id.length % 2 !== 0) {
    return true;
  }

  const mid = id.length / 2;
  const firstHalf = id.slice(0, mid);
  const secondHalf = id.slice(mid);

  return firstHalf !== secondHalf;
}

function isValid2(id: string) {
  const mid = Math.floor(id.length / 2);

  for (let i = 1; i <= mid; i++) {
    const check = id.slice(0, i);
    const cast = Array(Math.ceil(id.length / i))
      .fill(check)
      .join("");

    if (cast === id) {
      return false;
    }
  }

  return true;
}

function solve1(data: string) {
  return parseData(data)
    .flat()
    .filter((n) => !isValid1(n))
    .reduce((a, b) => Number(a) + Number(b), 0)
    .toString();
}

function solve2(data: string) {
  return parseData(data)
    .flat()
    .filter((n) => !isValid2(n))
    .reduce((a, b) => Number(a) + Number(b), 0)
    .toString();
}

const problem1 = {
  example: function () {
    return solve1(exampleData);
  },
  puzzle: function () {
    return solve1(puzzleData);
  },
};

const problem2 = {
  example: function () {
    return solve2(exampleData);
  },
  puzzle: function () {
    return solve2(puzzleData);
  },
};

export default { problem1, problem2 };
