const fs = require("fs");
const {PriorityQueue} = require("./priorityQueue");

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
  const candidateStartPos = []

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
        candidateStartPos.push([i,j])
      }
    }
    lines[i] = line;
  }

  return {
    grid: lines,
    start,
    end,
    candidateStartPos
  };
};

// Part 1
const part1 = (input) => {
  let { grid, start, end } = parseInput(input);
  // console.log(grid, start, end);
  return dijkstra(grid, start, end);
};

// Part 2
const part2 = (input) => {
  let { grid, start, end, candidateStartPos } = parseInput(input);
  console.log(candidateStartPos.length)
  // console.log(grid, start, end);
  let minSteps = Infinity;
  for (const start of candidateStartPos ) {
    const steps = dijkstra(grid, start, end)

    minSteps = Math.min(minSteps, steps)
  }
  return minSteps;
};

const getAdjacentNodesIndex = (i, j, arr) => {
  const adjacent = [];

  const check = (a, b) => {
    const diff = b.charCodeAt(0) - a.charCodeAt(0);
    // console.log("diff", a,b,a.charAt(0), diff)
    return diff <= 1;
  };

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

// Reference : https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7
// Dijkstra using priority queue - https://gist.github.com/Prottoy2938/66849e04b0bac459606059f5f9f3aa1a
const dijkstra = (graph, src = [0, 0], end) => {
  let dist = {};
  const pq = new PriorityQueue();

  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[0].length; j++) {
      const node = [i, j];
      dist[node] = Number.POSITIVE_INFINITY;

      if (i == src[0] && j == src[1]) {
        pq.enqueue(`${i},${j}`, 0);
      } else {
        pq.enqueue(`${i},${j}`, Number.POSITIVE_INFINITY);
      }
    }
  }

  dist[src] = 0;
  while (pq.values.length) {
    const node = pq.dequeue().val;
    // console.log(`minimumNode ${node}`);

    const [i, j] = node.split(",").map((d) => +d);

    const adjacentNodes = getAdjacentNodesIndex(i, j, graph);

    adjacentNodes.forEach((adjNode) => {
      if (dist[node] != Number.POSITIVE_INFINITY) {
        const [row, col] = adjNode;
        // console.log(row,col)
        const weight = 1;

        if (dist[node] + weight < dist[adjNode]) {
          dist[adjNode] = dist[node] + weight;

          pq.enqueue(`${row},${col}`, dist[node] + weight);
        }
      }
    });
  }
  // console.log(dist)
  return dist[end];
};
