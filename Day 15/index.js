const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, input) {
  if (err) {
    return console.log(err);
  }
  const sampleY = 10
  console.log(`Part 1: ${part1(input, sampleY)}`);
  // console.log(`Part 2: ${part2(input)}`);
});

const parseInput = (input) => {
  const coords = input.split("\n").map((line) => {
    const [, sx, sy, bx, by] =
      /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/.exec(
        line
      );

    return [
      [+sx, +sy],
      [+bx, +by],
    ];
  });

  const grid = {};

  for (const coord of coords) {
    const [sensor, beacon] = coord;

    grid[sensor] = "S";
    grid[beacon] = "B";
  }

  return { coords, grid };
};

// Part 1
const part1 = (input, column) => {
  let { coords, grid } = parseInput(input);

  const manhattanDistance = (a, b) => {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  };

  const set = (coord) => {
    if (coord[1] != column) return;
    if (grid[coord] == "S" || grid[coord] == "B") return;
    grid[coord] = "#";
  };

  for (let i = 0; i < coords.length; i++) {
    console.log("COORD", coords[i]);
    const [sensor, beacon] = coords[i];
    const distance = manhattanDistance(sensor, beacon);

    for (let yd = 0; yd < distance + 1; yd++) {
      const yU = sensor[1] - yd;
      const yD = sensor[1] + yd;

      if (yU != column && -yU != column && yD != column && -yD != column)
        continue;

      for (let xd = 0; xd < distance - yd + 1; xd++) {
        const xL = sensor[0] - xd;
        const xR = sensor[0] + xd;

        set([xL, yU]);
        set([xL, yD]);
        set([xR, yU]);
        set([xR, yD]);

        set([-xL, -yU]);
        set([-xL, -yD]);
        set([-xR, -yU]);
        set([-xR, -yD]);
      }
    }
  }

  // for (let i = 0; i < 21; i++) {
  //   let output = "" + String(i).padStart(3," ") + "  ";
  //   for (let j = 0; j < 21; j++) {
  //     if (grid[[j, i]]) {
  //       output += grid[[j,i]];
  //     } else {
  //       output += "."
  //     }
  //   }
  //   console.log(output)
  // }

  return Object.keys(grid).filter((coord) => {
    return +coord.split(",")[1] == column && grid[coord] == "#";
  }).length;
};

// Part 2
// TODO
const part2 = (input) => {
  let { coords, grid } = parseInput(input);

  const manhattanDistance = (a, b) => {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  };

  const y = 10;
  const set = (coord) => {
    if (coord[1] != y) return;
    if (grid[coord] == "S" || grid[coord] == "B") return;
    grid[coord] = "#";
  };
  for (let i = 0; i < coords.length; i++) {
    console.log("COORD", coords[i]);
    const [sensor, beacon] = coords[i];
    const distance = manhattanDistance(sensor, beacon);

    for (let yd = 0; yd < distance + 1; yd++) {
      const yU = sensor[1] - yd;
      const yD = sensor[1] + yd;

      if (yU != y && -yU != y && yD != y && -yD != y) continue;
      // console.log(yU,yD)
      // console.log(yU, yD)
      for (let xd = 0; xd < distance - yd + 1; xd++) {
        // console.log(yd,xd)
        const xL = sensor[0] - xd;
        const xR = sensor[0] + xd;

        set([xL, yU]);
        set([xL, yD]);
        set([xR, yU]);
        set([xR, yD]);

        set([-xL, -yU]);
        set([-xL, -yD]);
        set([-xR, -yU]);
        set([-xR, -yD]);
      }
    }
  }

  for (let i = 0; i < 21; i++) {
    let output = "" + String(i).padStart(3, " ") + "  ";
    for (let j = 0; j < 21; j++) {
      if (grid[[j, i]]) {
        output += grid[[j, i]];
      } else {
        output += ".";
      }
    }
    console.log(output);
  }

  return Object.keys(grid).filter((coord) => {
    return +coord.split(",")[1] == y && grid[coord] == "#";
  }).length;
};
