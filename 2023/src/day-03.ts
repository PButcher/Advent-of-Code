// Advent of Code 2023 - Day 3
function isSymbol(char: string) {
  return char !== "." && isNaN(parseInt(char)) && char !== undefined;
}

function isNumber(a: any) {
  return !isNaN(parseInt(a));
}

(async function day03() {
  const input = await fetch("./input.txt");
  const res = await input.text();
  const lines = res.trim().split("\n");

  // Puzzle 1
  function puzzle1(): string {
    // Part numbers on the whole engine
    const partNumbers = [];

    for (let line = 0; line < lines.length; line++) {
      // Part numbers on this line
      // const linePartNumbers = [];

      let potentialPartNumber = "";
      // <= because we need to do one extra loop to check for end of line
      for (let i = 0; i <= lines[line].length; i++) {
        const char = lines[line][i];

        if (isNumber(char)) {
          // Current index is a number
          // Write character to the potential part number buffer
          potentialPartNumber += char;
        } else if (potentialPartNumber.length !== 0) {
          // Current index is not a number and potential part number buffer is not blank
          let ppnSize = potentialPartNumber.length;
          // Kernal is formed of points around ppn
          const kernal = [];
          // 12
          // #3
          // 54
          kernal.push(
            lines?.[line - 1]?.[i - 1], // 1
            lines?.[line - 1]?.[i], // 2
            lines?.[line]?.[i], // 3
            lines?.[line + 1]?.[i], // 4
            lines?.[line + 1]?.[i - 1] // 5
          );

          //  1?
          // ###
          //  2?
          if (ppnSize > 2) {
            for (let s = 1; s <= ppnSize - 2; s++) {
              kernal.push(
                lines?.[line - 1]?.[i - 1 - s], // 1
                lines?.[line + 1]?.[i - 1 - s] // 2
              );
            }
          }

          // 21
          // 3#
          // 45
          kernal.push(
            lines?.[line - 1]?.[i - ppnSize], // 1
            lines?.[line - 1]?.[i - ppnSize - 1], // 2
            lines?.[line]?.[i - ppnSize - 1], // 3
            lines?.[line + 1]?.[i - ppnSize - 1], // 4
            lines?.[line + 1]?.[i - ppnSize] // 5
          );

          let isPpn = false;

          for (let j = 0; j < kernal.length; j++) {
            if (isSymbol(kernal[j])) {
              isPpn = true;
              break;
            }
          }

          if (isPpn) partNumbers.push(parseInt(potentialPartNumber));

          potentialPartNumber = "";
        }
      }
    }

    return partNumbers.reduce((a, b) => a + b).toString();
  }

  // Puzzle 2
  function puzzle2(): string {
    let gearRatios = [];

    // Look left (0) or right (1)
    function look(dir: number, line: number, i: number, s: string[] = []) {
      const char = lines?.[line]?.[i];
      if (isNumber(char)) {
        if (dir === 0) {
          // Left
          s.unshift(char.toString());
          look(0, line, i - 1, s);
        } else {
          // Right
          s.push(char.toString());
          look(1, line, i + 1, s);
        }
      } else {
        return s;
      }
      return s;
    }

    function gearSearch(line: number, i: number) {
      // Directions
      let up = lines?.[line - 1]?.[i];
      let diagUpRight = lines?.[line - 1]?.[i + 1];
      let right = lines?.[line]?.[i + 1];
      let diagDownRight = lines?.[line + 1]?.[i + 1];
      let down = lines?.[line + 1]?.[i];
      let diagDownLeft = lines?.[line + 1]?.[i - 1];
      let left = lines?.[line]?.[i - 1];
      let diagUpLeft = lines?.[line - 1]?.[i - 1];

      let gear = [];

      // Check up
      if (isNumber(up)) {
        let left = look(0, line - 1, i);
        let right = look(1, line - 1, i);
        gear.push(left.concat(right.slice(1)).join(""));
      } else {
        // Check diagonal up and right
        if (isNumber(diagUpRight)) {
          let left = look(0, line - 1, i + 1);
          let right = look(1, line - 1, i + 1);
          gear.push(left.concat(right.slice(1)).join(""));
        }
        // Check diagonal up and left
        if (isNumber(diagUpLeft)) {
          let left = look(0, line - 1, i - 1);
          let right = look(1, line - 1, i - 1);
          gear.push(left.concat(right.slice(1)).join(""));
        }
      }

      // Check right
      if (isNumber(right)) {
        let right = look(1, line, i + 1);
        gear.push(right.join(""));
      }
      // Check left
      if (isNumber(left)) {
        let left = look(0, line, i - 1);
        gear.push(left.join(""));
      }

      // Check down
      if (isNumber(down)) {
        let left = look(0, line + 1, i);
        let right = look(1, line + 1, i);
        gear.push(left.concat(right.slice(1)).join(""));
      } else {
        // Check diagonal down and right
        if (isNumber(diagDownRight)) {
          let left = look(0, line + 1, i + 1);
          let right = look(1, line + 1, i + 1);
          // gear.push(right.join(""));
          gear.push(left.concat(right.slice(1)).join(""));
        }
        // Check diagonal down and left
        if (isNumber(diagDownLeft)) {
          let left = look(0, line + 1, i - 1);
          let right = look(1, line + 1, i - 1);
          // gear.push(left.join(""));
          gear.push(left.concat(right.slice(1)).join(""));
        }
      }

      return gear.length == 2 && gear.map((el) => parseInt(el));
    }

    for (let line = 0; line < lines.length; line++) {
      for (let i = 0; i < lines[line].length; i++) {
        const char = lines[line][i];
        if (char === "*") {
          let search = gearSearch(line, i);
          if (search) gearRatios.push(search[0] * search[1]);
        }
      }
    }

    return gearRatios.reduce((a, b) => a + b).toString();
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
  console.log(`Day 01 Puzzle 1 Answer: ${puzzle1Answer}`);
  console.log(`Day 01 Puzzle 2 Answer: ${puzzle2Answer}`);
})();
