const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, input) {
  if (err) {
    return console.log(err);
  }
  console.log(`Part 1: ${part1(input)}`);
  console.log(`Part 2: ${part2(input)}`);
});

const parseInput = (input) => {
  return input.split("\n").map((tree) => tree.split("").map((a) => +a));
};

// Part 1
const part1 = (input) => {
  const grid = parseInput(input);

  const noOfEdges = grid.length * 2 + grid[0].length * 2 - 4;
  let visibleCount = noOfEdges;

  const checkVisible = (grid, i, j) => {
    let visibleLeft = true;
    for (let col = j - 1; col >= 0; col--) {
      if (grid[i][j] <= grid[i][col]) {
        visibleLeft = false;
        break;
      }
    }

    let visibleRight = true;
    for (let col = j + 1; col < grid[0].length; col++) {
      if (grid[i][j] <= grid[i][col]) {
        visibleRight = false;
        break;
      }
    }

    let visibleTop = true;
    for (let row = i - 1; row >= 0; row--) {
      if (grid[i][j] <= grid[row][j]) {
        visibleTop = false;
        break;
      }
    }

    let visibleBot = true;
    for (let row = i + 1; row < grid.length; row++) {
      if (grid[i][j] <= grid[row][j]) {
        visibleBot = false;
        break;
      }
    }

    return visibleLeft || visibleRight || visibleTop || visibleBot;
  };

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[0].length - 1; j++) {
      const visible = checkVisible(grid, i, j);

      if (visible) visibleCount++;
    }
  }

  return visibleCount;
};

// Part 2
const part2 = (input) => {
  const grid = parseInput(input);

  const getViewingDistance = (grid, i, j) => {
    let distanceLeft = 0;
    for (let col = j - 1; col >= 0; col--) {
      distanceLeft++;
      if (grid[i][j] <= grid[i][col]) {
        break;
      }
    }

    let distanceRight = 0;
    for (let col = j + 1; col < grid[0].length; col++) {
      distanceRight++;
      if (grid[i][j] <= grid[i][col]) {
        break;
      }
    }

    let distanceTop = 0;
    for (let row = i - 1; row >= 0; row--) {
      distanceTop++;
      if (grid[i][j] <= grid[row][j]) {
        break;
      }
    }

    let distanceBot = 0;
    for (let row = i + 1; row < grid.length; row++) {
      distanceBot++;
      if (grid[i][j] <= grid[row][j]) {
        break;
      }
    }

    return distanceLeft * distanceRight * distanceTop * distanceBot;
  };

  let maxViewingDistance = -Infinity;

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[0].length - 1; j++) {
      const distance = getViewingDistance(grid, i, j);

      maxViewingDistance = Math.max(distance, maxViewingDistance);
    }
  }

  return maxViewingDistance;
};
