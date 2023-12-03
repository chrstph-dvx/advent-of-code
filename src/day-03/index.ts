import { parseLines, readInput } from 'io'

const input = await readInput('day-03')

function isAnumber(char: string | number): boolean {
  return !Number.isNaN(Number.parseInt(char, 10))
}
function isSymbol(char: string | number | undefined): boolean {
  return typeof char !== 'undefined' && !isAnumber(char) && char !== '.'
}

function checkCurrentNumber(lines: string[], currentNum: string, row: number, col: number) {
  const startingCol = col - currentNum.length

  const cells = [
    // Start
    lines[row - 1]?.[startingCol - 1],
    lines[row][startingCol - 1],
    lines[row + 1]?.[startingCol - 1],
    // End
    lines[row - 1]?.[col],
    lines[row][col],
    lines[row + 1]?.[col],
  ]

  if (cells.some(isSymbol)) {
    return true
  }

  for (let i = startingCol; i < startingCol + currentNum.length; i++) {
    if ([
      lines[row - 1]?.[i],
      lines[row][i],
      lines[row + 1]?.[i],
    ].some(isSymbol)) {
      return true
    }
  }

  return false
}

export function part1() {
  const lines = parseLines(input)

  const parts = []
  let currentNum = ''

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      const cell = lines[i][j]
      if (isAnumber(cell)) {
        currentNum += cell
      } else if (currentNum) {
        if (cell === '.') {
          // End of the number, check all cells
          if (checkCurrentNumber(lines, currentNum, i, j)) {
            parts.push(currentNum)
          }
        } else {
          parts.push(currentNum)
        }
        currentNum = ''
      }
    }

    // Changing row, so we need to check the last number
    if (currentNum && checkCurrentNumber(lines, currentNum, i, lines[i].length)) {
      parts.push(currentNum)
    }

    currentNum = ''
  }

  if (currentNum && checkCurrentNumber(lines, currentNum, lines.length - 1, lines[lines.length - 1].length - 1)) {
    parts.push(currentNum)
  }

  return parts.reduce((acc, curr) => acc + Number(curr), 0)
}

function getArounds(row: number, col: number) {
  return [
    [row - 1, col - 1],
    [row, col - 1],
    [row + 1, col - 1],
    [row - 1, col],
    [row + 1, col],
    [row - 1, col + 1],
    [row, col + 1],
    [row + 1, col + 1],
  ]
}
export function part2() {
  const lines = parseLines(input)

  const parts = []
  const gears: Record<string, number[]> = {}
  let gear = null
  let currentNum = ''

  for (let i = 0; i < lines.length; i++) {
    let hasSymbolAround = false
    for (let j = 0; j < lines[i].length; j++) {
      const val = lines[i][j]
      if (isAnumber(val)) {
        currentNum += val

        for (const [row, col] of getArounds(i, j)) {
          if (lines[row]?.[col] === '*' && !hasSymbolAround) {
            hasSymbolAround = true
            gear = [row, col]
          }
        }
      } else {
        if (hasSymbolAround) {
          parts.push(currentNum)
          gears[`${gear[0]}-${gear[1]}`] = (gears[`${gear[0]}-${gear[1]}`] ?? []).concat(currentNum)
        }
        hasSymbolAround = false
        currentNum = ''
      }
    }

    if (currentNum && hasSymbolAround) {
      parts.push(currentNum)
      gears[`${gear[0]}-${gear[1]}`] = (gears[`${gear[0]}-${gear[1]}`] ?? []).concat(currentNum)
    }
  }

  return Object.keys(gears).reduce((acc, key) => {
    if (gears[key].length === 2) {
      return acc + gears[key][0] * gears[key][1]
    }
    return acc
  }, 0)
}
