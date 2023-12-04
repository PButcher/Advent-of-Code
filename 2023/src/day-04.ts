// Advent of Code 2023 - Day 4

(async function day04() {
  const input = await fetch("./input.txt");
  const res = await input.text();
  const lines = res.trim().split("\n");

  // Puzzle 1
  function puzzle1(): string {
    let scores = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      let card = line.split(":")[1];
      let numbers = card.split("|");
      let yourNumbers = numbers[0].split(" ").filter((el) => el !== "");
      let winningNumbers = numbers[1].split(" ").filter((el) => el !== "");

      let matches = [];
      let score = 0;

      for (let j = 0; j < yourNumbers.length; j++) {
        if (winningNumbers.includes(yourNumbers[j])) {
          matches.push(yourNumbers[j]);
          if (matches.length === 1) {
            score = 1;
          } else {
            score = score * 2;
          }
        }
      }
      scores.push(score);
    }

    return scores.reduce((a, b) => a + b).toString();
  }

  // Puzzle 2
  function puzzle2(): string {
    let cards: any[] = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      let card = line.split(":")[1];
      let numbers = card.split("|");
      let yourNumbers = numbers[0].split(" ").filter((el) => el !== "");
      let winningNumbers = numbers[1].split(" ").filter((el) => el !== "");

      let matches = [];

      for (let j = 0; j < yourNumbers.length; j++) {
        if (winningNumbers.includes(yourNumbers[j])) {
          matches.push(yourNumbers[j]);
        }
      }
      cards.push({ card: i + 1, wins: matches.length, id: i });
    }

    let count = 0;

    function traverseCards(deck: any[]) {
      for (let i = 0; i < deck.length; i++) {
        let copiedCards: any[] = [];
        for (let j = 0; j < deck[i].wins; j++) {
          copiedCards.push(cards[deck[i].id + j + 1]);
          count++;
        }
        traverseCards([...copiedCards]);
      }
    }

    traverseCards([...cards]);

    return (count + lines.length).toString();
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
