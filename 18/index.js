const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')

let pointer = 0

let lastPlayedSound = null

let registers = {}
const getRegister = (key) => registers[key] || 0
const setRegister = (key, value) => registers[key] = value
const getValue = (value) => isNaN(parseInt(value, 10)) ? getRegister(value) : parseInt(value, 10)

while (input[pointer]) {
  const value = input[pointer]

  let [instruction, a, b] = value.split(' ')

  aVal = getValue(a)
  bVal = getValue(b)

  switch (instruction) {
    case 'snd':
      lastPlayedSound = aVal
      pointer++
      break

    case 'set':
      setRegister(a, bVal)
      pointer++
      break

    case 'add':
      setRegister(a, aVal + bVal)
      pointer++
      break

    case 'mul':
      setRegister(a, aVal * bVal)
      pointer++
      break

    case 'mod':
      setRegister(a, aVal % bVal)
      pointer++
      break

    case 'rcv':
      if (aVal) {
        console.log(lastPlayedSound)
        pointer = input.length
      }
      pointer++
      break

    case 'jgz':
      if (aVal > 0) {
        pointer += bVal
      }
      else {
        pointer++
      }
      break
  }
}
