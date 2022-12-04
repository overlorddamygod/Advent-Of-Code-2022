const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  data = data.split("\n");
  console.log(`Part 1: ${fullyOverlapCount(data)}`);
  console.log(`Part 2: ${overlapCount(data)}`);
});

// Part 1
const fullyOverlapCount = (sectionPairs) => {
  let overlappingCount = 0;

  for ( const pair of sectionPairs) {
    const [firstSection, secondSection] = pair.split(",").map(section => section.split("-").map(a=>+a))

    if ( secondSection[0] >= firstSection[0] && secondSection[1] <= firstSection[1]) {
      overlappingCount++
    } else if (firstSection[0] >= secondSection[0] && firstSection[1] <= secondSection[1]) {
      overlappingCount++
    }
  }
  
  return overlappingCount;
};

// Part 2
const overlapCount = (sectionPairs) => {
  let overlappingCount = 0;

  for ( const pair of sectionPairs) {
    const [firstSection, secondSection] = pair.split(",").map(section => section.split("-").map(a=>+a))

    if ( secondSection[0] <= firstSection[1] && secondSection[1] >=firstSection[0] ) {
      overlappingCount++
    } 
  }

  return overlappingCount;
};
