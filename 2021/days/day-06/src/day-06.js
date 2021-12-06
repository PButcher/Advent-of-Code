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
