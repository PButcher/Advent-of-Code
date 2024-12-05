// Advent of Code 2024 - Day 4

(async () => {
  const day = "04";
  const input = await fetch("./input.txt");
  const res = await input.text();
  const lines = res.trim().split("\n");

  // Puzzle 1
  function puzzle1(): string {
    const targetWord = "XMAS";
    const targetWordArray = Array.from(targetWord);
    const m = lines[0].length;
    const n = lines.length;
    const directions = [];

    // Create directions array
    // [[-1, -1], [-1, 0], [-1, 1]
    //  [0, -1],           [0, 1],
    //  [1, -1],  [1, 0],  [1, 1]]
    const rangeVector = [-1, 0, 1];
    for (let dx of rangeVector) {
      for (let dy of rangeVector) {
        if (dx !== 0 || dy !== 0) directions.push([dx, dy]);
      }
    }

    function searchDirectionFromCoord(x: number, y: number, d: number[]) {
      const [dx, dy] = d;

      // Loop over all coordinates in a direction
      return (
        targetWordArray
          .map((letter, letterIndex) => {
            // Next coordinate along direction
            const x2 = x + letterIndex * dx;
            const y2 = y + letterIndex * dy;

            // Check coordinate is inside the search area
            if (!(x2 >= 0 && x2 < n && y2 >= 0 && y2 < m)) {
              return 0;
            }

            // If the coordinate is not the next letter
            else if (lines[x2][y2] !== letter) {
              return 0;
            }

            // Otherwise the checks pass
            else {
              return 1;
            }
          })
          .reduce((acc, v) => acc + v, 0) === 4
      );
    }

    let wordsFound = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        for (let d of directions) {
          wordsFound += searchDirectionFromCoord(i, j, d) ? 1 : 0;
        }
      }
    }
    return wordsFound.toString();
  }

  // Puzzle 2
  function puzzle2(): string {
    const m = lines[0].length;
    const n = lines.length;
    const targetLetter = "A";

    function searchDiagonalsFromCoord(i, j) {
      // Check coordinate is inside the search area from centre of cross
      if (!(i >= 1 && i < n - 1 && j >= 1 && j < m - 1)) {
        return 0;
      }
      // Return 0 if this cell isn't the centre of the cross
      else if (lines[i][j] !== targetLetter) {
        return 0;
      }

      const crossLetters = ["MS", "SM"];
      // M..     S..
      // .A.  or .A.
      // ..S     ..M
      const diagonal1 = `${lines[i - 1][j - 1]}${lines[i + 1][j + 1]}`;
      // ..M    ..S
      // .A. or .A.
      // S..    M..
      const diagonal2 = `${lines[i - 1][j + 1]}${lines[i + 1][j - 1]}`;

      if (
        crossLetters.includes(diagonal1) &&
        crossLetters.includes(diagonal2)
      ) {
        return true;
      } else {
        return false;
      }
    }

    let wordsFound = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        wordsFound += searchDiagonalsFromCoord(i, j) ? 1 : 0;
      }
    }

    return wordsFound.toString();
  }

  // Run puzzles
  const puzzle1Answer = puzzle1();
  const puzzle2Answer = puzzle2();

  // Output puzzles
  const puzzle1AnswerEl = document.getElementById("answer1");
  const puzzle2AnswerEl = document.getElementById("answer2");
  if (puzzle1AnswerEl) puzzle1AnswerEl.innerText = puzzle1Answer;
  if (puzzle2AnswerEl) puzzle2AnswerEl.innerText = puzzle2Answer;

  // Log puzzles
  console.log(`Day ${day} Puzzle 1 Answer: ${puzzle1Answer}`);
  console.log(`Day ${day} Puzzle 2 Answer: ${puzzle2Answer}`);
})();
