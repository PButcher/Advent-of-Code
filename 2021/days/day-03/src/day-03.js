(async function day03() {
  const input = await fetch("input/input.txt");
  const res = await input.text();

  // Power consumption
  function calculatePowerConsumption(report) {
    // Most common bit
    let gammaRate = [];

    // Least common bit
    let epsilonRate = [];

    // A count of bits per number
    let bits = new Array(report[0].length).fill(0);

    // Diagnostic report length
    const reportLength = report.length;

    report.forEach((row) => {
      Array.from(row).forEach((col, j) => {
        if (col === "1") bits[j]++;
      });
    });

    bits.forEach((el, i) => {
      if (reportLength - el <= el) {
        gammaRate[i] = 1;
        epsilonRate[i] = 0;
      } else {
        gammaRate[i] = 0;
        epsilonRate[i] = 1;
      }
    });

    const consumption =
      parseInt(gammaRate.join(""), 2) * parseInt(epsilonRate.join(""), 2);

    return { consumption, gammaRate, epsilonRate };
  }

  // Puzzle 1
  function puzzle1() {
    const parsedInput = res.trim().split("\n");
    return calculatePowerConsumption(parsedInput).consumption;
  }

  // Puzzle 2
  function puzzle2() {
    const parsedInput = res.trim().split("\n");
    const { gammaRate, epsilonRate } = calculatePowerConsumption(parsedInput);

    let oxygenGeneratorRating;
    let co2ScrubberRating;

    let OGRSelection = [...parsedInput];
    let CO2SSelection = [...parsedInput];

    for (let i = 0; i < gammaRate.length; i++) {
      let { gammaRate: newGammaRate } = calculatePowerConsumption(OGRSelection);

      OGRSelection = OGRSelection.filter(
        (row) => parseInt(row[i]) === newGammaRate[i]
      );

      if (OGRSelection.length === 1) {
        oxygenGeneratorRating = [...OGRSelection];
        break;
      }
    }

    for (let i = 0; i < epsilonRate.length; i++) {
      let { epsilonRate: newEpsilonRate } =
        calculatePowerConsumption(CO2SSelection);

      CO2SSelection = CO2SSelection.filter(
        (row) => parseInt(row[i]) === newEpsilonRate[i]
      );

      if (CO2SSelection.length === 1) {
        co2ScrubberRating = [...CO2SSelection];
        break;
      }
    }

    const lifeSupportRating =
      parseInt(oxygenGeneratorRating.join(""), 2) *
      parseInt(co2ScrubberRating.join(""), 2);

    return lifeSupportRating;
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
