import type { Day, ProblemSolver } from "./Types";

async function runSolve(solver: ProblemSolver, index: number) {
  console.log(`******* Problem ${index} *******`);
  console.log("******* Example *******");
  const example = await solver.example();
  console.log(example);

  console.log("******* Puzzle *******");
  const puzzle = await solver.puzzle();
  console.log(puzzle);

  console.log();
}

async function main(args: string[] = process.argv.slice(2)) {
  const activeDay = args[0];
  if (!activeDay) {
    console.log("Please provide the day to run, e.g., '1' for Day 1");
    return;
  }

  const day = require(`./day${activeDay}`).default as Day;
  if (!day) {
    console.log(`No day found for ${activeDay}`);
    return;
  }

  console.log(`******* Day ${activeDay} *******\n`);

  await runSolve(day.problem1, 1);
  await runSolve(day.problem2, 2);

  console.log("******* End *******");
}
main();
