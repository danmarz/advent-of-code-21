import fs from 'fs'

const data = fs.readFileSync('input.txt', 'utf8')
// const matrix = data.trim().split('\n').map(line => line.split('').map(Number))
const lines = data.trim().split('\n').filter(x => Boolean(x))

const length = lines[0].length

function getCount(lines) {
  const zeros = Array(length).fill(0)
  const ones = Array(length).fill(0)

  for (const line of lines) {
    const bits = [...line]
    bits.forEach((bit, index) => {
      if (bit === '0') {
        zeros[index]++
      } else {
        ones[index]++
      }
    })
  }

  return { zeros, ones }
}

function getOxygenRating(lines, index = 0) {
  const { zeros, ones } = getCount(lines)
  let mostCommonBit = '1'
  if (zeros[index] > ones[index]) {
    mostCommonBit = '0'
  }
  const filtered = lines.filter((line) => line[index] === mostCommonBit)
  if (filtered.length === 1) {
    return filtered[0]
  }
  return getOxygenRating(filtered, index + 1)
}

function getCO2Rating(lines, index = 0) {
  const { zeros, ones } = getCount(lines)
  let leastCommonBit = '0'
  if (zeros[index] > ones[index]) {
    leastCommonBit = '1'
  }
  const filtered = lines.filter((line) => line[index] === leastCommonBit)
  if (filtered.length === 1) {
    return filtered[0]
  }
  return getCO2Rating(filtered, index + 1)
}

function part2() {
  const oxygenRating = getOxygenRating(lines)
  const CO2Rating = getCO2Rating(lines)

  console.log(parseInt(oxygenRating, 2) * parseInt(CO2Rating, 2))
}

part2()