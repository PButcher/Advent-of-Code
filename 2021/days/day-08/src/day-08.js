(async function day08() {
  const input = await fetch("input/input.txt");
  const res = await input.text();
  const parsedInput = res
    .trim()
    .split("\n")
    .map((el) => el.split(" | "));

  // Puzzle 1
  function puzzle1() {
    //                 1  4  7  8
    let knownDigits = [2, 4, 3, 7];
    let knownDigitsCount = 0;
    for (let digit of parsedInput) {
      let outputSegments = digit[1].split(" ");
      for (let segment of outputSegments) {
        if (knownDigits.includes(segment.length)) {
          knownDigitsCount++;
        }
      }
    }
    return knownDigitsCount;
  }

  // Puzzle 2
  function puzzle2() {
    /*

        0:      1:      2:      3:      4:
       aaaa    ....    aaaa    aaaa    ....
      b    c  .    c  .    c  .    c  b    c
      b    c  .    c  .    c  .    c  b    c
      ....    ....    dddd    dddd    dddd
      e    f  .    f  e    .  .    f  .    f
      e    f  .    f  e    .  .    f  .    f
       gggg    ....    gggg    gggg    ....

        5:      6:      7:      8:      9:
       aaaa    aaaa    aaaa    aaaa    aaaa
      b    .  b    .  .    c  b    c  b    c
      b    .  b    .  .    c  b    c  b    c
       dddd    dddd    ....    dddd    dddd
      .    f  e    f  .    f  e    f  .    f
      .    f  e    f  .    f  e    f  .    f
       gggg    gggg    ....    gggg    gggg

    */

    /*

      Deductions:

      2 segs = 1    c, f 
      3 segs = 7    a, c, f
      4 segs = 4    b, c, d, f
                      
                             v  v                  v     v                                   | 3: c and f are present in 1
      5 segs = 2    a, c, d, e, g          3    a, c, d, f, g       5    a, b, d, f, g       | 2: e and g are not present in 1, 7, 4

                    v     v     v                  v  v  v  v                                | 9: b, c, d, f are in 4
      6 segs = 0    a, b, c, e, f, g       9    a, b, c, d, f, g    6    a, b, d, e, f, g    | 0: a, c and f are in 7
      7 segs = 8    a, b, c, d, e, f, g
    */

    console.log(parsedInput);

    let sumOfOutputs = 0;

    // Display digits
    for (let display of parsedInput) {
      let deducedDigits = [];
      let inputDigits = display[0].split(" ");
      let outputDigits = display[1].split(" ");

      // Known digits
      for (let digit of inputDigits) {
        // 1
        if (digit.length === 2) deducedDigits[1] = digit;
        // 4
        if (digit.length === 4) deducedDigits[4] = digit;
        // 7
        if (digit.length === 3) deducedDigits[7] = digit;
        // 8
        if (digit.length === 7) deducedDigits[8] = digit;
      }

      // Used in the check for 2
      let oneFourSevenSegs = Array.from(
        new Set(deducedDigits[1] + deducedDigits[4] + deducedDigits[7])
      );
      let twoCheckSegs = Array.from(deducedDigits[8]).filter(
        (seg) => !oneFourSevenSegs.includes(seg)
      );

      // Deduced digits
      for (let digit of inputDigits) {
        if (digit.length === 5) {
          // 2, 3, 5
          if (deducedDigits[1].split("").every((seg) => digit.includes(seg))) {
            // 3
            deducedDigits[3] = digit;
          } else if (twoCheckSegs.every((seg) => digit.includes(seg))) {
            // 2
            deducedDigits[2] = digit;
          } else {
            // 5
            deducedDigits[5] = digit;
          }
        } else if (digit.length === 6) {
          // 9, 0, 6

          if (deducedDigits[4].split("").every((seg) => digit.includes(seg))) {
            // 9
            deducedDigits[9] = digit;
          } else if (
            deducedDigits[7].split("").every((seg) => digit.includes(seg))
          ) {
            // 0
            deducedDigits[0] = digit;
          } else {
            // 6
            deducedDigits[6] = digit;
          }
        }
      }

      let outputDisplay = "";

      // Output digits
      for (let outputDigit of outputDigits) {
        for (let deducedDigit in deducedDigits) {
          if (
            deducedDigits[deducedDigit].length === outputDigit.length &&
            deducedDigits[deducedDigit]
              .split("")
              .every((seg) => outputDigit.includes(seg))
          ) {
            outputDisplay += deducedDigit;
          }
        }
      }

      sumOfOutputs += parseInt(outputDisplay);
    }
    return sumOfOutputs;
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
