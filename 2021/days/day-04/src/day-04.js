(async function day04() {
  const input = await fetch("input/input.txt");
  const res = await input.text();
  const parsedInput = res.trim().split("\n");

  const mark = "X";

  function getDrawOrder() {
    return parsedInput[0].split(",").map((el) => parseInt(el));
  }

  function getBoards() {
    const boardCount = (parsedInput.length - 1) / 6;
    let boards = [];
    for (let i = 0; i < boardCount; i++) {
      let board = [];
      for (let j = 0; j < 5; j++) {
        let rowIndex = 2 + i * 6 + j;
        board.push(
          parsedInput[rowIndex]
            .split(" ")
            .filter((el) => el !== "")
            .map((el) => parseInt(el))
        );
      }
      boards.push(board);
    }
    return boards;
  }

  // Solve a 5 x 5 bingo board
  function solveBoard(board, drawOrder) {
    let num;

    for (let draw = 0; draw < drawOrder.length; draw++) {
      num = drawOrder[draw];
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          if (board[row][col] === num) {
            board[row][col] = mark;
          }
        }
      }
      if (checkWin(board)) {
        const scoredBoard = scoreBoard(board, num);
        return { score: scoredBoard, lastNumber: num, wonOnDraw: draw };
      }
    }
    return { score: 0, lastNumber: num };
  }

  // Check a 5 x 5 bingo board for a win
  function checkWin(board) {
    // Check rows
    for (let row = 0; row < 5; row++) {
      let marksOnRow = 0;
      for (let col = 0; col < 5; col++) {
        if (board[row][col] === mark) marksOnRow++;
      }
      if (marksOnRow === 5) return true;
    }

    // Check cols
    for (let col = 0; col < 5; col++) {
      let marksOnCol = 0;
      for (let row = 0; row < 5; row++) {
        if (board[col][row] === mark) marksOnCol++;
      }
      if (marksOnCol === 5) return true;
    }

    // No checks passed
    return false;
  }

  // Score a 5 x 5 bingo board
  function scoreBoard(board, lastNumber) {
    unmarkedTotal = 0;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (board[row][col] !== mark) unmarkedTotal += board[row][col];
      }
    }
    return unmarkedTotal * lastNumber;
  }

  function solveAllBoards() {
    const boards = getBoards();
    const drawOrder = getDrawOrder();

    const solvedBoards = [];

    for (let board = 0; board < boards.length; board++) {
      solvedBoards.push(solveBoard(boards[board], drawOrder));
    }

    return solvedBoards;
  }

  function getBestBoardScore() {
    const boards = getBoards();
    const solvedBoards = solveAllBoards();

    let bestScore;
    let bestBoard = 100;

    for (let board = 0; board < boards.length; board++) {
      if (solvedBoards[board].wonOnDraw < bestBoard) {
        bestBoard = solvedBoards[board].wonOnDraw;
        bestScore = solvedBoards[board].score;
      }
    }

    return bestScore;
  }

  function getWorstBoardScore() {
    const boards = getBoards();
    const solvedBoards = solveAllBoards();

    let worstScore;
    let worstBoard = 0;
    for (let board = 0; board < boards.length; board++) {
      if (solvedBoards[board].wonOnDraw > worstBoard) {
        worstBoard = solvedBoards[board].wonOnDraw;
        worstScore = solvedBoards[board].score;
      }
    }

    console.log(solvedBoards);

    return worstScore;
  }

  // Puzzle 1
  function puzzle1() {
    return getBestBoardScore();
  }

  // Puzzle 2
  function puzzle2() {
    return getWorstBoardScore();
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
