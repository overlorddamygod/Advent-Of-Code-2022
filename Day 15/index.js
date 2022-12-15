const fs = require("fs");

const manhattanDistance = (a, b) => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

const parseInput = (input) => {
  const coords = input.split("\n").map((line) => {
    const [, sx, sy, bx, by] =
      /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/.exec(
        line
      );
    const sensor = [+sx, +sy];
    const beacon = [+bx, +by];

    return [sensor, beacon, manhattanDistance(sensor, beacon)];
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

  const set = (coord) => {
    // if (coord[1] != column) return;
    if (grid[coord]) return;
    grid[coord] = "#";
    count++;
  };

  let count = 0;

  for (let i = 0; i < coords.length; i++) {
    // console.log("COORD", coords[i]);
    const [sensor, beacon, distance] = coords[i];

    const yU = sensor[1] - distance;
    const yD = sensor[1] + distance;

    if (!(column <= yD && column >= yU)) {
      continue;
    }

    const gap = Math.abs(column - sensor[1]);
    const range = distance - gap + 1;

    for (let xd = 0; xd < range; xd++) {
      const xL = sensor[0] - xd;
      set([xL, column]);

      if (xd == 0) continue;
      const xR = sensor[0] + xd;
      set([xR, column]);
    }
  }

  // for (let i = -2; i < 23; i++) {
  //   let output = "" + String(i).padStart(3, " ") + "  ";
  //   for (let j = -3; j < 26; j++) {
  //     if (grid[[j, i]]) {
  //       output += grid[[j, i]];
  //     } else {
  //       output += ".";
  //     }
  //   }
  //   console.log(output);
  // }
  // console.log( Object.keys(grid).length)

  return count;
};

// Part 2
const part2 = (input, upperBound) => {
  let { coords } = parseInput(input);

  for (let i = 0; i < coords.length; i++) {
    // console.log("COORD", coords[i]);
    const [sensor, beacon, distance] = coords[i];
    const borders = [];

    // get All the border points
    for (let yd = 0; yd < distance + 2; yd++) {
      const yU = sensor[1] - yd;
      const yD = sensor[1] + yd;

      const outDistance = distance - yd + 1;
      const xr = sensor[0] + outDistance;
      const xl = sensor[0] - outDistance;

      borders.push(
        ...[
          [xl, yU],
          [xl, yD],
          [xr, yU],
          [xr, yD],
        ].filter((coord) => {
          return (
            coord[0] >= 0 &&
            coord[0] <= upperBound &&
            coord[1] >= 0 &&
            coord[1] <= upperBound
          );
        })
      );
    }

    // for each border points, check if they are within the range of any sensor
    // if a point is not within any of the sensor, the point is the beacon
    for (let point of borders) {
      // point = point.split(",").map((a) => +a);
      let isBeacon = true;
      for (const [sensor, beacon, distance] of coords) {
        if (manhattanDistance(sensor, point) <= distance) {
          isBeacon = false;
          break;
        }
      }
      if (isBeacon) {
        return point[0] * 4000000 + point[1];
      }
    }
  }
};

const solve = (filename, y, upperbound) => {
  const input = fs.readFileSync(filename, "utf-8");

  console.log(`Part 1: ${part1(input, y)}`);
  console.log(`Part 2: ${part2(input, upperbound)}`);
};

console.log("------- Sample -------");
solve("./sample.txt", 10, 20);

console.log("------- Input -------");
solve("./input.txt", 10, 20);
