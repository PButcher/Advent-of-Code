(async function day05() {
  const input = await fetch("input/input.txt");
  const res = await input.text();
  const parsedInput = res
    .trim()
    .split(",")
    .map((el) => parseInt(el));

  // Lantern fish population simulation
  function lanternFishSimulation(p, days) {
    const population = [...p];
    for (let day = 0; day < days; day++) {
      const populationSize = population.length;
      for (let fish = 0; fish < populationSize; fish++) {
        if (population[fish] === 0) {
          population[fish] = 6;
          population.push(8);
        } else {
          population[fish]--;
        }
      }
    }
    return population;
  }

  // Puzzle 1
  function puzzle1() {
    const population = parsedInput;
    return lanternFishSimulation(population, 80).length;
  }

  function getLanternFishAges(population, days) {
    // Store an array of age counts
    let ages = Array(9).fill(0);

    // Generate counts of each fish age
    for (let age = 0; age < population.length; age++) {
      ages[population[age]]++;
    }

    // Simulate days
    for (let day = 0; day < days; day++) {
      // Ages of fish after this cycle
      const agesThisCycle = [];

      // Shift age counts one to the left
      for (let age = 0; age < 8; age++) {
        agesThisCycle[age] = ages[age + 1];
      }

      // Add newborns
      agesThisCycle[8] = ages[0];

      // Reset parent ages
      agesThisCycle[6] += ages[0];

      ages = agesThisCycle;
    }
    return ages;
  }

  // Puzzle 2
  function puzzle2() {
    const population = parsedInput;

    const ages = getLanternFishAges(population, 256);

    return ages.reduce((a, b) => b + a, 0);
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
