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
    this.markedNumbers = new Set()
  }

  addMarkedNumber(number) {
    const position = this.numberToPosition.get(number)
    if (!position) {
      return
    }
    this.markedNumbers.add(number)
    this.lines[position.line]++
    this.columns[position.column]++
    if (
      this.lines[position.line] === this.cardSize ||
      this.columns[position.column] === this.cardSize
    ) {
      this.isComplete = true
    }
  }

  unmarkedNumbers() {
    return this.numbers.filter((number) => !this.markedNumbers.has(number))
  }

  showCard() {
    const array = []
    for (let i = 0; i < this.cardSize; i++) {
      array.push(
        this.numbers
          .slice(i * this.cardSize, i * this.cardSize + this.cardSize)
          .map((n) => (this.markedNumbers.has(n) ? `\x1b[31m${n}\x1b[0m` : n))
          .join('\t')
      )
    }
    console.log(array.join('\n') + '\n')
  }

  //   showMap() {
  //     for (const i of this.numberToPosition) {
  //       console.log(i, this.numberToPosition.get(i))
  //     }
  //   }
}

cards = cards.map((x) => new Card(x))

let lastWinningCard
let lastWinningNumber
const actuallyDrawn = []

for (const drawn of drawnNmbers) {
  actuallyDrawn.push(drawn)
  let hasIncompleteCards = false
  for (const card of cards) {
    if (!card.isComplete) {
      hasIncompleteCards = true
      card.addMarkedNumber(drawn)
      // card.showCard()
      if (card.isComplete) {
        lastWinningCard = card
        lastWinningNumber = drawn
      }
    }
  }
  if (!hasIncompleteCards) {
    break
  }
}

const unmarkedNumbers = lastWinningCard.unmarkedNumbers()

// Figure out which board will win last. Once it wins, what would its final score be?
console.log(unmarkedNumbers.reduce((a, b) => a + b, 0) * lastWinningNumber) // 15561
// console.log(
//   unmarkedNumbers.reduce((a, b) => a + b, 0),
//   lastWinningNumber,
//   lastWinningCard.showCard()
// )
