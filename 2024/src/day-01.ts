// Advent of Code 2024 - Day 1

(async () => {
  const day = "01";
  const input = await fetch("./input.txt");
  const res = await input.text();
  const lines = res.trim().split("\n");

  // Puzzle 1
  function puzzle1(): string {
    // Lists
    const list1: number[] = [];
    const list2: number[] = [];

    // Separate lines into two lists
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].split("   ");
      list1.push(parseInt(line[0]));
      list2.push(parseInt(line[1]));
    }

    // Sort each list from smallest to largest
    list1.sort((a, b) => a - b);
    list2.sort((a, b) => a - b);

    // Calculate sum of distances
    let sumOfDistances = 0;
    for (let i = 0; i < lines.length; i++) {
      sumOfDistances += Math.abs(list1[i] - list2[i]);
    }
    return sumOfDistances.toString();
  }

  // Puzzle 2
  function puzzle2(): string {
    // Lists
    const list1: number[] = [];
    const list2: number[] = [];

    // Separate lines into two lists
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].split("   ");
      list1.push(parseInt(line[0]));
      list2.push(parseInt(line[1]));
    }

    // Calculate similarity score
    let sumOfSimilarityScores = 0;
    for (let i = 0; i < lines.length; i++) {
      sumOfSimilarityScores +=
        list1[i] * list2.filter((el) => el === list1[i]).length;
    }
    return sumOfSimilarityScores.toString();
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
