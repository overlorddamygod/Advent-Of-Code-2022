const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, input) {
  if (err) {
    return console.log(err);
  }
  console.log(`Part 1: ${part1(input)}`);
  console.log(`Part 2: ${part2(input)}`);
});

const ROCK = "#";
const SAND = "o";
const AIR = ".";
const SOURCE = "+";
const SOURCE_COORDS = [500, 0];

const parseInput = (input) => {
  const paths = input
    .split("\n")
    .map((pair) => pair.split(" -> ").map((p) => p.split(",").map((a) => +a)));

  let minX = Infinity;
  let maxX = 0;

  let minY = Infinity;
  let maxY = 0;

  for (const path of paths) {
    for (const coords of path) {
      minX = Math.min(minX, coords[0]);
      maxX = Math.max(maxX, coords[0]);

      minY = Math.min(minY, coords[1]);
      maxY = Math.max(maxY, coords[1]);
    }
  }

  const map = Array.from({ length: maxY + 1 }, () =>
    Array.from({ length: maxX + 1 + 500 }, () => AIR)
  );

  for (const path of paths) {
    for (let i = 1; i < path.length; i++) {
      let [ax, ay] = path[i - 1];
      let [bx, by] = path[i];

      for (let j = Math.min(ax, bx); j < Math.max(ax, bx) + 1; j++) {
        map[ay][j] = ROCK;
      }
      for (let j = Math.min(ay, by); j < Math.max(ay, by) + 1; j++) {
        map[j][ax] = ROCK;
      }
    }
  }

  map[SOURCE_COORDS[1]][SOURCE_COORDS[0]] = SOURCE;
  return { map, minX, maxX };
};

// Part 1
const part1 = (input) => {
  let { map, minX, maxX } = parseInput(input);
  let unit = 0;

  const checkBound = (x, y) => {
    return x >= minX && x <= maxX && y >= 0 && y < map.length;
  };
  while (true) {
    let [x, y] = SOURCE_COORDS;
    map[y][x] = SAND;

    let running = true;

    while (running) {
      if (!checkBound(x, y + 1)) {
        running = false;
        break;
      }
      const down = map[y + 1][x];

      if (down == AIR) {
        y += 1;
      } else if (down == ROCK || down == SAND) {
        if (!checkBound(x - 1, y + 1)) {
          running = false;
          break;
        }
        const downLeft = map[y + 1][x - 1];
        if (downLeft == AIR) {
          y += 1;
          x -= 1;
        } else {
          if (!checkBound(x + 1, y + 1)) {
            running = false;
            break;
          }
          const downRight = map[y + 1][x + 1];

          if (downRight == AIR) {
            y += 1;
            x += 1;
          } else {
            break;
          }
        }
      }
    }

    if (!running) {
      break;
    }

    map[0][500 - minX] = SOURCE;
    map[y][x] = SAND;
    // printMap(map)
    unit++;
  }
  return unit;
};

// Part 2
const part2 = (input) => {
  let { map } = parseInput(input);

  map.push(Array.from({ length: map[0].length }, () => AIR));
  map.push(Array.from({ length: map[0].length }, () => ROCK));

  let unit = 0;
  while (true) {
    let [x, y] = SOURCE_COORDS;

    if (map[y][x] == SAND) {
      break;
    }

    map[y][x] = SAND;

    while (true) {
      const down = map[y + 1][x];

      if (down == AIR) {
        y += 1;
      } else if (down == ROCK || down == SAND) {
        const downLeft = map[y + 1][x - 1];
        if (downLeft == AIR) {
          y += 1;
          x -= 1;
        } else {
          const downRight = map[y + 1][x + 1];

          if (downRight == AIR) {
            y += 1;
            x += 1;
          } else {
            break;
          }
        }
      }
    }

    map[SOURCE_COORDS[1]][SOURCE_COORDS[0]] = SOURCE;
    map[y][x] = SAND;
    // console.log()
    // printMap(map)
    unit++;
  }
  // console.log()
  // printMap(map)
  return unit;
};

const printMap = (map) => {
  for (let i = 0; i < 12; i++) {
    let output = "";
    for (let j = 490; j < 508; j++) {
      output += map[i][j];
    }
    console.log(output);
  }
  // for (const row of map) {
  //   let output = "";
  //   for (const col of row) {
  //     output += col;
  //   }
  //   console.log(output);
  // }
};
