// Solution done complicately at first.. Check index.alternative.js for easy one

const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, input) {
  if (err) {
    return console.log(err);
  }
  console.log(`Part 1: ${part1(input)}`);
  console.log(`Part 2: ${part2(input)}`);
});

// Part 1
// No. of distinct chars = 4
const part1 = (input) => {
  let start = 0;
  let end = 0;
  let chopped = 0;
  
  let seen = {}

  while ( input.length > 0 ) {
    const char = input[end]

    if (!Object.keys(seen).includes(char)) {
      end++
      seen[char] = true;

      if (end - start == 4) {
        return end
      }
    } else {
      const index = input.slice(start).indexOf(char) 
      chopped += index + 1
      
      start = chopped;
      end = chopped;

      seen = {}
    }
  }
}

// Part 2
// Same as Part 1 but only difference is no. of distinct characters... Can be extracted to function with input as no. of chars
// No. of distinct chars = 14
const part2 = (input) => {
  let start = 0;
  let end = 0;
  let chopped = 0;
  
  let seen = {}

  while ( input.length > 0 ) {
    const char = input[end]

    if (!Object.keys(seen).includes(char)) {
      end++
      seen[char] = true;

      if (end - start == 14) {
        return end
      }
    } else {
      const index = input.slice(start).indexOf(char) 
      chopped += index + 1
      
      start = chopped;
      end = chopped;

      seen = {}
    }
  }
}