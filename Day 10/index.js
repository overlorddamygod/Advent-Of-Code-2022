const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, input) {
  if (err) {
    return console.log(err);
  }
  console.log(`Part 1: ${part1(input)}`);
  console.log(`Part 2: ${part2(input)}`);
});

const parseInput = (input) => {
  return input.split("\n");
};

// Part 1
const part1 = (input) => {
  const instructions = parseInput(input);

  let X = 1;
  let cycle = 0;
  const requiredCycles = [20, 60, 100, 140, 180, 220];

  const cycleX = [];

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    // console.log(`${i+1} cycle ${instruction}`)

    cycle++;
    if (requiredCycles.includes(cycle)) {
      cycleX.push(X * cycle);
    }

    if (instruction == "noop") {
      continue;
    } else if (instruction.startsWith("addx ")) {
      const num = +instruction.split(" ")[1];

      cycle++;

      if (requiredCycles.includes(cycle)) {
        cycleX.push(X * cycle);
      }

      X += num;
    }
  }
  // console.log(X, cycle);
  // console.log(cycleX);
  return cycleX.reduce((sum, x) => sum + x, 0);
};

// Part 2
const part2 = (input) => {
  const instructions = parseInput(input);

  let X = 1;
  let cycle = 0;

  let sprite = "###.....................................";
  let screen = "";

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    // console.log(`${i+1} cycle ${instruction}`)

    const index = cycle % 40;
    screen += sprite[index];

    // console.log(`Start cycle   ${cycle+1}: begin executing ${instruction}`)
    // console.log(`During cycle  ${cycle+1}: CRT draws pixel in position ${index}`)
    // console.log(`Current CRT row: ${a}`)
    // console.log()

    cycle++;

    if (instruction == "noop") {
      continue;
    } else if (instruction.startsWith("addx ")) {
      const index = cycle % 40;
      screen += sprite[index];

      // console.log(`During cycle  ${cycle+1}: CRT draws pixel in position ${index}`)
      // console.log(`Current CRT row: ${a}`)
      const num = +instruction.split(" ")[1];

      X += num;
      // console.log(`End of cycle  ${cycle+1}: finish executing ${instruction} (Register X is now ${X})`)
      cycle++;

      sprite = ".".repeat(40).split("");
      sprite[X - 1] = "#";
      sprite[X] = "#";
      sprite[X + 1] = "#";
      sprite = sprite.join("");

      // console.log(`Sprite position: ${sprite}`)
      // console.log()
    }
  }

  for (let i = 0; i < 6; i++) {
    const start = i * 40;
    const end = start + 40;
    console.log(screen.slice(start, end).split("").join(" "));
  }
  console.log()

  colorPrint(screen)
};

const colorPrint = (screen) => {
  const greenBox = "\x1b[32m■"

  for (let i = 0; i < 6; i++) {
    const start = i * 40;
    const end = start + 40;
    console.log(screen.slice(start, end).split("").map(a=> a == "#" ? greenBox : "\x1b[37m ").join(" "));
  }
}
