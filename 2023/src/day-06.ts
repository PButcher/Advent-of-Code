// Advent of Code 2023 - Day 6

(async function day06() {
  const input = await fetch("./input.txt");
  const res = await input.text();
  const lines = res.trim().split("\n");

  function parseInput(line: string) {
    return line
      .split(": ")[1]
      .split(" ")
      .filter((el) => el !== "")
      .map((el) => parseInt(el));
  }

  // Puzzle 1
  function puzzle1(): string {
    const times = parseInput(lines[0]);
    const recordDistances = parseInput(lines[1]);

    const possibleWinsAllRaces = [];

    for (let i = 0; i < times.length; i++) {
      let possibleWins = 0;
      for (let j = 0; j < times[i]; j++) {
        let record = recordDistances[i];
        if (j * (times[i] - j) > record) {
          possibleWins++;
        }
      }
      possibleWinsAllRaces.push(possibleWins);
    }

    return possibleWinsAllRaces.reduce((a, b) => a * b).toString();
  }

  // Puzzle 2
  function puzzle2(): string {
    const times = parseInt(parseInput(lines[0]).join(""));
    const recordDistances = parseInt(parseInput(lines[1]).join(""));

    let possibleWins = 0;
    for (let j = 0; j < times; j++) {
      let record = recordDistances;
      if (j * (times - j) > record) {
        possibleWins++;
      }
    }

    return possibleWins.toString();
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
  console.log(`Day 06 Puzzle 1 Answer: ${puzzle1Answer}`);
  console.log(`Day 06 Puzzle 2 Answer: ${puzzle2Answer}`);
})();
