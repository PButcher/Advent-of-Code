(async function day10() {
  const input = await fetch("input/input.txt");
  const res = await input.text();
  const parsedInput = res.trim().split("\n");

  // Puzzle 1
  function puzzle1() {
    console.log(parsedInput);

    let legalPairs = {
      "(": ")",
      "[": "]",
      "{": "}",
      "<": ">",
    };

    let points = {
      ")": 3,
      "]": 57,
      "}": 1197,
      ">": 25137,
    };

    let syntaxErrorScore = 0;

    for (let line of parsedInput) {
      let stack = [];
      for (let i = 0; i < line.length; i++) {
        if (line[i] in legalPairs) {
          stack.push(line[i]);
        } else if (line[i] === legalPairs[stack[stack.length - 1]]) {
          stack.pop();
        } else {
          syntaxErrorScore += points[line[i]];
          break;
        }
      }
      stack = [];
    }

    return syntaxErrorScore;
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
