const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')

let generatorAValue = parseInt(input[0].split(' ').reverse()[0], 10)
let generatorBValue = parseInt(input[1].split(' ').reverse()[0], 10)

const generatorAFactor = 16807
const generatorBFactor = 48271

let matches = 0

const mask = (1 << 16) - 1

// Part 1

for (let i = 0; i < 40000000; i++) {
  generatorAValue = (generatorAValue * generatorAFactor) % 2147483647
  generatorBValue = (generatorBValue * generatorBFactor) % 2147483647

  const aMasked = generatorAValue & mask
  const bMasked = generatorBValue & mask

  if (aMasked === bMasked) {
    matches++
  }
}

console.log('Part 1:', matches)

// Part 2

generatorAValue = parseInt(input[0].split(' ').reverse()[0], 10)
generatorBValue = parseInt(input[1].split(' ').reverse()[0], 10)

let aList = []
let bList = []

matches = 0

while (aList.length != 5000000) {
  generatorAValue = (generatorAValue * generatorAFactor) % 2147483647

  if (generatorAValue % 4 === 0) {
    aList.push(generatorAValue)
  }
}
while (bList.length != 5000000) {
  generatorBValue = (generatorBValue * generatorBFactor) % 2147483647

  if (generatorBValue % 8 === 0) {
    bList.push(generatorBValue)
  }
}

for (let i = 0; i < aList.length; i++) {
  const aMasked = aList[i] & mask
  const bMasked = bList[i] & mask

  if (aMasked === bMasked) {
    matches++
  }
}

console.log('Part 2:', matches)
