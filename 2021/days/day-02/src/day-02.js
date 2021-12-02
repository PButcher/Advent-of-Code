(async function day02() {
  const input = await fetch("input/input.txt");
  const res = await input.text();

  // Puzzle 1
  function puzzle1() {
    const parsedInput = res.trim().split("\n");

    let horizontal = 0;
    let depth = 0;

    parsedInput.forEach((el) => {
      let instruction = el.split(" ");
      let direction = instruction[0];
      let magnitude = parseInt(instruction[1]);
      switch (direction) {
        case "forward":
          horizontal += magnitude;
          break;
        case "up":
          depth -= magnitude;
          break;
        case "down":
          depth += magnitude;
          break;
        default:
          throw new Error("Unknown instruction");
      }
    });

    return horizontal * depth;
  }

  // Puzzle 2
  function puzzle2() {
    const parsedInput = res.trim().split("\n");

    let aim = 0;
    let horizontal = 0;
    let depth = 0;

    parsedInput.forEach((el) => {
      let instruction = el.split(" ");
      let direction = instruction[0];
      let magnitude = parseInt(instruction[1]);
      switch (direction) {
        case "forward":
          horizontal += magnitude;
          depth += aim * magnitude;
          break;
        case "up":
          aim -= magnitude;
          break;
        case "down":
          aim += magnitude;
          break;
        default:
          throw new Error("Unknown instruction");
      }
    });

    return horizontal * depth;
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
