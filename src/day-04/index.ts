import { parseLines, readInput } from 'io'

const input = await readInput('day-04')

// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
function splitDecks(line: string) {
  const singleSpacedLine = line.replace(/\s+/g, ' ')
  const [cardNumber, decks] = singleSpacedLine.split(': ')
  const [deck1, deck2] = decks.split(' | ')

  return [
    deck1.split(' ').map(Number),
    deck2.split(' ').map(Number),
    cardNumber.match(/\d+/)
  ] as const
}

function computeCard(line: string, part: 'part1' | 'part2') {
  const [deck1, deck2, cardNumber] = splitDecks(line)

  let sum = 0
  for (const number of deck2) {
    if (deck1.includes(number)) {
      sum++
    }
  }

  if (part === 'part1') {
    return [sum ? 2 ** (sum - 1) : 0, cardNumber![0]] as const
  }

  return [sum, cardNumber![0]] as const
}

export function part1() {
  const lines = parseLines(input)

  let sum = 0
  for (const line of lines) {
    sum += computeCard(line, 'part1')[0]
  }

  return sum
}

export function part2() {
  const lines = parseLines(input)
  const cards: Record<string, number> = {}

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const [sum, cardNumber] = computeCard(line, 'part2')
    cards[cardNumber] = (cards[cardNumber] ?? 0) + 1

    const numbers = lines.slice(i + 1, i + 1 + sum).map((l) => computeCard(l, 'part2')[1])
    for (const number of numbers) {
      cards[number] = (cards[number] ?? 0) + 1 * cards[cardNumber]
    }
  }

  return Object.values(cards).reduce((acc, curr) => acc + curr, 0)
}
