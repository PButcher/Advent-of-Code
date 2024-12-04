// Advent of Code 2024 - Day 3

(async () => {
  const day = "03";
  const input = await fetch("./input.txt");
  const res = await input.text();
  const lines = res.trim().split("\n");

  function getMulOperands(str: string) {
    let [n1, n2] = str.slice(4, str.length - 1).split(",");
    return parseInt(n1) * parseInt(n2);
  }

  // Puzzle 1
  function puzzle1(): string {
    const matches = res.match(/mul\([0-9]+,[0-9]+\)/g);
    return (
      matches
        ?.map((el) => getMulOperands(el))
        .reduce((acc, v) => acc + v, 0)
        .toString() || ""
    );
  }

  // Puzzle 2
  function puzzle2(): string {
    const matches = [...res.matchAll(/mul\([0-9]+,[0-9]+\)/g)]; // mul(0,0)
    const dos = [...res.matchAll(/do\(\)/g)]; // do()
    const donts = [...res.matchAll(/don\'t\(\)/g)]; // don't()

    const matchIndices = matches.map((el) => el.index);
    let doIndices = dos.map((el) => el.index);
    let dontIndices = donts.map((el) => el.index);

    let enabled = true;
    let enabledMatches = [];

    for (let i = 0; i < matches.length; i++) {
      if (!enabled && doIndices[0] < matchIndices[i]) {
        enabled = true;
        dontIndices = dontIndices.filter((el) => el > doIndices[0]);
      } else if (enabled && dontIndices[0] < matchIndices[i]) {
        enabled = false;
        doIndices = doIndices.filter((el) => el > dontIndices[0]);
      }
      if (enabled) enabledMatches.push(matches[i]);
    }

    return (
      enabledMatches
        ?.map((el) => getMulOperands(el[0]))
        .reduce((acc, v) => acc + v, 0)
        .toString() || ""
    );
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
