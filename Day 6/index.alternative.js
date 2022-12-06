const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, input) {
  if (err) {
    return console.log(err);
  }
  console.log(`Part 1: ${part1Alt(input)}`);
  console.log(`Part 2: ${part2Alt(input)}`);
});

const part1Alt = (input) => {
  const noOfDistinctChars = 4;
  for (let i = noOfDistinctChars - 1; i < input.length; i++) {
    const char4 = input.substring(i - (noOfDistinctChars - 1), i + 1);
    const set = new Set(char4);

    if (set.size == noOfDistinctChars) {
      return i + 1;
    }
  }
};

const part2Alt = (input) => {
  const noOfDistinctChars = 14;
  for (let i = noOfDistinctChars - 1; i < input.length; i++) {
    const char4 = input.substring(i - (noOfDistinctChars - 1), i + 1);
    const set = new Set(char4);

    if (set.size == noOfDistinctChars) {
      return i + 1;
    }
  }
};
