(async function day01() {
  const input = await fetch("input/input.txt");
  const res = await input.text();

  // Puzzle 1
  function puzzle1() {
    return res
      .trim()
      .split("\n")
      .map(calculateFuel)
      .reduce((a, b) => a + b);
  }

  function calculateFuel(m) {
    return ((m / 3) | 0) - 2;
  }

  // Puzzle 1 Tests
  console.assert(calculateFuel(12) === 2);
  console.assert(calculateFuel(14) === 2);
  console.assert(calculateFuel(1969) === 654);
  console.assert(calculateFuel(100756) === 33583);

  // Puzzle 2
  function puzzle2() {
    return res
      .trim()
      .split("\n")
      .map(calculateFuelRecursively)
      .reduce((a, b) => a + b);
  }

  function calculateFuelRecursively(m) {
    let f = calculateFuel(m);
    return f > 0 ? (f += calculateFuelRecursively(f)) : 0;
  }

  // Puzzle 2 Tests
  console.assert(calculateFuelRecursively(14) === 2);
  console.assert(calculateFuelRecursively(1969) === 966);
  console.assert(calculateFuelRecursively(100756) === 50346);

  // Run puzzles
  var puzzle1Answer = puzzle1();
  var puzzle2Answer = puzzle2();

  // Output puzzles
  document.getElementById("answer1").innerText = puzzle1Answer;
  document.getElementById("answer2").innerText = puzzle2Answer;
  console.log(`Day 01 Puzzle 1 Answer: ${puzzle1Answer}`);
  console.log(`Day 01 Puzzle 2 Answer: ${puzzle2Answer}`);
})();
