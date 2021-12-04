import fs from 'fs'

// Calculate the horizontal position and depth you would have after following
// the planned course. What do you get if you multiply your final horizontal
// position by your final depth?

// Read the input file
const data = fs.readFileSync('input.txt', 'utf8', (err, data) => {
  return data
})

// Split the input into an array of strings
let instructions = data.trim().split('\n')

// Declare aim and current position
let aim = 0

let v_pos = 0
let h_pos = 0

// Parse instructions
instructions.forEach((instruction) => {
  let split_instruction = instruction.split(' ')
  let command = split_instruction[0]
  let value = split_instruction[1]

  if (command === 'up') {
    aim -= parseInt(value)
  }
  if (command === 'down') {
    aim += parseInt(value)
  }
  if (command === 'forward') {
    v_pos += parseInt(value) * aim
    h_pos += parseInt(value)
  }
})

console.log(v_pos * h_pos) // Answer: 1997106066
