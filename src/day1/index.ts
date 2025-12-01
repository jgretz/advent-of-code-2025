import { peek, sum } from "../shared";
import { exampleData, puzzleData } from "./data";

const DIAL_SIZE = 100;

type DialStep = {
  direction: "L" | "R" | "S";
  steps: number;

  position?: number;
  overZero?: number;
};

function parseLine(line: string) {
  const match = line.match(/^(L|R|S)(\d+)$/);
  if (!match || match.length < 3) {
    throw new Error(`Invalid line: ${line}`);
  }

  return {
    direction: match[1] as "L" | "R" | "S",
    steps: parseInt(match[2]!, 10),
  };
}

function parseData(data: string) {
  return data.split("\n").map(parseLine);
}

function hardRotations(rawSteps: number) {
  return Math.floor(Math.abs(rawSteps) / DIAL_SIZE);
}

function isZero(position: number) {
  return position === 0 ? 1 : 0;
}

function passZero(previous: number, steps: number) {
  if (previous === 0) {
    return 0;
  }

  if (previous + steps < 0) {
    return 1;
  }

  if (previous + steps > DIAL_SIZE) {
    return 1;
  }

  return 0;
}

function rotateDial(steps: DialStep[], next: DialStep) {
  const rotateRaw = next.direction === "L" ? -next.steps : next.steps;
  const rotateActual = rotateRaw % DIAL_SIZE;

  const current = steps[steps.length - 1]!;

  const raw = current.position! + rotateActual;
  const position = raw < 0 ? DIAL_SIZE + raw : raw % DIAL_SIZE;

  const overZero = sum([
    hardRotations(rotateRaw),
    isZero(position),
    passZero(current.position!, rotateActual),
  ]);

  return [
    ...steps,
    {
      direction: next.direction,
      steps: next.steps,
      position,
      overZero,
    },
  ];
}

function zeroTest(step: DialStep) {
  return step.position === 0;
}

function solveProblem1(data: string) {
  const initialStep: DialStep = {
    direction: "S",
    steps: 0,
    position: 50,
    overZero: 0,
  };

  return (
    parseData(data)
      .reduce(rotateDial, [initialStep])
      // .map(peek)
      .filter(zeroTest).length
  );
}

function solveProblem2(data: string) {
  const initialStep: DialStep = {
    direction: "S",
    steps: 0,
    position: 50,
    overZero: 0,
  };

  return (
    parseData(data)
      .reduce(rotateDial, [initialStep])
      // .map(peek)
      .reduce((count, step) => count + (step.overZero || 0), 0)
  );
}

const problem1 = {
  example: function () {
    return solveProblem1(exampleData).toString();
  },
  puzzle: function () {
    return solveProblem1(puzzleData).toString();
  },
};

const problem2 = {
  example: function () {
    return solveProblem2(exampleData).toString();
  },
  puzzle: function () {
    return solveProblem2(puzzleData).toString();
  },
};

export default { problem1, problem2 };
