const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  data = data.split("\n");
  console.log(`Part 1: ${totalScore1(data)}`);
  console.log(`Part 2: ${totalScore2(data)}`);
});

const RPSOutcome = (player, opponent) => {
  const posiibilities = {
    A: "100",
    B: "010",
    C: "001",
    X: "100",
    Y: "010",
    Z: "001",
  };

  const [r1, p1, s1] = posiibilities[player].split("").map((a) => +a);
  const [r2, p2, s2] = posiibilities[opponent].split("").map((a) => +a);

  const w1 = ~((s1 & r2) | (p1 & s2) | (r1 & p2));
  const w2 = ~((s1 & p2) | (r1 & s2) | (p1 & r2));

  return w1 == w2 ? "draw" : w1 > w2 ? "win" : "loss";
};

// Part 1
const totalScore1 = (rounds) => {
  const scoreMap = {
    draw: 3,
    win: 6,
    loss: 0,
    X: 1,
    Y: 2,
    Z: 3,
  };

  return rounds.reduce((score, round) => {
    const [opponent, player] = round.split(" ");

    const roundOutcome = RPSOutcome(player, opponent);

    const roundScore = scoreMap[roundOutcome] + scoreMap[player];
    return score + roundScore;
  }, 0);
};

// Part 2
const totalScore2 = (rounds) => {
  const scoreMap = {
    draw: 3,
    win: 6,
    loss: 0,
    X: 1,
    Y: 2,
    Z: 3,
  };

  const getPlayerChoice = (player, opponent) => {
    if (player == "X") {
      if (opponent == "A") {
        player = "Z";
      } else if (opponent == "B") {
        player = "X";
      } else if (opponent == "C") {
        player = "Y";
      }
    } else if (player == "Y") {
      if (opponent == "A") {
        player = "X";
      } else if (opponent == "B") {
        player = "Y";
      } else if (opponent == "C") {
        player = "Z";
      }
    } else if (player == "Z") {
      if (opponent == "A") {
        player = "Y";
      } else if (opponent == "B") {
        player = "Z";
      } else if (opponent == "C") {
        player = "X";
      }
    }

    return player;
  };

  return rounds.reduce((score, round) => {
    let [opponent, player] = round.split(" ");

    player = getPlayerChoice(player, opponent);

    const roundOutcome = RPSOutcome(player, opponent);

    const roundScore = scoreMap[roundOutcome] + scoreMap[player];
    return score + roundScore;
  }, 0);
};

// Part 2 Player Choice alternative
const getPlayerChoiceAlt = (player, opponent) => {
  const playerChoice = {
    X: {
      A: "Z",
      B: "X",
      C: "Y",
    },
    Y: {
      A: "X",
      B: "Y",
      C: "Z",
    },
    Z: {
      A: "Y",
      B: "Z",
      C: "X",
    },
  };
  return playerChoice[player][opponent];
};
