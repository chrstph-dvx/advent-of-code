import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readInput = (dir) =>
  fs.readFileSync(path.join(dir, "input.txt"), "utf8").split("\n\n");

const partOne = async () => {
  const file = await readInput(__dirname);
  return file.reduce((max, lines) => {
    const calories = lines.split("\n").reduce((a, l) => a + parseInt(l, 10), 0);

    return Math.max(max, calories);
  }, -Infinity);
};

const partTwo = async () => {
  const file = await readInput(__dirname);
  const solution = file.reduce(
    (stack, lines, i) => {
      const calories = lines
        .split("\n")
        .reduce((a, l) => a + parseInt(l, 10), 0);

      if (calories < stack[0]) {
        return stack;
      }

      if (calories > stack[2]) {
        return [stack[1], stack[2], calories];
      }

      if (calories > stack[1]) {
        return [stack[1], calories, stack[2]];
      }

      return [calories, stack[1], stack[2]];
    },
    [-Infinity, -Infinity, -Infinity]
  ); // From min to max

  return solution.reduce((acc, calories) => acc + calories, 0);
};

(async () => {
  console.log("Solution part one: ", await partOne());
  console.log("Solution part two: ", await partTwo());
})();
