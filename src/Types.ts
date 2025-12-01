export interface Day {
  problem1: ProblemSolver;
  problem2: ProblemSolver;
}

export interface ProblemSolver {
  example: () => string | Promise<string>;
  puzzle: () => string | Promise<string>;
}
