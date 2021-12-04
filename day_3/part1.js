import fs from 'fs'

const data = fs.readFileSync('input.txt', 'utf8')

let arr_data = data.trim().split('\n')
let arr_res = {}

// Sum all 1s in the data array and store the result
// in the arr_res object with the key being the position in line
for (let i = 0; i < arr_data.length; i++) {
  const line = arr_data[i]
  for (let j = 0; j < line.length; j++) {
    let char = Number(line[j])
    if (char == 1) {
      arr_res[j] = (arr_res[j] || 0) + char
    }
  }
}

let result = ''

// Loop through the arr_res keys and fill out the result string
for (const iterator of Object.values(arr_res)) {
  if (iterator >= arr_data.length / 2) {
    result += '1'
  } else result += '0'
}

let gamma = result
let epsilon = ''

// invert the gamma result for epsilon
for (let i = 0; i < result.length; i++) {
  const char = result[i]
  if (char === '1') {
    epsilon += '0'
  } else epsilon += '1'
}

// Convert the strings to decimal numbers
gamma = parseInt(gamma, 2)
epsilon = parseInt(epsilon, 2)

// What is the power consumption of the submarine? (Be sure to represent your
// answer in decimal, not binary.)
const pc = gamma * epsilon
console.log(pc) // 3813416
