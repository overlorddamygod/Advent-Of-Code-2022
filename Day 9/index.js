const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, input) {
  if (err) {
    return console.log(err);
  }
  console.log(`Part 1: ${part1(input)}`);
  console.log(`Part 2: ${part2(input)}`);
});

const parseInput = (input) => {
  return input.split("\n").map((step) => step.split(" "));
};

// Part 1
const part1 = (input) => {
  const steps = parseInput(input);

  const head = [4, 0];
  const tail = [4, 0];

  let uniqueLocationSet = new Set();

  for (const step of steps) {
    let [direction, times] = step;

    for (let i = 0; i < +times; i++) {
      // console.log(direction, i, times);

      switch (direction) {
        case "L":
          head[1] -= 1;
          break;
        case "R":
          head[1] += 1;
          break;
        case "U":
          head[0] -= 1;
          break;
        case "D":
          head[0] += 1;
          break;
        default:
          console.error("UNREACHABLE");
      }

      const [x, y] = head;

      const indexes = [
        [x - 1, y - 1],
        [x - 1, y],
        [x - 1, y + 1],
        [x, y - 1],
        [x, y],
        [x, y + 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1],
      ];

      const oneStepAway = indexes.some(
        (index) => index[0] == tail[0] && index[1] == tail[1]
      );
      
      // Is same location as head or 1 step away
      if (oneStepAway) {
        continue;
      }
      // Same row
      // Move one step left or right
      else if (x == tail[0] && Math.abs(y - tail[1]) == 2) {
        tail[1] += y > tail[1] ? 1 : -1;
      }
      // Same column
      // Move one step up or down
      else if (Math.abs(x - tail[0]) == 2 && y == tail[1]) {
        tail[0] += x > tail[0] ? 1 : -1;
      }
      // Two steps away
      // Move diagonally
      else {
        tail[0] += x > tail[0] ? 1 : -1;
        tail[1] += y > tail[1] ? 1 : -1;
      }
      uniqueLocationSet.add(`${tail[0]}-${tail[1]}`);
      // console.log("STEP: ", direction, i, +times, "PATH", tail)
      // printGrid(head, tail)
    }
  }
  // console.log("HEAD", head, "TAIL", tail);
  return uniqueLocationSet.size + 1;
};

const printGrid = (head, tail) => {
  for (let k = 0; k < 5; k++) {
    let row = "";
    for (let l = 0; l < 6; l++) {
      if (k == tail[0] && l == tail[1]) {
        row += "T";
      } else if (k == head[0] && l == head[1]) {
        row += "H";
      } else {
        row += ".";
      }
    }
    console.log(row);
  }
};

// Part 2
const part2 = (input) => {
  const steps = parseInput(input);

  // const head = [4, 0];
  const tails = Array.from({length: 10}, ()=> [4,0]); // [ Head, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
  const head = tails[0]

  let uniqueLocationSet = new Set();

  for (const step of steps) {
    let [direction, times] = step;

    for (let i = 0; i < +times; i++) {
      // console.log(direction, i, times);

      switch (direction) {
        case "L":
          head[1] -= 1;
          break;
        case "R":
          head[1] += 1;
          break;
        case "U":
          head[0] -= 1;
          break;
        case "D":
          head[0] += 1;
          break;
        default:
          console.error("UNREACHABLE");
      }

      for ( let z = 1; z < tails.length; z++) {
        const prev = tails[z-1];
        const [prevX, prevY] = prev;
        const current = tails[z];

        const indexes = [
          [prevX - 1, prevY - 1],
          [prevX - 1, prevY],
          [prevX - 1, prevY + 1],
          [prevX, prevY - 1],
          [prevX, prevY],
          [prevX, prevY + 1],
          [prevX + 1, prevY - 1],
          [prevX + 1, prevY],
          [prevX + 1, prevY + 1],
        ];

        const oneStepAway = indexes.some(
          (index) => index[0] == current[0] && index[1] == current[1]
        );
        
        // Is same location as head or 1 step away
        if (oneStepAway) {
          continue;
        }
        // Same row
        // Move one step left or right
        else if (prevX == current[0] && Math.abs(prevY - current[1]) == 2) {
          current[1] += prevY > current[1] ? 1 : -1;
          // uniqueLocationSet.add(`${current[0]}-${current[1]}`);
        }
        // Same column
        // Move one step up or down
        else if (Math.abs(prevX - current[0]) == 2 && prevY == current[1]) {
          current[0] += prevX > current[0] ? 1 : -1;
          // uniqueLocationSet.add(`${current[0]}-${current[1]}`);
        }
        // Two steps away
        // Move diagonally
        else {
          current[0] += prevX > current[0] ? 1 : -1;
          current[1] += prevY > current[1] ? 1 : -1;
        }
        if (z == 9) {
          uniqueLocationSet.add(`${current[0]}-${current[1]}`);
        }
      }
    }
  }
  return uniqueLocationSet.size + 1;
};