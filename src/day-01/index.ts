import { parseLines, readInput } from 'io'

const input = await readInput('day-01')

function isAnumber(char: string): boolean {
  return !Number.isNaN(Number.parseInt(char, 10))
}

function parseLine1(line: string): number {
  let left = 0
  let right = line.length - 1

  while (!isAnumber(line[left])) { left++ }
  while (!isAnumber(line[right])) { right-- }

  return Number.parseInt(`${line[left]}${line[right]}`, 10)
}

export function part1() {
  const lines = parseLines(input)

  return lines.reduce((acc, value) => {
    return acc + parseLine1(value)
  }, 0)
}

const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
function isValidStartingChar(char: string) {
  return ['z', 'o', 't', 'f', 's', 'e', 'n'].includes(char)
}
function isValidEndingChar(char: string) {
  return ['o', 'e', 'r', 'x', 'n', 't'].includes(char)
}
function parseLine2(line: string) {
  function helperLeft() {
    let left = 0
    while (left <= line.length - 1) {
      if (isAnumber(line[left])) {
        return Number.parseInt(line[left], 10)
      }

      if (isValidStartingChar(line[left])) {
        const index = numbers.findIndex((n) => {
          return (line.slice(left, left + n.length) === n)
        })
        if (index >= 0) {
          return index
        }
      }
      left++
    }
  }

  function helperRight() {
    let right = line.length - 1
    while (right >= 0) {
      if (isAnumber(line[right])) {
        return Number.parseInt(line[right], 10)
      }

      if (isValidEndingChar(line[right])) {
        const index = numbers.findIndex((n) => {
          return (line.slice(right - n.length + 1, right + 1) === n)
        })
        if (index >= 0) {
          return index
        }
      }
      right--
    }
  }

  const l = helperLeft() ?? 0
  const r = helperRight()

  if (typeof r === 'undefined') {
    return l * 10
  }

  return l * 10 + r
}

export function part2() {
  const lines = parseLines(input)

  return lines.reduce((acc, line) => {
    return acc + parseLine2(line)
  }, 0)
}
