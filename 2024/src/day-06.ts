// Advent of Code 2024 - Day 6

(async () => {
  const day = "06";
  const input = await fetch("./input.txt");
  const res = await input.text();
  const lines = res.trim().split("\n\n");

  // Puzzle 1
  function puzzle1(): string {
    return "";
  }

  // Puzzle 2
  function puzzle2(): string {
    return "";
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
