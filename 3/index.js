
  let grid

  let x
  let y

  const up = [0, 1]
  const down = [0, -1]
  const left = [-1, 0]
  const right = [1, 0]

  let stepCounter
  let curMove
  let maxSteps
  let steps
  let turns

function reset() {
  grid = { '0,0': 1 }

  x = 0
  y = 0

  stepCounter = 1
  curMove = right
  maxSteps = 1
  steps = 0
  turns = 0
}

function turnLeft() {
  if (curMove === right) { curMove = up } else if (curMove === up) { curMove = left } else if (curMove === left) { curMove = down } else if (curMove === down) { curMove = right }
}

function move(partB) {
  if (turns === 2) {
    turns = 0
    maxSteps += 1
  }
  if (steps === maxSteps) {
    steps = 0
    turnLeft()
    turns++
  }

  x += curMove[0]
  y += curMove[1]

  let sum = 0
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (grid[(x+i) + ',' + (y+j)]) {
        sum += grid[(x+i) + ',' + (y+j)]
      }
    }
  }

  grid[x + ',' + y] = partB ? sum : ++stepCounter
  steps++

  return sum
}

let input = 289326


// Part 1
reset()
for (let i = 0; i < input-1; i++) {
  move()
}
console.log(x, y)
console.log('Part 2:', Math.abs(x) + Math.abs(y))


// Part 2
reset()
for (let i = 0; i < 1000; i++) {
  let sum = move(true)
  if (sum > input) {
    console.log('Part 1:', sum)
    break
  }
}


// console.log(grid)
