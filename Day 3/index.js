const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  data = data.split("\n");
  console.log(`Part 1: ${prioritiesSum1(data)}`);
  console.log(`Part 2: ${prioritiesSum2(data)}`);
});

// Part 1
const prioritiesSum1 = (rucksacks) => {

  const getPriority = (letter) => {
    if (letter >= "a" && letter <= "z") {
      return letter.charCodeAt(0) - 96
    }
    return letter.charCodeAt(0) - 38
  }

  return rucksacks.reduce((sum, rucksack) => {
    const mid = Math.floor(rucksack.length/2)

    const firstCompartment = [...rucksack.slice(0, mid)]
    const secondCompartment = [...rucksack.slice(mid)]

    // A ∩ B
    const commonItems = new Set()

    for (const item of firstCompartment) {
      if (secondCompartment.includes(item)) {
        commonItems.add(item)
      }
    }

    const [common, ] = [...commonItems]
    return sum + getPriority(common);
  },0 )
};

// Part 2
const prioritiesSum2 = (rucksacks) => {

  const getPriority = (letter) => {
    if (letter >= "a" && letter <= "z") {
      return letter.charCodeAt(0) - 96
    }
    return letter.charCodeAt(0) - 38
  }

  const intersection = (a, b) => {
    const commonItems = new Set()

    for (const item of a) {
      if (b.includes(item)) {
        commonItems.add(item)
      }
    }
    return [...commonItems]
  }

  let sum = 0;

  while (rucksacks.length > 0) {
    const sack1 = rucksacks[0]
    const sack2 = rucksacks[1]
    const sack3 = rucksacks[2]

    // A ∩ B ∩ C
    const badge = intersection(intersection(sack1, sack2), sack3)[0]

    sum += getPriority(badge)

    rucksacks.shift()
    rucksacks.shift()
    rucksacks.shift()
  }
  
  return sum;
};
