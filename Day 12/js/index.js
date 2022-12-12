const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, input) {
  if (err) {
    return console.log(err);
  }
  console.log(`Part 1: ${part1(input)}`);
  console.log(`Part 2: ${part2(input)}`);
});

const parseInput = (input) => {
  const lines = input.split("\n");
  let start = [0, 0];
  let end = [0, 0];
  const candidateStartPos = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split("");

    for (let j = 0; j < line.length; j++) {
      if (line[j] == "S") {
        start = [i, j];
        line[j] = "a";
      }
      if (line[j] == "E") {
        end = [i, j];
        line[j] = "z";
      }
      if (line[j] == "a") {
        candidateStartPos.push([i, j]);
      }
      line[j] = line[j][0].charCodeAt(0) - "z".charCodeAt(0);
    }
    lines[i] = line;
  }

  return {
    grid: lines,
    start,
    end,
    candidateStartPos,
  };
};

// Part 1
const part1 = (input) => {
  let { grid, start, end } = parseInput(input);
  // console.log(grid, start, end);
  return bfs(grid, start, end);
};

// Part 2
const part2 = (input) => {
  let { grid, end, candidateStartPos } = parseInput(input);

  console.log(candidateStartPos.length);
  // console.log(grid, start, end);
  let minSteps = Infinity;
  for (const start of candidateStartPos) {
    const steps = bfs(grid, start, end);

    minSteps = Math.min(minSteps, steps);
  }
  return minSteps;
};

const check = (a, b) => {
  return b - a <= 1;
};

const getAdjacentNodesIndex = (i, j, arr) => {
  const adjacent = [];

  if (i > 0 && check(arr[i][j], arr[i - 1][j])) {
    adjacent.push([i - 1, j]);
  }

  if (i < arr.length - 1 && check(arr[i][j], arr[i + 1][j])) {
    adjacent.push([i + 1, j]);
  }

  if (j > 0 && check(arr[i][j], arr[i][j - 1])) {
    adjacent.push([i, j - 1]);
  }
  
  if (j < arr[0].length - 1 && check(arr[i][j], arr[i][j + 1])) {
    adjacent.push([i, j + 1]);
  }

  return adjacent;
};

const bfs = (graph, src = [0, 0], end) => {
  let dist = {};
  const queue = [src];

  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[0].length; j++) {
      dist[[i, j]] = Number.POSITIVE_INFINITY;
    }
  }

  dist[src] = 0;
  while (queue.length > 0) {
    const node = queue.shift();
    // console.log(`minimumNode ${node}`);

    const [i, j] = node;

    if ( i == end[0] && j == end[1]) {
      return dist[end]
    }

    const adjacentNodes = getAdjacentNodesIndex(i, j, graph);

    adjacentNodes.forEach((adjNode) => {
      if (dist[node] != Number.POSITIVE_INFINITY) {
        if (dist[node] + 1 < dist[adjNode]) {
          dist[adjNode] = dist[node] + 1;

          queue.push(adjNode);
        }
      }
    });
  }
  // console.log(dist)
  return dist[end];
};
