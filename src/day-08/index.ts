import { parseLines, readInput } from 'io'

const input = await readInput('day-08')

function createMap(lines: string[]) {
  const map = new Map()
  for (const line of lines.slice(1)) {
    const [key, values] = line.split(' = ')
    const [left, right] = values.split(', ')
    map.set(key, {
      L: left.replace('(', ''),
      R: right.replace(')', ''),
    })
  }

  return map
}

export const part1 = () => {
  const lines = parseLines(input)
  const instructions = lines[0]

  const map = createMap(lines)

  let i = 0
  let path = 'AAA'
  while (true) {
    const instruction = instructions[i % instructions.length]
    path = map.get(path)[instruction]
    if (path === 'ZZZ') {
      return i + 1
    }
    i++
  }
}

function findExit(initialPath: string, instructions: string, map: Map<string, any>) {
  let i = 0
  let path = initialPath
  while (true) {
    const instruction = instructions[i % instructions.length]
    path = map.get(path)[instruction]
    if (path.endsWith('Z')) {
      return i + 1
    }
    i++
  }
}

function gcd(a: number, b: number) {
  let t = 0
  a < b && (t = b, b = a, a = t) // swap them if a < b
  t = a % b
  return t ? gcd(b, t) : b
}

function lcm(a: number, b: number) {
  return a / gcd(a, b) * b
}

export function part2() {
  const lines = parseLines(input)
  const instructions = lines[0]

  const map = createMap(lines)

  const paths = [...map.entries()].filter(([key]) => {
    return key.endsWith('A')
  }).map(([key]) => key)

  const cycles = paths.map((path) => {
    return findExit(path, instructions, map)
  })
  return cycles.reduce(lcm)
}
