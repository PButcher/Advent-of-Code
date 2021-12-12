(async function day10() {
  const input = await fetch("input/input.txt");
  const res = await input.text();
  const parsedInput = res
    .trim()
    .split("\n")
    .map((el) => Array.from(el));

  let hmap = [...parsedInput];

  function neighbourhoodSearch() {
    let lowPoints = [];
    let lowPointCoords = [];
    for (let row = 0; row < parsedInput.length; row++) {
      for (let col = 0; col < parsedInput[0].length; col++) {
        // Local neighbourhood of point
        let neighbourhood = [];

        // Centre
        let centre = hmap[row][col];
        // Top
        if (hmap[row - 1]?.[col]) neighbourhood.push(hmap[row - 1][col]);
        // Right
        if (hmap[row]?.[col + 1]) neighbourhood.push(hmap[row][col + 1]);
        // Bottom
        if (hmap[row + 1]?.[col]) neighbourhood.push(hmap[row + 1][col]);
        // Left
        if (hmap[row]?.[col - 1]) neighbourhood.push(hmap[row][col - 1]);

        // Check if centre is lowest of neighbours
        if (!neighbourhood.some((neighbour) => neighbour <= centre)) {
          lowPoints.push(parseInt(centre));
          lowPointCoords.push([parseInt(row), parseInt(col)]);
        }
      }
    }
    return { lowPoints, lowPointCoords };
  }

  let { lowPoints, lowPointCoords } = neighbourhoodSearch();

  // Puzzle 1
  function puzzle1() {
    // Add 1 to every low point and sum
    let sumOfRiskLevels = lowPoints.reduce((a, b) => a + b) + lowPoints.length;

    return sumOfRiskLevels;
  }

  // Get basin sizes as array (recursive)
  function fillBasin(point) {
    // Row
    let row = point[0];
    // Col
    let col = point[1];

    // Point is not a 9 (boundary), or -1 (already searched)
    if (
      // Top
      row >= 0 &&
      // Bottom
      row < hmap.length &&
      // Left
      col >= 0 &&
      // Right
      col < hmap[row].length &&
      // Max height
      hmap[row][col] < 9 &&
      // Min height
      hmap[row][col] >= 0
    ) {
      // Mark this point as searched
      hmap[row][col] = -1;

      // Neighbourhood
      let above = fillBasin([row - 1, col]);
      let below = fillBasin([row + 1, col]);
      let right = fillBasin([row, col + 1]);
      let left = fillBasin([row, col - 1]);

      return above + below + right + left + 1;
    } else {
      return 0;
    }
  }

  // Puzzle 2
  function puzzle2() {
    let basinSizes = lowPointCoords.map(fillBasin);

    let threeLargestBasins = basinSizes
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a * b, 1);

    return threeLargestBasins;
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
