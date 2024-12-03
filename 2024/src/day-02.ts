// Advent of Code 2024 - Day 2

(async () => {
  const day = "02";
  const input = await fetch("./input.txt");
  const res = await input.text();
  const lines = res.trim().split("\n");

  // Puzzle 1
  function puzzle1(): string {
    let safeCount = 0;
    for (let line of lines) {
      const report = line.split(" ").map((el) => parseInt(el));
      let gradient: number[] = [];
      for (let i = 1; i < report.length; i++) {
        const diff = report[i] - report[i - 1];
        if (Math.abs(diff) >= 1 && Math.abs(diff) <= 3) {
          gradient.push(Math.sign(diff));
        }
      }
      if (
        gradient.length === report.length - 1 &&
        gradient.every((el) => el == gradient[0])
      ) {
        safeCount++;
      }
    }

    return safeCount.toString();
  }

  // Puzzle 2
  function puzzle2(): string {
    function safe(report: number[]) {
      let gradient: number[] = [];
      for (let i = 1; i < report.length; i++) {
        gradient.push(report[i] - report[i - 1]);
      }
      let increasing = gradient.every((el) => el > 0);
      let decreasing = gradient.every((el) => el < 0);
      let inRange = gradient
        .map((el) => Math.abs(el))
        .every((el) => el >= 1 && el <= 3);
      return (increasing || decreasing) && inRange;
    }

    function safeWithProblemDampener(report: number[]) {
      let permutations = report.map((el, i) => {
        let permutation = [...report];
        permutation.splice(i, 1);
        return permutation;
      });
      return safe(report) || permutations.some((el) => safe(el));
    }

    let safeCount = 0;
    for (let line of lines) {
      const report = line.split(" ").map((el) => parseInt(el));
      if (safeWithProblemDampener(report)) safeCount++;
    }

    return safeCount.toString();
  }

  // Run puzzles
  const puzzle1Answer = puzzle1();
  const puzzle2Answer = puzzle2();

  // Output puzzles
  const puzzle1AnswerEl = document.getElementById("answer1");
  const puzzle2AnswerEl = document.getElementById("answer2");
  if (puzzle1AnswerEl) puzzle1AnswerEl.innerText = puzzle1Answer;
  if (puzzle2AnswerEl) puzzle2AnswerEl.innerText = puzzle2Answer;

  // Log puzzles
  console.log(`Day ${day} Puzzle 1 Answer: ${puzzle1Answer}`);
  console.log(`Day ${day} Puzzle 2 Answer: ${puzzle2Answer}`);
})();
