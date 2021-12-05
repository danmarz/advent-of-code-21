import fs from 'fs'

const lines = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n\n')
  .map((x) =>
    x
      .replace(/[\n ,]+/g, ' ')
      .trim()
      .split(' ')
      .map(Number)
  )

let [drawnNmbers, ...cards] = lines

class Card {
  constructor(numbers) {
    this.numbers = numbers
    this.cardSize = 5
    this.lines = Array(this.cardSize).fill(0)
    this.columns = Array(this.cardSize).fill(0)
    this.isComplete = false
    this.numberToPosition = new Map()
    for (let i = 0; i < this.numbers.length; i++) {
      this.numberToPosition.set(this.numbers[i], {
        line: Math.floor(i / this.cardSize),
        column: i % this.cardSize,
      })
    }
  }

  addMarkedNumber(number) {
    const position = this.numberToPosition.get(number)
    if (!position) {
      return
    }
    this.lines[position.line]++
    this.columns[position.column]++
    if (
      this.lines[position.line] === this.cardSize ||
      this.columns[position.column] === this.cardSize
    ) {
      this.isComplete = true
    }
  }

//   showMap() {
//     for (const i of this.numberToPosition) {
//       console.log(i, this.numberToPosition.get(i))
//     }
//   }
}

cards = cards.map((x) => new Card(x))

let winningCard
const actuallyDrawn = []

for (const drawn of drawnNmbers) {
  let finished = false
  actuallyDrawn.push(drawn)
  for (const card of cards) {
    if (card.numbers.includes(drawn)) {
      card.addMarkedNumber(drawn)
      if (card.isComplete) {
        finished = true
        winningCard = card
        break
      }
    }
  }
  if (finished) {
    break
  }
}

const unmarkedNumbers = winningCard.numbers.filter((n) => !actuallyDrawn.includes(n))

// To guarantee victory against the giant squid, figure out which board will win
// first. What will your final score be if you choose that board?
console.log(unmarkedNumbers.reduce((a, b) => a + b, 0) * actuallyDrawn.slice(-1)) // 87456
