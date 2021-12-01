(async function day01() {
  const input = await fetch("input/input.txt");
  const res = await input.text();

  // Puzzle 1
  function puzzle1() {
    return res
      .trim()
      .split("\n")
      .map((i) => parseInt(i))
      .map(depthMeasurementIncreases)
      .filter((c) => c).length;
  }

  function depthMeasurementIncreases(d, i, m) {
    return d > m[i - 1];
  }

  // Puzzle 2
  function puzzle2() {
    return res
      .trim()
      .split("\n")
      .map((i) => parseInt(i))
      .map(depthMeasurementIncreasesSlidingWindow)
      .filter((c) => c).length;
  }

  function depthMeasurementIncreasesSlidingWindow(_, i, m) {
    let curr = m[i] + m[i - 1] + m[i - 2];
    let prev = m[i - 1] + m[i - 2] + m[i - 3];

    return curr > prev;
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
