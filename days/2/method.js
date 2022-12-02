const fs = require("fs");

const outcomePoints = {
  win: 6,
  draw: 3,
  lose: 0,
};

const shapePoints = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const opponentCode = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const myCode = {
  Y: "paper",
  X: "rock",
  Z: "scissors",
};

const outcomeCode = {
  Y: "draw",
  X: "lose",
  Z: "win",
};

const rockPaperScissorsOutcome = ({ opponentShape, myShape }) => {
  switch (opponentShape) {
    case "rock":
      if (myShape === "paper") {
        return "win";
      }
      if (myShape === "rock") {
        return "draw";
      }
      if (myShape === "scissors") {
        return "lose";
      }
      break;
    case "paper":
      if (myShape === "paper") {
        return "draw";
      }
      if (myShape === "rock") {
        return "lose";
      }
      if (myShape === "scissors") {
        return "win";
      }
      break;
    case "scissors":
      if (myShape === "paper") {
        return "lose";
      }
      if (myShape === "rock") {
        return "win";
      }
      if (myShape === "scissors") {
        return "draw";
      }
      break;
  }
};

const getStrategicShape = ({ opponentShape, outcome }) => {
    switch (opponentShape) {
      case "rock":
        if (outcome === "win") {
          return "paper";
        }
        if (outcome === "draw") {
          return "rock";
        }
        if (outcome === "lose") {
          return "scissors";
        }
        break;
      case "paper":
        if (outcome === "win") {
          return "scissors";
        }
        if (outcome === "draw") {
          return "paper";
        }
        if (outcome === "lose") {
          return "rock";
        }
        break;
      case "scissors":
        if (outcome === "lose") {
          return "paper";
        }
        if (outcome === "win") {
          return "rock";
        }
        if (outcome === "draw") {
          return "scissors";
        }
        break;
    }
  };

const getPoints = () => {
  const games = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const gamesArr = games.split(/\n/);

  let myPoints = 0;
  gamesArr.map((game) => {
    const gameArr = game.split(" ");
    const opponentShape = opponentCode[gameArr[0]];
    const myShape = myCode[gameArr[1]];
    const outcome = rockPaperScissorsOutcome({ opponentShape, myShape })

    myPoints = myPoints + outcomePoints[outcome] + shapePoints[myShape]
  });

  return myPoints;
};

const getCorrectPoints = () => {
  const games = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const gamesArr = games.split(/\n/);

  let myPoints = 0;
  gamesArr.map((game) => {
    const gameArr = game.split(" ");
    const opponentShape = opponentCode[gameArr[0]];
    const outcomeNeeded = outcomeCode[gameArr[1]];
    const shape = getStrategicShape({ opponentShape, outcome: outcomeNeeded })

    myPoints = myPoints + outcomePoints[outcomeNeeded] + shapePoints[shape]
  });

  return myPoints;
};

console.log(getCorrectPoints());
