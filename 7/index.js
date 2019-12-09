const fs = require('fs')
let input = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')



const programs = {}

const calculateNodeWeight = (program) => {
  if (program.children.length === 0) { return program.weight }

  return program.weight + program.children.reduce((acc, next) => acc + calculateNodeWeight(next), 0)
}

const getUnbalancedChild = (program) => {
  if (program.children.length === 0) {
    return null
  }

  const childrenSortedByWeight = program.children.sort((a,b) => (calculateNodeWeight(a) === calculateNodeWeight(b)) ? -1 : 1)

  // all same weight
  if (calculateNodeWeight(childrenSortedByWeight[0]) === calculateNodeWeight(childrenSortedByWeight[1])) {
    return null
  }

  return childrenSortedByWeight[0]
}

const createProgram = (name, parent, weight) => {
  if (programs[name]) {
    if (parent) programs[name].parent = parent
    if (weight) programs[name].weight = weight
  } else {
    programs[name] = {
      name,
      parent,
      weight,
      children: []
    }
  }

  return programs[name]
}

input.forEach(p => {
  const [program, children] = p.split(' -> ')

  const programRegex = /([a-z]+) \(([0-9]+)\)/

  const match = program.match(programRegex)
  let name = match[1]
  let weight = parseInt(match[2], 10)

  let parent = createProgram(name, null, weight)

  if (children) {
    children.split(', ').forEach(c => {
      let child = createProgram(c, parent, null)
      parent.children.push(child)
    })
  }
})

// Part 1
const root = Object.values(programs).filter(p => !p.parent)[0]
console.log('Part 1:', root.name)

// Part 2
let unbalancedChild = getUnbalancedChild(root)
let lastGood = root

while (unbalancedChild) {
  lastGood = unbalancedChild
  unbalancedChild = getUnbalancedChild(unbalancedChild)
}

const children = lastGood.children.sort((a,b) => calculateNodeWeight(a) === calculateNodeWeight(b) ? 1 : -1)
// children.forEach(c => console.log(`${c.name} ${c.weight} ${calculateNodeWeight(c)} ${c.children.map(c2 => calculateNodeWeight(c2))}`))
const erroneousNodeWeight = calculateNodeWeight(children[0])
const correctNodeWeight = calculateNodeWeight(children[1])

const diff = (correctNodeWeight - erroneousNodeWeight)

const correctWeight = children[0].weight + diff

console.log('Part 2:', correctWeight)
