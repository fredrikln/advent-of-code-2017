const fs = require('fs')
let input = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map(v => parseInt(v, 10))

let pointer = 0
let steps = 0
while (input[pointer] !== undefined) {
  let val = input[pointer]
  input[pointer]++
  pointer += val
  steps++
}

console.log('Part 1:', steps)

input = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map(v => parseInt(v, 10))

pointer = 0
steps = 0
while (input[pointer] !== undefined) {
  let val = input[pointer]
  if (val >= 3) input[pointer]--
  else input[pointer]++
  pointer += val
  steps++
}

console.log('Part 1:', steps)
