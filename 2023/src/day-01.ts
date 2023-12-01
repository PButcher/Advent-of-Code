// Advent of Code 2023 - Day 1

(async function day01() {
  const input = await fetch("./input.txt");
  const res = await input.text();
  const lines = res.trim().split("\n");

  // Puzzle 1
  function puzzle1(): string {
    // Resolve calibration value from corrupted input
    function resolveCalibrationValues(line: string) {
      let first = null;
      let last = null;

      // Move forward through line
      for (let i = 0; i < line.length; i++) {
        const char = parseInt(line[i]);
        if (!isNaN(char)) {
          first = char;
          break;
        }
      }

      // Move backward through line
      for (let i = line.length - 1; i >= 0; i--) {
        const char = parseInt(line[i]);
        if (!isNaN(char)) {
          last = char;
          break;
        }
      }

      // Return calibration value
      return `${first}${last}`;
    }

    let sum = 0;

    for (let i = 0; i < lines.length; i++) {
      sum += parseInt(resolveCalibrationValues(lines[i]));
    }

    return sum.toString();
  }

  // Puzzle 2
  function puzzle2(): string {
    // Array fill character
    const ARRAY_FILL_CHAR = 0;

    // Dictionary
    const dictionary = [
      "one",
      "1",
      "two",
      "2",
      "three",
      "3",
      "four",
      "4",
      "five",
      "5",
      "six",
      "6",
      "seven",
      "7",
      "eight",
      "8",
      "nine",
      "9",
    ];

    // Resolve calibration value from corrupted input
    function resolveCalibrationValues(line: string, index: number) {
      const indicies = [];

      for (let i = 0; i < dictionary.length; i++) {
        // str = str.split(dictionary[i - 1]).join(`${i}`);

        // Blank out occurences of THIS number that are already found
        let tempLine = line;

        for (let j = 0; j < line.length; j++) {
          // Number exists in string at least once
          let numberInString = tempLine.indexOf(dictionary[i]) >= 0;

          if (numberInString) {
            const index = tempLine.indexOf(dictionary[i]);
            const numberText = dictionary[i];
            const number = Math.floor(i / 2) + 1;

            indicies.push({ index, numberText, number, unique: j });

            // Replace all characters in tempLine with a letter
            tempLine = tempLine.replace(
              numberText,
              new Array(numberText.length).fill(ARRAY_FILL_CHAR).join("")
            );
          } else {
            break;
          }
        }
      }

      // Sort by index
      indicies.sort((a, b) => a.index - b.index);
      console.log("---");
      console.log(`#${index + 1}`);
      console.log(line);
      console.log(indicies);
      console.log(
        `${indicies[0].number}${indicies[indicies.length - 1].number}`
      );

      return `${indicies[0].number}${indicies[indicies.length - 1].number}`;
    }

    let sum = 0;
    let testArray = [];
    let count = 0;

    for (let i = 0; i < lines.length; i++) {
      count++;
      let line = resolveCalibrationValues(lines[i], i);
      sum += parseInt(line);
      testArray.push(Number(line));
    }

    return sum.toString();
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
