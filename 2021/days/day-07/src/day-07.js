(async function day07() {
  const input = await fetch("input/input.txt");
  const res = await input.text();
  const parsedInput = res
    .trim()
    .split(",")
    .map((el) => parseInt(el));

  // Calculate fuel for crab subs
  // System param:
  // - 1 for puzzle 1 (step 1 = 1 fuel, step 2 = 1 fuel...)
  // - 2 for puzzle 2 (step 1 = 1 fuel, step 2 = 2 fuel...)
  function calcCrabSubFuel(dist, system) {
    let fuel = 0;
    for (let unit = 0; unit <= dist; unit++) {
      if (system === 1) {
        fuel += 1;
      } else {
        fuel += unit;
      }
    }
    return fuel;
  }

  // Calculate crab alignment strategy
  function calcCrabAlignmentStrategy(system) {
    let crabs = [...parsedInput];

    let min = Math.min(...crabs);
    let max = Math.max(...crabs);

    // Position with lowest fuel consumption
    let bestConsumption = Infinity;

    // All possible positions
    for (let pos = min; pos <= max; pos++) {
      let totalFuelConsumption = 0;

      // All crabs
      for (let crab of crabs) {
        totalFuelConsumption += calcCrabSubFuel(Math.abs(pos - crab), system);
      }

      // Get position of lowest fuel consumption for all crabs
      if (totalFuelConsumption <= bestConsumption) {
        bestConsumption = totalFuelConsumption;
      }
    }

    return bestConsumption;
  }

  // Puzzle 1
  function puzzle1() {
    return calcCrabAlignmentStrategy(1);
  }

  // Puzzle 2
  function puzzle2() {
    return calcCrabAlignmentStrategy(2);
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
