(async function day01() {
  const input = await fetch("input/input.txt");
  const res = await input.text();

  // Puzzle 1
  function puzzle1() {
    return res
      .trim()
      .split("\n")
      .map(depthMeasurementIncreases)
      .filter((c) => c === true).length;
  }

  function depthMeasurementIncreases(depth, i, measurements) {
    return i === 0 ? false : parseInt(depth) > parseInt(measurements[i - 1]);
  }

  // Puzzle 2
  function puzzle2() {
    return res
      .trim()
      .split("\n")
      .map(depthMeasurementIncreasesSlidingWindow)
      .filter((c) => c === true).length;
  }

  function depthMeasurementIncreasesSlidingWindow(depth, i, measurements) {
    let currentWindow =
      i >= 2 && i < measurements.length
        ? parseInt(measurements[i]) +
          parseInt(measurements[i - 1]) +
          parseInt(measurements[i - 2])
        : null;
    let previousWindow =
      i >= 3
        ? parseInt(measurements[i - 1]) +
          parseInt(measurements[i - 2]) +
          parseInt(measurements[i - 3])
        : null;

    return currentWindow !== null && previousWindow !== null
      ? currentWindow > previousWindow
      : false;
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
