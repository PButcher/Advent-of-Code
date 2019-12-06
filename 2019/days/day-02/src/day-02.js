(async function day02() {
  const input = await fetch("input/input.txt");
  const res = await input.text();

  // Puzzle 1
  function puzzle1() {
    let program = res
      .trim()
      .split(",")
      .map(i => parseInt(i));

    program[1] = 12;
    program[2] = 2;

    return runIntcode(program)[0];
  }

  function runIntcode(program) {
    const ADD = 1;
    const MULTIPLY = 2;
    const HALT = 99;

    for (let pos = 0; pos < program.length; pos += 4) {
      let operand1 = program[pos + 1];
      let operand2 = program[pos + 2];
      let store = program[pos + 3];

      switch (program[pos]) {
        case ADD:
          program[store] = program[operand1] + program[operand2];
          break;

        case MULTIPLY:
          program[store] = program[operand1] * program[operand2];
          break;

        case HALT:
          return program;

        default:
          throw new Error(`Unknown opcode ${program[pos]} at position ${pos}`);
      }
    }
    return program;
  }

  // Puzzle 1 Tests
  let inputs = [
    [1, 0, 0, 0, 99],
    [2, 3, 0, 3, 99],
    [2, 4, 4, 5, 99, 0],
    [1, 1, 1, 4, 99, 5, 6, 0, 99]
  ];

  let expectedOutputs = [
    [2, 0, 0, 0, 99],
    [2, 3, 0, 6, 99],
    [2, 4, 4, 5, 99, 9801],
    [30, 1, 1, 4, 2, 5, 6, 0, 99]
  ];

  inputs.forEach((input, i) =>
    console.assert(arraysEqual(runIntcode(input), expectedOutputs[i]))
  );

  function arraysEqual(a, b) {
    // https://stackoverflow.com/a/16436975

    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  // Puzzle 2
  function puzzle2() {
    let program = res
      .trim()
      .split(",")
      .map(i => parseInt(i));

    for (let noun = 0; noun <= 100; noun++) {
      for (let verb = 0; verb <= 100; verb++) {
        let newProgram = [...program];

        newProgram[1] = noun;
        newProgram[2] = verb;
        newProgram = runIntcode(newProgram);

        if (newProgram[0] === 19690720) return 100 * noun + verb;
      }
    }
  }

  // Run puzzles
  var puzzle1Answer = puzzle1();
  var puzzle2Answer = puzzle2();

  // Output puzzles
  document.getElementById("answer1").innerText = puzzle1Answer;
  document.getElementById("answer2").innerText = puzzle2Answer;
  console.log(`Day 02 Puzzle 1 Answer: ${puzzle1Answer}`);
  console.log(`Day 02 Puzzle 2 Answer: ${puzzle2Answer}`);
})();
