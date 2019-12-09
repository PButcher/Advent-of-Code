(async function day01() {
  const input = await fetch("input/input.txt");
  const res = await input.text();

  // Puzzle 1
  function puzzle1() {
    return getShortestManhattanDistance(res);
  }

  function getShortestManhattanDistance(wires) {
    const WIRES = wires.trim().split("\n");
    const WIRE_1 = WIRES[0].split(",");
    const WIRE_2 = WIRES[1].split(",");
    const INTERSECTIONS = getIntersections(WIRE_1, WIRE_2);

    let currentClosest = Infinity;
    for (let i = 0; i < INTERSECTIONS.length; i++) {
      let ds = Math.abs(INTERSECTIONS[i].x) + Math.abs(INTERSECTIONS[i].y);
      if (ds < currentClosest) currentClosest = ds;
    }
    return currentClosest;
  }

  function getIntersections(wire1, wire2) {
    const WIRE_1_LINES = getLines(getVertices(wire1));
    const WIRE_2_LINES = getLines(getVertices(wire2));
    let intersections = [];
    WIRE_1_LINES.forEach((line1, i) => {
      WIRE_2_LINES.forEach((line2, j) => {
        if (
          !(
            (line1.x1 === line1.x2 && line2.x1 === line2.x2) ||
            (line1.y1 === line1.y2 && line2.y1 === line2.y2)
          )
        ) {
          let vert = line1.x1 === line1.x2 ? line1 : line2;
          let horz = line1.x1 === line1.x2 ? line2 : line1;
          if (
            vert.x1 > Math.min(horz.x1, horz.x2) &&
            vert.x1 < Math.max(horz.x1, horz.x2) &&
            horz.y1 > Math.min(vert.y1, vert.y2) &&
            horz.y1 < Math.max(vert.y1, vert.y2)
          ) {
            intersections.push({
              id: intersections.length,
              x: vert.x1,
              y: horz.y1,
              lw1: i,
              lw2: j
            });
          }
        }
      });
    });
    return intersections;
  }

  function getVertices(wire) {
    let wireLengths = wire.map(el => parseInt(el.slice(1, el.length)));
    let wireDirections = wire.map(el => el[0]);
    let currentX = 0;
    let currentY = 0;

    return wireLengths.map((el, i) => {
      switch (wireDirections[i]) {
        case "U":
          currentY += el;
          break;
        case "R":
          currentX += el;
          break;
        case "D":
          currentY -= el;
          break;
        case "L":
          currentX -= el;
          break;
        default:
          throw new Error(`Unknown direction ${wireDirections[i]}`);
      }
      return { x: currentX, y: currentY };
    });
  }

  function getLines(vertices) {
    return vertices.map((el, i) => ({
      x1: i === 0 ? 0 : vertices[i - 1].x,
      y1: i === 0 ? 0 : vertices[i - 1].y,
      x2: el.x,
      y2: el.y
    }));
  }

  // Puzzle 1 Tests
  console.assert(
    getShortestManhattanDistance(
      `R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83`
    ) === 159
  );
  console.assert(
    getShortestManhattanDistance(
      `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7`
    ) === 135
  );

  // Puzzle 2
  function puzzle2() {
    return getFewestCombinedSteps(res);
  }

  function getFewestCombinedSteps(wires) {
    const WIRES = wires.trim().split("\n");
    const WIRE_1 = WIRES[0].split(",");
    const WIRE_2 = WIRES[1].split(",");
    const INTERSECTIONS = getIntersections(WIRE_1, WIRE_2);
    const WIRE_1_LINES = getLines(getVertices(WIRE_1));
    const WIRE_2_LINES = getLines(getVertices(WIRE_2));
    const WIRE_1_DIRECTIONS = WIRE_1.map(el => el[0]);
    const WIRE_2_DIRECTIONS = WIRE_2.map(el => el[0]);
    const WIRE_1_LENGTHS = WIRE_1.map(el => parseInt(el.slice(1, el.length)));
    const WIRE_2_LENGTHS = WIRE_2.map(el => parseInt(el.slice(1, el.length)));

    let wire1CurrentDsToNextIntersection = 0;
    let wire2CurrentDsToNextIntersection = 0;
    let wire1IntersectionSteps = [];
    let wire2IntersectionSteps = [];

    WIRE_1_LINES.forEach((el, i) => {
      let steps = 0;
      for (let j = 0; j < INTERSECTIONS.length; j++) {
        let { lw1, lw2 } = INTERSECTIONS[j];
        if (i === lw1) {
          let intersector = null;
          switch (WIRE_1_DIRECTIONS[i]) {
            case "U":
              intersector = WIRE_2_LINES[lw2].y1;
              steps = Math.abs(Math.min(el.y1, el.y2) - intersector);
              break;
            case "R":
              intersector = WIRE_2_LINES[lw2].x1;
              steps = Math.abs(Math.min(el.x1, el.x2) - intersector);
              break;
            case "D":
              intersector = WIRE_2_LINES[lw2].y2;
              steps = Math.abs(Math.max(el.y1, el.y2) - intersector);
              break;
            case "L":
              intersector = WIRE_2_LINES[lw2].x2;
              steps = Math.abs(Math.max(el.x1, el.x2) - intersector);
              break;
            default:
              throw new Error(`Unknown direction ${WIRE_1_DIRECTIONS[i]}`);
          }
          wire1IntersectionSteps.push(wire1CurrentDsToNextIntersection + steps);
        }
      }
      wire1CurrentDsToNextIntersection += WIRE_1_LENGTHS[i];
    });

    WIRE_2_LINES.forEach((el, i) => {
      let steps = 0;
      for (let j = 0; j < INTERSECTIONS.length; j++) {
        let { lw1, lw2 } = INTERSECTIONS[j];
        if (i === lw2) {
          let intersector = 0;
          switch (WIRE_2_DIRECTIONS[i]) {
            case "U":
              intersector = WIRE_1_LINES[lw1].y1;
              steps = Math.abs(Math.min(el.y1, el.y2) - intersector);
              break;
            case "R":
              intersector = WIRE_1_LINES[lw1].x1;
              steps = Math.abs(Math.min(el.x1, el.x2) - intersector);
              break;
            case "D":
              intersector = WIRE_1_LINES[lw1].y2;
              steps = Math.abs(Math.max(el.y1, el.y2) - intersector);
              break;
            case "L":
              intersector = WIRE_1_LINES[lw1].x2;
              steps = Math.abs(Math.max(el.x1, el.x2) - intersector);
              break;
            default:
              throw new Error(`Unknown direction ${WIRE_2_DIRECTIONS[i]}`);
          }
          wire2IntersectionSteps.push(wire2CurrentDsToNextIntersection + steps);
        }
      }
      wire2CurrentDsToNextIntersection += WIRE_2_LENGTHS[i];
    });

    const INTERSECTIONS_LW2 = [...INTERSECTIONS].sort((a, b) => a.lw2 - b.lw2);
    let combinedDistances = INTERSECTIONS_LW2.map(
      (el, i) => wire2IntersectionSteps[i] + wire1IntersectionSteps[el.id]
    );

    return combinedDistances.sort((a, b) => a - b)[0];
  }

  // Puzzle 2 Tests

  console.assert(getFewestCombinedSteps(`R8,U5,L5,D3\nU7,R6,D4,L4`) === 30);

  console.assert(
    getFewestCombinedSteps(
      `R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83`
    ) === 610
  );

  console.assert(
    getFewestCombinedSteps(
      `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7`
    ) === 410
  );

  // Run puzzles
  var puzzle1Answer = puzzle1();
  var puzzle2Answer = puzzle2();

  // Output puzzles
  document.getElementById("answer1").innerText = puzzle1Answer;
  document.getElementById("answer2").innerText = puzzle2Answer;
  console.log(`Day 03 Puzzle 1 Answer: ${puzzle1Answer}`);
  console.log(`Day 03 Puzzle 2 Answer: ${puzzle2Answer}`);
})();
