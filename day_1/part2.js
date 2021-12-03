import fs from 'fs'

// Consider sums of a three-measurement sliding window. How many sums are larger
// than the previous sum?

fs.readFile('file.txt', 'utf8', (err, data) => {
  let numbers = data.split('\n').map(Number)
  let count = 0

  for (let i = 0; i < numbers.length - 2; i++) {
    if (
      numbers[i] + numbers[i + 1] + numbers[i + 2] <
      numbers[i + 1] + numbers[i + 2] + numbers[i + 3]
    ) {
      count += 1
    }
  }
  console.log(count) // 1190
})
