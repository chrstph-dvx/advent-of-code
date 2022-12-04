import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readInput = (dir) =>
  fs.readFileSync(path.join(dir, "input.txt"), "utf8").split("\n");

const multiplier = {
  // case (1 for Rock, 2 for Paper, and 3 for Scissors)
  X: 1,
  Y: 2,
  Z: 3,
};

const partOne = async () => {
  const file = await readInput(__dirname);
  return file.reduce((acc, value) => {
    // oppponent: A for Rock, B for Paper, and C for Scissors.
    // player: X for Rock, Y for Paper, and Z for Scissors.
    const [opponent, player] = value.split(" ");

    let result = 0;

    // Player wins
    if (
      (player === "X" && opponent === "C") ||
      (player === "Y" && opponent === "A") ||
      (player === "Z" && opponent === "B")
    ) {
      result = 6;
    }

    // Draw
    if (
      (player === "X" && opponent === "A") ||
      (player === "Y" && opponent === "B") ||
      (player === "Z" && opponent === "C")
    ) {
      result = 3;
    }

    return acc + result + multiplier[player];
  }, 0);
};

const lose = {
  A: "Z",
  B: "X",
  C: "Y",
};
const draw = {
  A: "X",
  B: "Y",
  C: "Z",
};
const win = {
  A: "Y",
  B: "Z",
  C: "X",
};
const partTwo = async () => {
  const file = await readInput(__dirname);
  return file.reduce((acc, value) => {
    const [opponent, player] = value.split(" ");

    switch (player) {
      case "X": // Lose
        return acc + multiplier[lose[opponent]];
      case "Y": // Draw
        return acc + 3 + multiplier[draw[opponent]];
      case "Z": // Win
        return acc + 6 + multiplier[win[opponent]];
    }
  }, 0);
};

(async () => {
  console.log("Solution part one: ", await partOne());
  console.log("Solution part two: ", await partTwo());
})();
