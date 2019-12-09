(async function day04() {
  const input = await fetch("input/input.txt");
  const res = await input.text();

  // Puzzle 1
  function puzzle1() {
    const range = res.split("-");
    const rangeLower = range[0];
    const rangeUpper = range[1];

    return bruteForce(rangeLower, rangeUpper);
  }

  function passwordChecker(p) {
    p = p.toString();
    return checkLength(p) && checkAscending(p) && checkDoubleDigits(p);
  }

  function checkLength(p) {
    return p.length == 6;
  }

  function checkAscending(p) {
    let valid = true;
    for (let i = 0; i < p.length - 1; i++) {
      valid = valid && p[i] <= p[i + 1];
    }
    return valid;
  }

  function checkDoubleDigits(p) {
    let valid = false;
    for (let i = 0; i < p.length - 1; i++) {
      valid = valid || p[i] == p[i + 1];
    }
    return valid;
  }

  function bruteForce(lower, upper, strict = false) {
    let valid = 0;
    for (let i = lower; i <= upper; i++) {
      strict
        ? strictPasswordChecker(i)
          ? valid++
          : false
        : passwordChecker(i)
        ? valid++
        : false;
    }
    return valid;
  }

  // function passwordCheckerYucky(p) {
  //   p = p.toString();
  //   return p.length == 6
  //     ? p[0] == p[1] ||
  //       p[1] == p[2] ||
  //       p[2] == p[3] ||
  //       p[3] == p[4] ||
  //       p[4] == p[5]
  //       ? p[0] <= p[1] &&
  //         p[1] <= p[2] &&
  //         p[2] <= p[3] &&
  //         p[3] <= p[4] &&
  //         p[4] <= p[5]
  //       : false
  //     : false;
  // }

  // Puzzle 1 Tests
  console.assert(passwordChecker(111111));
  console.assert(!passwordChecker(223450));
  console.assert(!passwordChecker(123789));

  // Puzzle 2
  function puzzle2() {
    const range = res.split("-");
    const rangeLower = range[0];
    const rangeUpper = range[1];

    return bruteForce(rangeLower, rangeUpper, true);
  }

  function strictPasswordChecker(p) {
    p = p.toString();
    return checkLength(p) && checkAscending(p) && strictCheckDoubleDigits(p);
  }

  function strictCheckDoubleDigits(p) {
    let doubleDigits = [];
    for (let i = 0; i < p.length - 1; i++) {
      if (p[i] == p[i + 1]) doubleDigits.push(i);
    }
    return (
      doubleDigits
        .map(i => {
          if (
            (p[i - 1] == undefined || p[i - 1] != p[i]) &&
            (p[i + 2] == undefined || p[i + 2] != p[i])
          ) {
            return i;
          }
        })
        .filter(el => el != undefined).length > 0
    );
  }

  // Puzzle 2 Tests
  console.assert(strictCheckDoubleDigits("112233"));
  console.assert(!strictCheckDoubleDigits("123444"));
  console.assert(strictCheckDoubleDigits("111122"));

  // Run puzzles
  var puzzle1Answer = puzzle1();
  var puzzle2Answer = puzzle2();

  // Output puzzles
  document.getElementById("answer1").innerText = puzzle1Answer;
  document.getElementById("answer2").innerText = puzzle2Answer;
  console.log(`Day 03 Puzzle 1 Answer: ${puzzle1Answer}`);
  console.log(`Day 03 Puzzle 2 Answer: ${puzzle2Answer}`);
})();
