const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, input) {
  if (err) {
    return console.log(err);
  }
  console.log(`Part 1: ${part1(input)}`);
  console.log(`Part 2: ${part2(input)}`);
});

const parseInput = (input) => {
  const monkeysInput = input.split("\n\n");

  const reg =
    /^Monkey (\d)+:\n  Starting items: (.+)\n  Operation: new = (.+)\n  Test: divisible by (\d+)\n    If true: throw to monkey (\d+)\n    If false: throw to monkey (\d+)/;

  const monkeys = [];

  for (const monkey of monkeysInput) {
    const monkeyResult = reg.exec(monkey);

    const [
      ,
      monkeyIndex,
      startingItems,
      operation,
      divisibleBy,
      ifTrue,
      ifFalse,
    ] = monkeyResult;

    monkeys.push({
      monkeyIndex: +monkeyIndex,
      startingItems: startingItems.split(", ").map((a) => +a),
      operation: (old) => {
        return eval(operation.replaceAll("old", old));
      },
      divisibleBy: +divisibleBy,
      nextMonkey: (num) => {
        if (num % +divisibleBy == 0) return +ifTrue;
        return +ifFalse;
      },
    });
  }
  return monkeys;
};

// Part 1
const part1 = (input) => {
  let monkeys = parseInput(input);
  // console.log(monkeys)

  const monkeyInspectionCount = Array.from({ length: monkeys.length }, () => 0);

  for (let round = 1; round <= 20; round++) {
    for (const monkey of monkeys) {
      // console.log(`Monkey ${monkey.monkeyIndex}:`);
      while (monkey.startingItems.length > 0) {
        const worryLevel = monkey.startingItems.shift();

        const newWorryLevel = monkey.operation(worryLevel);

        const dividedBy3 = Math.trunc(newWorryLevel / 3);

        const newMonkeyIndex = monkey.nextMonkey(dividedBy3);

        monkeyInspectionCount[monkey.monkeyIndex]++;
        monkeys[newMonkeyIndex].startingItems.push(dividedBy3);

        // console.log(
        //   `  Monkey inspects an intem with a worry level of ${worryLevel}.`
        // );
        // console.log(`    Worry level is multiplied by lol to ${newWorryLevel}`);
        // console.log(
        //   `    Monkey gets bored with item. Worry level is divided by 3 to ${dividedBy3}`
        // );
        // console.log(
        //   `    Item with worry level ${dividedBy3} is thrown to monkey ${newMonkeyIndex}`
        // );
      }
    }

    // console.log(
    //   `ROUND ${round}:\n ${monkeys
    //     .map(
    //       (monkey) =>
    //         `Monkey ${monkey.monkeyIndex}: ${monkey.startingItems.join(", ")}`
    //     )
    //     .join("\n ")}\n`
    // );
  }
  const sortedCount = monkeyInspectionCount.sort((a, b) => b - a);

  return sortedCount[0] * sortedCount[1];
};

// Part 2
// Modulo the new worry level by LCM of all the divisible by numbers to make the number small
// new = new % LCM
const part2 = (input) => {
  let monkeys = parseInput(input);

  const lcmArray = (nums) => {
    const gcd = (a, b) => {
      return !b ? a : gcd(b, a % b);
    };

    // Least Common Multiple function
    const lcm = (a, b) => {
      return a * (b / gcd(a, b));
    };

    const sorted = nums.sort((a, b) => b - a);

    let result = sorted[0];

    for (const num of sorted) {
      result = lcm(num, result);
    }

    return result;
  };

  const lcmOfAllDivisibleBy = lcmArray(monkeys.map((a) => a.divisibleBy));

  const monkeyInspectionCount = Array.from({ length: monkeys.length }, () => 0);

  for (let round = 1; round <= 10000; round++) {
    for (const monkey of monkeys) {
      while (monkey.startingItems.length > 0) {
        const worryLevel = monkey.startingItems.shift();

        const newWorryLevel =
          monkey.operation(worryLevel) % lcmOfAllDivisibleBy;

        // console.log(BigInt(newWorryLevel))

        const newMonkeyIndex = monkey.nextMonkey(newWorryLevel);

        monkeyInspectionCount[monkey.monkeyIndex]++;
        monkeys[newMonkeyIndex].startingItems.push(newWorryLevel);
      }
    }

    // console.log(`== After round ${round} ==\n${monkeyInspectionCount.map((count, i) => `Monkey ${i} inspected items ${count} times.`).join("\n")}\n`)
  }
  const sortedCount = monkeyInspectionCount.sort((a, b) => b - a);

  return sortedCount[0] * sortedCount[1];
};
