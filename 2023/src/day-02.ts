// Advent of Code 2023 - Day 2

(async function day02() {
  const input = await fetch("./input.txt");
  const res = await input.text();
  const lines = res.trim().split("\n");

  function parseGames() {
    const games = lines.map((line, i) => {
      let [gameString, cubesString] = line.split(": ");
      let game = gameString.split(" ")[1];
      let sets = cubesString.split("; ").map((set) => set.split(", "));

      let hands = sets.map((set, i) => {
        let hand: {
          [key: string]: string;
        } = {};
        set.map((h) => h.split(" ")).forEach((h) => (hand[h[1]] = h[0]));
        return hand;
      });

      return {
        game,
        hands,
      };
    });

    return games;
  }

  // Puzzle 1
  function puzzle1(): string {
    let games = parseGames();

    let possibleGames = [];

    // inputs
    const HIGHEST_RED = 12;
    const HIGHEST_GREEN = 13;
    const HIGHEST_BLUE = 14;

    for (let i = 0; i < games.length; i++) {
      let pass = true;

      for (let j = 0; j < games[i].hands.length; j++) {
        let handPasses = true;
        let hand = games[i].hands[j];
        if (hand.red && parseInt(hand.red) > HIGHEST_RED) handPasses = false;
        if (hand.green && parseInt(hand.green) > HIGHEST_GREEN)
          handPasses = false;
        if (hand.blue && parseInt(hand.blue) > HIGHEST_BLUE) handPasses = false;

        if (!handPasses) {
          pass = false;
          break;
        }
      }

      if (pass) possibleGames.push(parseInt(games[i].game));
    }

    return possibleGames.reduce((a, b) => a + b).toString();
  }

  // Puzzle 2
  function puzzle2(): string {
    let powers = [];

    let games = parseGames();

    for (let i = 0; i < games.length; i++) {
      let maxRed = 0;
      let maxGreen = 0;
      let maxBlue = 0;
      for (let j = 0; j < games[i].hands.length; j++) {
        let hand = games[i].hands[j];
        if (hand.red && parseInt(hand.red) > maxRed)
          maxRed = parseInt(hand.red);
        if (hand.green && parseInt(hand.green) > maxGreen)
          maxGreen = parseInt(hand.green);
        if (hand.blue && parseInt(hand.blue) > maxBlue)
          maxBlue = parseInt(hand.blue);
      }

      let power = maxRed * maxGreen * maxBlue;
      powers.push(power);
    }

    return powers.reduce((a, b) => a + b).toString();
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
  console.log(`Day 02 Puzzle 1 Answer: ${puzzle1Answer}`);
  console.log(`Day 02 Puzzle 2 Answer: ${puzzle2Answer}`);
})();
