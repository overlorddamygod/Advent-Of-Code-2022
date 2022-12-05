const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, input) {
  if (err) {
    return console.log(err);
  }
  console.log(`Part 1: ${part1(input)}`);
  console.log(`Part 2: ${part2(input)}`);
});

const parseInput = (input) => {
  let [crates, procedures] = input.split("\n\n");

  const stacks = [];
  crates = crates.split("\n");

  for (let i = 0; i < crates.length - 1; i++) {
    const line = crates[i];

    let stackNum = 0;
    for (let i = 0; i < line.length; i += 4) {
      if (stackNum + 1 > stacks.length) {
        stacks.push([]);
      }
      if (line[i + 1] != " ") {
        stacks[stackNum].push(line[i + 1]);
      }
      stackNum++;
    }
  }

  return [stacks, procedures.split("\n")];
};

// Part 1
const part1 = (input) => {
  let [crateStacks, procedures] = parseInput(input);

  for (let procedure of procedures) {
    const match = /^move (\d+) from (\d+) to (\d+)$/.exec(procedure);

    if (!match) {
      console.error("ERROR MATCHING PATTERN")
      return;
    }

    const [, num, src, dest] = match;

    for (let i = 0; i < num; i++) {
      const toBeMovedCrates = crateStacks[src - 1].shift();
      crateStacks[dest - 1].unshift(toBeMovedCrates);
    }
  }
  return crateStacks.reduce((str, stack) => {
    return str + stack[0];
  }, "");
};

// Part 2
const part2 = (input) => {
  let [crateStacks, procedures] = parseInput(input);

  for (let procedure of procedures) {
    const match = /^move (\d+) from (\d+) to (\d+)$/.exec(procedure);

    if (!match) {
      console.error("ERROR MATCHING PATTERN")
      return;
    }

    let [, num, src, dest] = match;

    const toBeMovedCrates = crateStacks[src - 1].splice(0, num);
    crateStacks[dest - 1].unshift(...toBeMovedCrates);
  }

  return crateStacks.reduce((str, stack) => {
    return str + stack[0];
  }, "");
};
