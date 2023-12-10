// Advent of Code 2023 - Day 5

(async function day04() {
  const input = await fetch("./input.txt");
  const res = await input.text();

  enum map {
    seeds = 0,
    seedToSoil = 1,
    soilToFertilizer = 2,
    fertilizerToWater = 3,
    waterToLight = 4,
    lightToTemperature = 5,
    temperatureToHumidity = 6,
    humidityToLocation = 7,
  }

  function parseSeeds(s: string) {
    return s
      .split(": ")[1]
      .split(" ")
      .map((el) => parseInt(el));
  }

  function parseMap(m: string) {
    return m
      .split(":\n")[1]
      .split("\n")
      .map((el) => el.split(" ").map((el) => parseInt(el)));
  }

  const maps = res.trim().split("\n\n");
  const seeds = parseSeeds(maps[map.seeds]);
  const seedToSoilMap = parseMap(maps[map.seedToSoil]);
  const soilToFertilizerMap = parseMap(maps[map.soilToFertilizer]);
  const fertilizerToWaterMap = parseMap(maps[map.fertilizerToWater]);
  const waterToLightMap = parseMap(maps[map.waterToLight]);
  const lightToTemperatureMap = parseMap(maps[map.lightToTemperature]);
  const temperatureToHumidityMap = parseMap(maps[map.temperatureToHumidity]);
  const humidtyToLocationMap = parseMap(maps[map.humidityToLocation]);

  function generateMapTable(s: number, m: number[][]) {
    let rtn = -1;
    for (let i = 0; i < m.length; i++) {
      const [dest, src, range] = m[i];
      if (s >= src && s <= src + range - 1) {
        rtn = dest + Math.abs(src - s);
      }
    }
    return rtn >= 0 ? rtn : s;
  }

  function generateSeedRanges() {
    let starts = [];
    let ends = [];

    // Generate start and end range arrays
    for (let i = 0; i < seeds.length; i++) {
      i % 2 === 0 ? starts.push(seeds[i]) : ends.push(seeds[i]);
    }

    return [starts, ends];
  }

  // Puzzle 1
  function puzzle1(): string {
    const locations: number[] = [];

    for (let i = 0; i < seeds.length; i++) {
      let soil = generateMapTable(seeds[i], seedToSoilMap);
      let fertilizer = generateMapTable(soil, soilToFertilizerMap);
      let water = generateMapTable(fertilizer, fertilizerToWaterMap);
      let light = generateMapTable(water, waterToLightMap);
      let temperature = generateMapTable(light, lightToTemperatureMap);
      let humidity = generateMapTable(temperature, temperatureToHumidityMap);
      let location = generateMapTable(humidity, humidtyToLocationMap);

      locations.push(location);
    }

    return Math.min(...locations).toString();
  }

  // Puzzle 2
  function puzzle2(): string {
    // BRUTE FORCE APPROACH
    // const [starts, ends] = generateSeedRanges();
    // console.log(starts, ends);

    // // const locations: number[] = [];
    // let minLocation = Infinity;

    // for (let s = 0; s < starts.length; s++) {
    //   for (let e = starts[s]; e <= starts[s] + ends[s] - 1; e++) {
    //     for (let i = 0; i < seeds.length; i++) {
    //       let soil = generateMapTable(e, seedToSoilMap);
    //       let fertilizer = generateMapTable(soil, soilToFertilizerMap);
    //       let water = generateMapTable(fertilizer, fertilizerToWaterMap);
    //       let light = generateMapTable(water, waterToLightMap);
    //       let temperature = generateMapTable(light, lightToTemperatureMap);
    //       let humidity = generateMapTable(
    //         temperature,
    //         temperatureToHumidityMap
    //       );
    //       let location = generateMapTable(humidity, humidtyToLocationMap);

    //       // locations.push(location);
    //       if (location < minLocation) minLocation = location;
    //     }
    //   }
    // }

    // // console.log(locations);

    // // return Math.min(...locations).toString();
    // return minLocation.toString();
    return `\n${res}`;
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
  // console.log(`Day 05 Puzzle 1 Answer: ${puzzle1Answer}`);
  // console.log(`Day 05 Puzzle 2 Answer: ${puzzle2Answer}`);
})();
