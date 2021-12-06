(async function day05() {
  const input = await fetch("input/input.txt");
  const res = await input.text();
  const parsedInput = res.trim().split("\n");

  // Process input and return coordinate pairs
  function getCoordinatePairs() {
    const coordinatePairs = [];
    for (let line = 0; line < parsedInput.length; line++) {
      let rawCoords = parsedInput[line]
        .split(" -> ")
        .join(",")
        .split(",")
        .map((el) => parseInt(el));
      let coords = {
        x1: rawCoords[0],
        y1: rawCoords[1],
        x2: rawCoords[2],
        y2: rawCoords[3],
      };
      coordinatePairs.push(coords);
    }
    return coordinatePairs;
  }

  // Creates a . filled map
  function createMap(lines) {
    const maxX = Math.max(
      Math.max(...lines.map((el) => el.x1)),
      Math.max(...lines.map((el) => el.y1))
    );
    const maxY = Math.max(
      Math.max(...lines.map((el) => el.x2)),
      Math.max(...lines.map((el) => el.y2))
    );

    return Array(maxY + 1)
      .fill()
      .map(() => Array(maxX + 1).fill(0));
  }

  // Plots all lines on map
  function plotMap(lines) {
    const map = createMap(lines);
    for (let line = 0; line < lines.length; line++) {
      if (lines[line].x1 === lines[line].x2) {
        // Vertical
        let start = Math.min(lines[line].y1, lines[line].y2);
        let lineLength = Math.abs(lines[line].y1 - lines[line].y2) + 1;

        for (let i = 0; i < lineLength; i++) {
          map[start + i][lines[line].x1]++;
        }
      } else if (lines[line].y1 === lines[line].y2) {
        // Horizontal
        let start = Math.min(lines[line].x1, lines[line].x2);
        let lineLength = Math.abs(lines[line].x1 - lines[line].x2) + 1;

        for (let i = 0; i < lineLength; i++) {
          map[lines[line].y1][start + i]++;
        }
      } else {
        // Diagonal
        let lineLength = Math.abs(lines[line].x1 - lines[line].x2) + 1;

        let xPos = lines[line].x2 - lines[line].x1 > 0;
        let yPos = lines[line].y2 - lines[line].y1 > 0;

        // ++
        if (xPos && yPos) {
          for (let i = 0; i < lineLength; i++) {
            map[lines[line].y1 + i][lines[line].x1 + i]++;
          }
        }

        // +-
        if (xPos && !yPos) {
          for (let i = 0; i < lineLength; i++) {
            map[lines[line].y1 - i][lines[line].x1 + i]++;
          }
        }

        // -+
        if (!xPos && yPos) {
          for (let i = 0; i < lineLength; i++) {
            map[lines[line].y2 - i][lines[line].x2 + i]++;
          }
        }

        // --
        if (!xPos && !yPos) {
          for (let i = 0; i < lineLength; i++) {
            map[lines[line].y1 - i][lines[line].x1 - i]++;
          }
        }
      }
    }
    return map;
  }

  // Count all occurences of a line point overlapping another
  function countOverlaps(map) {
    let count = 0;
    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[0].length; col++) {
        if (map[row][col] > 1) {
          count++;
        }
      }
    }
    return count;
  }

  // Visualize a map
  function visualizeMap(map) {
    mapString = "";
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        mapString += map[i][j];
      }
      mapString += "\n";
    }
    console.log(mapString);
  }

  // Puzzle 1
  function puzzle1() {
    const coordPairs = getCoordinatePairs();
    const pairsWithStraightLines = coordPairs.filter(
      (el) => el.x1 === el.x2 || el.y1 === el.y2
    );

    const map = plotMap(pairsWithStraightLines);

    return countOverlaps(map);
  }

  // Puzzle 2
  function puzzle2() {
    const coordPairs = getCoordinatePairs();
    const map = plotMap(coordPairs);

    return countOverlaps(map);
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
