import { parseLines, readInput } from 'io'

const input = await readInput('day-06')

export const part1 = () => {
  const lines = parseLines(input)
  const races: [number, number][] = []

  const times = lines[0].split(' ').filter((n) => Number(n))
  const distances = lines[1].split(' ').filter((n) => Number(n))

  times.forEach((time, i) => {
    races[i] = [Number(time), Number(distances[i])]
  })

  let result = 1
  for (const [time, record] of races) {
    let numberOfWays = 0
    for (let i = 0; i < time; i++) {
      const distance = i * (time - i)
      if (distance > record) {
        numberOfWays++
      }
    }
    result *= numberOfWays
  }

  return result
}

export const part2 = () => {
  const lines = parseLines(input)
  const time = Number(lines[0].replaceAll(' ', '').split(':')[1])
  const record = Number(lines[1].replaceAll(' ', '').split(':')[1])

  /**
   * Find the two values where (x * (time - x)) === record + 1
   * i * (time - i) === recprd + 1
   * i*time - i*i - (record - 1) = 0
   * -i*i + i*time - (record - 1) = 0
   * a = -1
   * b = time
   * c = -(record + 1)
   * x = (-b + sqrt(b^2 - 4ac)) / 2a
   * x = (-b - sqrt(b^2 - 4ac)) / 2a
   *
   * (-b + sqrt(b^2 - 4ac)) / 2a - (-b - sqrt(b^2 - 4ac)) / 2a
   */

  return Math.ceil(Math.sqrt(time * time - 4 * (record + 1)))
}
