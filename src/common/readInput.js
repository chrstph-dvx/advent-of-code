// taken from https://github.com/romellem/advent-of-code/tree/master/2022/1s
import path from "path";
import fs from "fs";

const readInput = (dir) =>
  fs
    .readFileSync(path.join(dir, "input.txt"), "utf8")
    // .toString()
    // .trim()
    .split("\n\n");

export { readInput };
