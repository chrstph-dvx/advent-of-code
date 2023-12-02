import { parseLines, readInput } from 'io'

const input = await readInput('day-02')

function parseLine(line: string) {
  const matches = line.matchAll(/(?<game>((?<=Game )[0-9]+(?=:)))|(?<red>([0-9]+(?= red)))|(?<blue>([0-9]+(?= blue)))|(?<green>([0-9]+(?= green)))/g)
  let next = matches.next()
  const acc: {
    game: number | null
    reds: number[]
    greens: number[]
    blues: number[]
  } = {
    game: null,
    reds: [],
    greens: [],
    blues: []
  }
  while (!next.done) {
    if (next.value.groups) {
      acc.game = acc.game ?? Number.parseInt(next.value.groups.game, 10)
      next.value.groups.red && acc.reds.push(Number.parseInt(next.value.groups.red, 10))
      next.value.groups.blue && acc.blues.push(Number.parseInt(next.value.groups.blue, 10))
      next.value.groups.green && acc.greens.push(Number.parseInt(next.value.groups.green, 10))
    }
    next = matches.next()
  }

  return acc
}

const max = {
  green: 13,
  red: 12,
  blue: 14
}
export const part1 = () => {
  const lines = parseLines(input)

  return lines.reduce((acc, line) => {
    const { game, reds, greens, blues } = parseLine(line)
    const redsValid = reds.every((red) => {
      return red <= max.red
    })
    const blueValid = blues.every((blue) => {
      return blue <= max.blue
    })
    const greensValid = greens.every((green) => {
      return green <= max.green
    })
    if (redsValid && blueValid && greensValid) {
      return acc + (game ?? 0)
    }

    return acc
  }, 0)
}

export const part2 = () => {
  const lines = parseLines(input)

  return lines.reduce((acc, line) => {
    const { reds, greens, blues } = parseLine(line)
    return acc + Math.max(...reds) * Math.max(...greens) * Math.max(...blues)
  }, 0)
}
