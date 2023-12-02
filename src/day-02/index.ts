import { parseLines, readInput } from 'io'

const input = await readInput('day-02')

function parseLineWithRegex(line: string) {
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

// Game 13: 12 red, 6 green, 2 blue; 15 green, 2 red, 4 blue; 7 green, 1 red, 3 blue
function parseLine(line: string) {
  const [game, draws] = line.split(': ')
  const gameNumber = game.split('Game ')[1]

  return draws.split('; ').reduce((acc, draw) => {
    draw.split(', ').forEach((d) => {
      const [num, color] = d.split(' ')
      acc[color].push(Number.parseInt(num, 10))
    })
    return acc
  }, {
    red: [],
    green: [],
    blue: [],
    gameNumber: Number.parseInt(gameNumber, 10),
  })
}

export const part1 = () => {
  const lines = parseLines(input)

  return lines.reduce((acc, line) => {
    const { red, green, blue, gameNumber } = parseLine(line)
    const redValid = Math.max(...red) <= max.red
    const blueValid = Math.max(...blue) <= max.blue
    const greenValid = Math.max(...green) <= max.green
    if (redValid && blueValid && greenValid) {
      return acc + gameNumber
    }
    return acc
  }, 0)
  // Regex
  // return lines.reduce((acc, line) => {
  //   const { game, reds, greens, blues } = parseLineWithRegex(line)
  //   const redsValid = Math.max(...reds) <= max.red
  //   const bluesValid = Math.max(...blues) <= max.blue
  //   const greensValid = Math.max(...greens) <= max.green
  //   if (redsValid && bluesValid && greensValid) {
  //     return acc + (game ?? 0)
  //   }

  //   return acc
  // }, 0)
}

export const part2 = () => {
  const lines = parseLines(input)

  return lines.reduce((acc, line) => {
    const { red, blue, green } = parseLine(line)
    return acc + Math.max(...red) * Math.max(...green) * Math.max(...blue)
  }, 0)

  // regex
  // return lines.reduce((acc, line) => {
  //   const { reds, greens, blues } = parseLineWithRegex(line)
  //   return acc + Math.max(...reds) * Math.max(...greens) * Math.max(...blues)
  // }, 0)
}
