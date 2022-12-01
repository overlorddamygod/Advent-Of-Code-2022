const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  data = data.split("\n");
  console.log(`Part 1: ${mostCalories(data)}`);
  console.log(`Part 2: ${top3Calories(data)}`);
});

// Part 1
const mostCalories = (calories) => {
  let max = -Infinity;
  let sum = 0;

  calories.forEach((cal) => {
    if (cal == "") {
      max = Math.max(max, sum);
      sum = 0;
    } else {
      sum += +cal;
    }
  });
  return max;
};

// Part 2
const top3Calories = (calories) => {
  const newCaloriesArr = calories
    .reduce(
      (arr, cal) => {
        if (cal == "") {
          arr.push([]);
        } else {
          arr[arr.length - 1].push(+cal);
        }
        return arr;
      },
      [[]]
    )
    .map((cal) => cal.reduce((sum, a) => sum + a, 0));

  const sortedCalories = newCaloriesArr.sort((a, b) => b - a);
  return sortedCalories[0] + sortedCalories[1] + sortedCalories[2];
};
