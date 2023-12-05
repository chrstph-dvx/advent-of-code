import { parseLines, readInput } from 'io'

const input = await readInput('day-05')

function split(lines: string[]) {
  const soilToFertilizerIndex = lines.indexOf('soil-to-fertilizer map:')
  const fertilizerToWaterIndex = lines.indexOf('fertilizer-to-water map:')
  const waterToLightIndex = lines.indexOf('water-to-light map:')
  const lightToTemperatureIndex = lines.indexOf('light-to-temperature map:')
  const temperatureToHumidityIndex = lines.indexOf('temperature-to-humidity map:')
  const humidityToLocationIndex = lines.indexOf('humidity-to-location map:')

  const seedToSoil = lines.slice(lines.indexOf('seed-to-soil map:') + 1, soilToFertilizerIndex)
  const soilToFertilizer = lines.slice(soilToFertilizerIndex + 1, fertilizerToWaterIndex)
  const fertilizerToWater = lines.slice(fertilizerToWaterIndex + 1, waterToLightIndex)
  const waterToLight = lines.slice(waterToLightIndex + 1, lightToTemperatureIndex)
  const lightToTemperature = lines.slice(lightToTemperatureIndex + 1, temperatureToHumidityIndex)
  const temperatureToHumidity = lines.slice(temperatureToHumidityIndex + 1, humidityToLocationIndex)
  const humidityToLocation = lines.slice(humidityToLocationIndex + 1)

  return {
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  }
}

function getResultFromMap(map: string[], input: number) {
  for (const line of map) {
    const [destination, source, range] = line.split(' ').map(Number)
    if (input >= source && input <= source + range) {
      return input + destination - source
    }
  }

  return input
}

export function part1() {
  const lines = parseLines(input)
  const seeds = lines[0].split('seeds: ')[1].split(' ').map(Number)
  const {
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  } = split(lines)

  const locations = seeds.map((seed) => {
    const soil = getResultFromMap(seedToSoil, seed)
    const fertilizer = getResultFromMap(soilToFertilizer, soil)
    const water = getResultFromMap(fertilizerToWater, fertilizer)
    const light = getResultFromMap(waterToLight, water)
    const temperature = getResultFromMap(lightToTemperature, light)
    const humidity = getResultFromMap(temperatureToHumidity, temperature)
    const location = getResultFromMap(humidityToLocation, humidity)
    return location
  })

  return Math.min(...locations)
}

export function part2() {
  const lines = parseLines(input)
  const parsedSeeds = lines[0].split('seeds: ')[1].split(' ').map(Number)
  const seedsChunks = []
  // Split in array of 2
  for (let i = 0; i < parsedSeeds.length; i += 2) {
    const chunk = parsedSeeds.slice(i, i + 2)
    seedsChunks.push(chunk)
  }

  const {
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  } = split(lines)

  let min = Number.POSITIVE_INFINITY
  for (const [start, length] of seedsChunks) {
    for (let i = 0; i < length; i++) {
      const seed = start + i
      const soil = getResultFromMap(seedToSoil, seed)
      const fertilizer = getResultFromMap(soilToFertilizer, soil)
      const water = getResultFromMap(fertilizerToWater, fertilizer)
      const light = getResultFromMap(waterToLight, water)
      const temperature = getResultFromMap(lightToTemperature, light)
      const humidity = getResultFromMap(temperatureToHumidity, temperature)
      const location = getResultFromMap(humidityToLocation, humidity)
      if (location < min) {
        min = location
      }
    }
    console.log(start, ' done')
  }

  return min

  // const locations = seeds.map((seed) => {
  //   const soil = getResultFromMap(seedToSoil, seed)
  //   const fertilizer = getResultFromMap(soilToFertilizer, soil)
  //   const water = getResultFromMap(fertilizerToWater, fertilizer)
  //   const light = getResultFromMap(waterToLight, water)
  //   const temperature = getResultFromMap(lightToTemperature, light)
  //   const humidity = getResultFromMap(temperatureToHumidity, temperature)
  //   const location = getResultFromMap(humidityToLocation, humidity)
  //   return location
  // })

  // return Math.min(...locations)
  return 0
}
