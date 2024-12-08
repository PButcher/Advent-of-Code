// Advent of Code 2024 - Day 5

(async () => {
  const day = "05";
  const input = await fetch("./input.txt");
  const res = await input.text();
  const lines = res.trim().split("\n\n");

  const pageOrderRules = lines[0]
    .split("\n")
    .map((el) => el.split("|"))
    .map((i) => i.map((j) => parseInt(j)));

  const updates = lines[1]
    .split("\n")
    .map((el) => el.split(",").map((el) => parseInt(el)));

  function updateIsValid(update: number[]) {
    const pages = {};
    update.map((page, index) => (pages[page] = index));

    for (let [a, b] of pageOrderRules) {
      if (a in pages && b in pages && !(pages[a] < pages[b])) {
        return [false, 0];
      }
    }

    // Midpoint
    return [true, update[Math.floor(update.length / 2)]];
  }

  // Puzzle 1
  function puzzle1(): string {
    let midpointsSum = 0;

    for (let update of updates) {
      const [valid, midpoint] = updateIsValid(update);
      if (valid) typeof midpoint === "number" && (midpointsSum += midpoint);
    }

    return midpointsSum.toString();
  }

  // Puzzle 2
  function puzzle2(): string {
    function sort(update: number[]) {
      while (true) {
        let sorted = true;
        update.map((_, i) => {
          if (
            pageOrderRules.some(
              (rule) => rule[0] === update[i + 1] && rule[1] === update[i]
            )
          ) {
            sorted = false;
            let swapTemp = update[i + 1];
            update[i + 1] = update[i];
            update[i] = swapTemp;
          }
        });
        if (sorted) return update;
      }
    }

    let midpointsSum = 0;

    for (let update of updates) {
      if (updateIsValid(update)[0]) continue;
      const sequence = sort(update);
      midpointsSum += sequence[Math.floor(sequence.length / 2)];
    }

    return midpointsSum.toString();
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
