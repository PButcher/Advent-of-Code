(async function day08() {
  const input = await fetch("input/input.txt");
  const res = await input.text();
  const parsedInput = res
    .trim()
    .split(",")
    .map((el) => parseInt(el));

  // Puzzle 1
  function puzzle1() {
    return 0;
  }

  // Puzzle 2
  function puzzle2() {
    return 0;
  }

  // Run puzzles
  var puzzle1Answer = puzzle1();
  var puzzle2Answer = puzzle2();

  // Output puzzles
  document.getElementById("answer1").innerText = puzzle1Answer;
  document.getElementById("answer2").innerText = puzzle2Answer;
  console.log(`Day 01 Puzzle 1 Answer: ${puzzle1Answer}`);
  console.log(`Day 01 Puzzle 2 Answer: ${puzzle2Answer}`);
})();
