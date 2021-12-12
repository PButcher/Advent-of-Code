(async function day10() {
  const input = await fetch("input/input.txt");
  const res = await input.text();
  const parsedInput = res.trim().split("\n");

  let legalPairs = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
  };

  let syntaxErrorPoints = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  let autoCompletePoints = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };

  // Puzzle 1
  function puzzle1() {
    let syntaxErrorScore = 0;

    let lines = [...parsedInput];

    for (let line of lines) {
      let stack = [];
      for (let i = 0; i < line.length; i++) {
        if (line[i] in legalPairs) {
          stack.push(line[i]);
        } else if (line[i] === legalPairs[stack[stack.length - 1]]) {
          stack.pop();
        } else {
          syntaxErrorScore += syntaxErrorPoints[line[i]];
          break;
        }
      }
      stack = [];
    }

    return syntaxErrorScore;
  }

  // Puzzle 2
  function puzzle2() {
    let lines = [...parsedInput];

    let closing = [];
    let scores = [];

    for (let line of lines) {
      let stack = [];
      let err = false;
      for (let i = 0; i < line.length; i++) {
        if (line[i] in legalPairs) {
          stack.push(line[i]);
          closing.push(legalPairs[line[i]]);
        } else if (line[i] === legalPairs[stack[stack.length - 1]]) {
          stack.pop();
          closing.pop();
        } else {
          err = true;
          break;
        }
      }
      if (!err) {
        closing.reverse();
        let score = 0;
        for (let tag of closing) {
          score = score * 5;
          score += autoCompletePoints[tag];
        }
        scores.push(score);
      }
      closing = [];
      stack = [];
    }

    return scores.sort((a, b) => b - a)[Math.floor(scores.length / 2)];
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
