let input = 377

let root = {
  value: 0,
  prev: null,
  next: null,
}

root.next = root
root.prev = root

let node = root

let counter = 1
for (let i = 0; i < 2017; i++) {
  for (let j = 0; j < input; j++) {
    node = node.next
  }

  let next = node.next
  node.next = {
    value: counter++,
    next: next,
    prev: node,
  }

  node = node.next
}

console.log('Part 1:', node.next.value)

for (let i = 2017; i < 50000000; i++) {
  for (let j = 0; j < input; j++) {
    node = node.next
  }

  if (counter % 1000000 === 0) {
    console.log(counter)
  }

  let next = node.next
  node.next = {
    value: counter++,
    next: next,
    prev: node,
  }

  node = node.next
}

while (node.value !== 0) {
  node = node.next
}

// Takes a long time
console.log('Part 2:', node.next.value)

// Copied from https://www.reddit.com/r/adventofcode/comments/7kc0xw/2017_day_17_solutions/drd6qd4/ after solved part 2
// let z = 0
// let neighbor = 0
// let pos = 0

// for (let i = 1; i < 100; i++) {
//   pos = (pos + input) % i

//   if (pos === z) {
//     neighbor = i
//   }
//   if (pos < z) {
//     z++
//   }

//   pos++
// }

// console.log('Part 2:', neighbor)
