// Advent of Code 2023 - Day 7

(async function day07() {
  const input = await fetch("./example.txt");
  const res = await input.text();
  const lines = res.trim().split("\n");

  const HAND_TYPES: { [key: string]: number } = {
    FIVE_OF_A_KIND: 7,
    FOUR_OF_A_KIND: 6,
    FULL_HOUSE: 5,
    THREE_OF_A_KIND: 4,
    TWO_PAIR: 3,
    ONE_PAIR: 2,
    HIGH_CARD: 1,
  };

  const cardStrengths: { [key: string]: number } = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
  };

  const cardStrengthsWithJoker: { [key: string]: number } = {
    A: 14,
    K: 13,
    Q: 12,
    T: 11,
    "9": 10,
    "8": 9,
    "7": 8,
    "6": 7,
    "5": 6,
    "4": 5,
    "3": 4,
    "2": 3,
    J: 2,
  };

  function countUniqueCards(h: string[]) {
    const counts: { [key: string]: number } = {};
    for (let card of h) {
      counts[card] = (counts[card] || 0) + 1;
    }
    return Object.keys(counts).map((el) => counts[el]);
  }

  function countUniqueCardsWithFace(h: string[]) {
    const counts: { [key: string]: number } = {};
    for (let card of h) {
      counts[card] = (counts[card] || 0) + 1;
    }
    return Object.keys(counts).sort(
      (a, b) => Object.keys(a)[a] - Object.keys(a)[b]
    );
  }

  console.log(countUniqueCardsWithFace(["Q", "Q", "Q", "Q", "2"]));

  function parseCamelHand(hand: string) {
    const h = Array.from(hand);
    let handType = -1;

    const uniqueCards = countUniqueCards(h);
    const uniqueCardsCount = uniqueCards.length;

    // If card contains one or more duplicates
    if (uniqueCardsCount !== h.length) {
      // One duplicate
      if (uniqueCardsCount === 1) {
        // 7: Five of a kind
        handType = HAND_TYPES.FIVE_OF_A_KIND;
      }
      // Two duplicates:
      else if (uniqueCardsCount === 2) {
        // [4, 1] or [1, 4]
        if (uniqueCards.includes(1)) {
          // 2: Four of a kind
          handType = HAND_TYPES.FOUR_OF_A_KIND;
        }
        // [3, 2] or [2, 3]
        else {
          // 3: Full house
          handType = HAND_TYPES.FULL_HOUSE;
        }
      }
      // Three duplicates:
      else if (uniqueCardsCount === 3) {
        // [3, 1, 1]
        if (uniqueCards.includes(3)) {
          // 4: Three of a kind
          handType = HAND_TYPES.THREE_OF_A_KIND;
        }
        // [2, 2, 1]
        else {
          // 5: Two pair
          handType = HAND_TYPES.TWO_PAIR;
        }
      }
      // Four duplicates:
      else {
        // 6: One pair
        handType = HAND_TYPES.ONE_PAIR;
      }
    }
    // 7: High Card
    else {
      handType = HAND_TYPES.HIGH_CARD;
    }

    return handType;
  }

  function customSort(a: any, b: any): number {
    if (a.handType === b.handType) {
      for (let card in a.hand) {
        const aStrength = a.handStrength[card];
        const bStrength = b.handStrength[card];
        if (aStrength > bStrength) {
          return 1;
        } else if (aStrength < bStrength) {
          return -1;
        }
      }
      return 0;
    } else {
      return a.handType - b.handType;
    }
  }

  // Puzzle 1
  function puzzle1(): string {
    const hands = [];
    const bets = [];
    const handTypes = [];

    for (let line of lines) {
      let l = line.split(" ");
      hands.push(l[0]);
      bets.push(l[1]);
    }

    for (let hand in hands) {
      handTypes.push(parseCamelHand(hands[hand]));
    }

    const handsWithTypes = [];

    for (let hand in hands) {
      handsWithTypes.push({
        hand: hands[hand],
        bet: bets[hand],
        handType: handTypes[hand],
        handStrength: Array.from(hands[hand]).map(
          (el) => cardStrengths[el.toString()]
        ),
      });
    }

    const sorted = [...handsWithTypes]
      .sort((a, b) => b.handType - a.handType)
      .sort(customSort);

    return sorted
      .map((el, i) => parseInt(el.bet) * (i + 1))
      .reduce((a, b) => a + b)
      .toString();
  }

  // Puzzle 2
  function puzzle2(): string {
    const hands = [];
    const bets = [];
    const handTypes = [];

    for (let line of lines) {
      let l = line.split(" ");
      hands.push(l[0]);
      bets.push(l[1]);
    }

    // TODO:
    // 1) Find the highest face value of the most frequent card in a hand
    // 2) Use this value as J

    // Pre-parse step
    const handsWithJokers = [];
    for (let hand of [...hands]) {
      // let highestCard = "1";
      // let highestCardStrength = 0;
      for (let card in Array.from(hand)) {
        // if (cardStrengths[hand[card]] > highestCardStrength) {
        // highestCardStrength = cardStrengths[hand[card]];
        // highestCard = hand[card];
        // }
      }

      // handsWithJokers.push(hand.split("J").join(highestCard));
    }

    // console.log(handsWithJokers);

    for (let hand in hands) {
      handTypes.push(parseCamelHand(hands[hand]));
    }

    const handsWithTypes = [];

    for (let hand in hands) {
      handsWithTypes.push({
        hand: hands[hand],
        bet: bets[hand],
        handType: handTypes[hand],
        handStrength: Array.from(hands[hand]).map(
          (el) => cardStrengths[el.toString()]
        ),
      });
    }

    const sorted = [...handsWithTypes]
      .sort((a, b) => b.handType - a.handType)
      .sort(customSort);

    return sorted
      .map((el, i) => parseInt(el.bet) * (i + 1))
      .reduce((a, b) => a + b)
      .toString();

    // return `\n${res}`;
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
  console.log(`Day 07 Puzzle 1 Answer: ${puzzle1Answer}`);
  // console.log(`Day 07 Puzzle 2 Answer: ${puzzle2Answer}`);
})();
