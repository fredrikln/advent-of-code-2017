const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8').trim().split(',')

let programs = 'abcdefghijklmnop'.split('')

let spin = 's'
let exchange = 'x'
let partner = 'p'

const pattern = /([sxp])([0-9a-z]+)\/?([0-9a-z]+)?/
let instructions = input.map(i => {
  const [, instruction, a, b] = i.match(pattern)
  return [instruction, a, b]
})

// Part 1

for (let [instruction, a, b] of instructions) {
  switch (instruction) {
    case spin:
      programs = [...programs.slice(-a), ...programs.slice(0, programs.length - a)]
      break

    case exchange:
      const temp = programs[a]
      programs[a] = programs[b]
      programs[b] = temp
      break

    case partner:
      const index1 = programs.indexOf(a)
      const index2 = programs.indexOf(b)

      const temp2 = programs[index1]
      programs[index1] = programs[index2]
      programs[index2] = temp2
      break
  }
}

console.log('Part 1:', programs.join(''))

// Part 2

let cycles = new Set()

programs = 'abcdefghijklmnop'.split('')

for (let i = 0; i < 100; i++) {
  for (let [instruction, a, b] of instructions) {
    switch (instruction) {
      case spin:
        programs = [...programs.slice(-a), ...programs.slice(0, programs.length - a)]
        break

      case exchange:
        const temp = programs[a]
        programs[a] = programs[b]
        programs[b] = temp
        break

      case partner:
        const index1 = programs.indexOf(a)
        const index2 = programs.indexOf(b)

        const temp2 = programs[index1]
        programs[index1] = programs[index2]
        programs[index2] = temp2
        break
    }
  }

  let name = programs.join('')
  cycles.add(name)
}

let uniqueCycles = cycles.size
cycles = new Set()

programs = 'abcdefghijklmnop'.split('')

for (let i = 0; i < (1000000000 % uniqueCycles); i++) {
  for (let [instruction, a, b] of instructions) {
    switch (instruction) {
      case spin:
        programs = [...programs.slice(-a), ...programs.slice(0, programs.length - a)]
        break

      case exchange:
        const temp = programs[a]
        programs[a] = programs[b]
        programs[b] = temp
        break

      case partner:
        const index1 = programs.indexOf(a)
        const index2 = programs.indexOf(b)

        const temp2 = programs[index1]
        programs[index1] = programs[index2]
        programs[index2] = temp2
        break
    }
  }

  let name = programs.join('')
  cycles.add(name)
}

console.log('Part 2:', programs.join(''))
