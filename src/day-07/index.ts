import { parseLines, readInput } from 'io'

const input = await readInput('day-07')

function order(line: string) {
  const counts: number[] = []
  const chars = line.split('')
  for (const i in chars) {
    counts[i] = chars.filter((c) => c === chars[i]).length
  }

  if (counts.includes(5)) {
    return 6
  }

  if (counts.includes(4)) {
    return 5
  }

  if (counts.includes(3) && counts.includes(2)) {
    return 4
  }

  if (counts.includes(3)) {
    return 3
  }

  if (counts.filter((c) => c === 2).length === 4) {
    return 2
  }

  if (counts.includes(2)) {
    return 1
  }

  return 0
}

const lettersMap = {
  A: 14,
  K: 13,
  Q: 12,
  J: 1,
  T: 10,
}
export const part1 = () => {
  const lines = parseLines(input)

  lines.sort((a, b) => {
    const [handA] = a.split(' ')
    const [handB] = b.split(' ')
    const orderB = order(handB)
    const orderA = order(handA)

    if (orderA === orderB) {
      for (let i = 0; i < 5; i++) {
        const charA = lettersMap[handA[i]] || handA[i]
        const charB = lettersMap[handB[i]] || handB[i]
        if (charA > charB) {
          return 1
        } else if (charB > charA) {
          return -1
        }
      }
    }
    if (orderA > orderB) {
      return 1
    }

    return -1
  })

  return lines.reduce((acc, value, i) => {
    const [, bid] = value.split(' ')
    return acc + Number(bid) * (i + 1)
  }, 0)
}

const letters = '23456789TJQKA'
function getRank(hand: string) {
  let maxOrder = 0
  if (hand.includes('J')) {
    for (const c of letters) {
      const currentOrder = order(hand.replace(/J/g, c))
      maxOrder = Math.max(currentOrder, maxOrder)
    }
  } else {
    maxOrder = order(hand)
  }
  return maxOrder
}
export const part2 = () => {
  const lines = parseLines(input)

  lines.sort((a, b) => {
    const [handA] = a.split(' ')
    const [handB] = b.split(' ')

    const orderA = getRank(handA)
    const orderB = getRank(handB)

    if (orderA === orderB) {
      for (let i = 0; i < 5; i++) {
        const charA = lettersMap[handA[i]] || handA[i]
        const charB = lettersMap[handB[i]] || handB[i]
        if (charA > charB) {
          return 1
        } else if (charB > charA) {
          return -1
        }
      }
    }
    if (orderA > orderB) {
      return 1
    }

    return -1
  })

  return lines.reduce((acc, value, i) => {
    const [, bid] = value.split(' ')
    return acc + Number(bid) * (i + 1)
  }, 0)
}
