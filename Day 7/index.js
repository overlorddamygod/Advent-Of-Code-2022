const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, input) {
  if (err) {
    return console.log(err);
  }
  console.log(`Part 1: ${part1(input)}`);
  console.log(`Part 2: ${part2(input)}`);
});

const parseInput = (input) => {
  const lines = input.split("\n");

  const dir = {
    "/": {},
  };

  const dirPath = [];

  const getCurrentDir = () => {
    let currentDir = dir;
    for (const dirName of dirPath) {
      currentDir = currentDir[dirName];
    }
    return currentDir;
  };

  while (lines.length > 0) {
    if (lines[0].startsWith("$ cd ..")) {
      dirPath.pop();
      lines.shift();
      continue;
    }
    if (lines[0].startsWith("$ cd ")) {
      const [, dirName] = /^\$ cd (\/|\.\.|[a-zA-Z]+$)/.exec(lines[0]);

      dirPath.push(dirName);
      lines.shift();
      continue;
    }

    if (lines[0].startsWith("$ ls")) {
      lines.shift();
      const currentDir = getCurrentDir();

      while (lines.length != 0 && lines[0][0] != "$") {
        const fileOrDir = lines.shift();

        const dirParse = /^dir ([a-zA-z]+)$/.exec(fileOrDir);

        if (dirParse) {
          const dirName = dirParse[1];

          if (!Object.keys(currentDir).includes(dirName)) {
            currentDir[dirName] = {};
          }
        }

        const fileParse = /^([0-9]+) ([a-zA-z]+(\.[a-zA-Z]+)?)$/.exec(
          fileOrDir
        );

        if (fileParse) {
          const [, fileSize, fileName] = fileParse;

          if (!Object.keys(currentDir).includes(fileName)) {
            currentDir[fileName] = +fileSize;
          }
        }
      }
      continue;
    }
  }
  return dir;
};

// Part 1
const part1 = (input) => {
  const tree = parseInput(input);

  const sizesOfDirs = [];

  const calculateSize = (tree) => {
    const filesDirs = Object.keys(tree);
    let size = 0;

    for (const ff of filesDirs) {
      if (typeof tree[ff] == "object") {
        const dirSize = calculateSize(tree[ff]);
        size += dirSize;
        sizesOfDirs.push(dirSize);
      } else {
        size += tree[ff];
      }
    }
    return size;
  };
  calculateSize(tree);
  return sizesOfDirs.reduce((sum, size) => {
    return sum + (size < 100000 ? size : 0);
  }, 0);
};

// Part 2
const part2 = (input) => {
  const tree = parseInput(input);

  const sizesOfDirs = [];

  const calculateSize = (tree) => {
    const filesDirs = Object.keys(tree);
    let size = 0;

    for (const ff of filesDirs) {
      if (typeof tree[ff] == "object") {
        const dirSize = calculateSize(tree[ff]);
        size += dirSize;
        sizesOfDirs.push(dirSize);
      } else {
        size += tree[ff];
      }
    }
    return size;
  };
  const totalUsed = calculateSize(tree);

  const sizesSorted = sizesOfDirs.sort((a, b) => a - b);

  const unused = 70000000 - totalUsed;
  const requiredSpace = 30000000 - unused;
  // console.log("UNUSED", unused, "REQ", requiredSpace);

  let smallestToBeDeleted = Infinity;
  for (const size of sizesSorted) {
    if (size > requiredSpace) {
      smallestToBeDeleted = Math.min(size, smallestToBeDeleted);
    }
  }
  return smallestToBeDeleted;
};