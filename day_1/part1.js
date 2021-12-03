import fs from 'fs'

// How many measurements are larger than the previous measurement?

fs.readFile('file.txt', 'utf8', (err, data) => {
  let numbers = data.split('\n').map(Number)
  let count = 0

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i + 1] > numbers[i]) {
      count += 1
    }
  }
  console.log(count) // 1162
})
