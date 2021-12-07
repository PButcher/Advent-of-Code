(async function day07() {
  const input = await fetch("input/input.txt");
  const res = await input.text();
  const parsedInput = res
    .trim()
    .split(",")
    .map((el) => parseInt(el))
    .sort((a, b) => a - b);

  // Find the median position in an array
  function medianPosition(positions) {
    // Centre of array (not always integer)
    let centre = Math.floor(positions.length / 2);

    // Handle cases where positions array has even and odd length
    if (positions.length % 2 !== 0) {
      // Array has odd length, use middle value
      return positions[middle];
    } else {
      // Array has even length, use mean of two central positions
      return (positions[centre] + positions[centre - 1]) / 2;
    }
  }

  // Puzzle 1
  function puzzle1() {
    let median = medianPosition(parsedInput);
    let distancesToMedian = parsedInput.map((el) => Math.abs(el - median));
    let fuelConsumption = distancesToMedian.reduce((a, b) => a + b);

    return fuelConsumption;
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
