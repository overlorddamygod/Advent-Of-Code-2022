const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, input) {
  if (err) {
    return console.log(err);
  }
  const sampleY = 10;
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
    // if (coord[1] != column) return;
    if (grid[coord]) return;
    grid[coord] = "#";
    count++
  };

  let count = 0;

  for (let i = 0; i < coords.length; i++) {
    console.log("COORD", coords[i]);
    const [sensor, beacon] = coords[i];
    const distance = manhattanDistance(sensor, beacon);

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
      
      if (xd == 0) continue
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
// TODO
const part2 = (input) => {
  let { coords, grid } = parseInput(input);

  const manhattanDistance = (a, b) => {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  };

  const y = 10;
  const gridCount = {};
  const set = (coord) => {
    // if (coord[1] != y) return;
    if (grid[coord] == "S" || grid[coord] == "B") return;
    grid[coord] = "#";
    if (coord[0] >= 0 && coord[0] <= 20 && coord[1] >= 0 && coord[1] <= 20)
      gridCount[coord] = gridCount[coord] ? gridCount[coord] + 1 : 1;
  };

  for (let i = 0; i < coords.length; i++) {
    console.log("COORD", coords[i]);
    const [sensor, beacon] = coords[i];
    const distance = manhattanDistance(sensor, beacon);

    for (let yd = 0; yd < distance + 2; yd++) {
      const yU = sensor[1] - yd;
      const yD = sensor[1] + yd;
      console.log(yU, yD);
      // if (yU != y && -yU != y && yD != y && -yD != y) continue;
      // console.log(yU,yD)
      // console.log(yU, yD)
      const outDistance = distance - yd + 1;
      const xr = sensor[0] + outDistance;
      const xl = sensor[0] - outDistance;

      set([xl, yU]);
      set([xl, yD]);
      set([xr, yU]);
      set([xr, yD]);
      // set([-xl, -yU])
      // set([-xl, -yD])
      // set([-xr, -yU])
      // set([-xr, -yD])
      // console.log([xl, yU])
      // console.log([xl, yD])
      // console.log([xr, yU])
      // console.log([xr, yD])
      // for (let xd = 0; xd < distance - yd + 1; xd++) {
      //   // console.log(yd,xd)
      //   const xL = sensor[0] - xd;
      //   const xR = sensor[0] + xd;

      //   set([xL, yU]);
      //   set([xL, yD]);
      //   set([xR, yU]);
      //   set([xR, yD]);

      //   set([-xL, -yU]);
      //   set([-xL, -yD]);
      //   set([-xR, -yU]);
      //   set([-xR, -yD]);
      // }
    }
  }

  for (let i = 0; i <= 20; i++) {
    let output = "" + String(i).padStart(3, " ") + "  ";
    for (let j = 0; j <= 20; j++) {
      if (grid[[j, i]]) {
        output += grid[[j, i]];
      } else {
        output += ".";
      }
    }
    console.log(output);
  }

  console.log(gridCount);
  return Object.keys(gridCount).filter((coord) => {
    return gridCount[coord] == 1;
  });
};
