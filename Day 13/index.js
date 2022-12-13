const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, input) {
  if (err) {
    return console.log(err);
  }
  console.log(`Part 1: ${part1(input)}`);
  console.log(`Part 2: ${part2(input)}`);
});

const parseInput = (input) => {
  return input.split("\n\n").map(pair=> pair.split("\n").map(p => JSON.parse(p)));
};

// Part 1
const part1 = (input) => {
  let pairs = parseInput(input);
  // console.log(pairs)
  let rightOrderIndex = [];
  for (let i = 0; i < pairs.length; i++) {
    const [first, second] = pairs[i];
    const res = compare(first, second);
    // console.log("Pair", i+1, first, second,res)
    if (res) {
      rightOrderIndex.push(i + 1);
    }
  }

  return rightOrderIndex.reduce((sum, n) => sum + n, 0);
};

const compare = (first, second) => {
  // console.log(`- Compare ${first} vs ${second}`)
  
  if (typeof first == "number" && typeof second == "number") {
    if (first == second) {
      return null;
    }
    return first < second;
  }

  if (typeof first == "object" && typeof second == "object") {
    first = [...first]
    second = [...second]

    while (first.length && second.length) {
      const result = compare(first.shift(), second.shift());
      if (result == null) {
        continue;
      }

      return result;
    }

    if (first.length != second.length) {
      if (first.length > 0 && second.length == 0) {
        return false;
      }

      return true;
    }
  }

  if (typeof first == "number" && typeof second == "object") {
    first = [first];
    return compare(first, second);
  }

  if (typeof first == "object" && typeof second == "number") {
    second = [second];
    return compare(first, second);
  }
};


// Part 2
const part2 = (input) => {
  const parseInput2 = (input) => {
    const pairs = input.split("\n\n");
    const packets = [[[2]], [[6]]];

    for (let i = 0; i < pairs.length; i++) {
      const [firstPair, secondPair] = pairs[i].split("\n");
      packets.push(JSON.parse(firstPair));
      packets.push(JSON.parse(secondPair));
    }
    return packets;
  };

  let pairs = parseInput2(input);

  // BubbleSort
  for ( let i = 0; i < pairs.length - 1; i++ ) {
    for ( let j = 0; j < pairs.length - 1 - i; j++) {
      if ( !compare(pairs[j], pairs[j+1]) ) {
        let temp = pairs[j]

        pairs[j] = pairs[j+1]
        pairs[j+1] = temp
      }
    }
  }

  let result = 1;

  // Linear Search
  for (let i = 0; i < pairs.length; i++ ) {
    const str = JSON.stringify(pairs[i])
    if ( str == "[[2]]" || str == "[[6]]") {
      result *= i+1
    }
  }

  return result
};