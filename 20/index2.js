const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')

let regex = /p=<(.*)>, v=<(.*)>, a=<(.*)>/

const particles = []

input.forEach((p, i) => {
  let [, position, velocity, acceleration] = p.match(regex)

  position = position.split(',').map(v => parseInt(v, 10))
  velocity = velocity.split(',').map(v => parseInt(v, 10))
  acceleration = acceleration.split(',').map(v => parseInt(v, 10))

  particles.push({
    name: i,
    position,
    velocity,
    acceleration,
    manhattan: Math.abs(position[0]) + Math.abs(position[1]) + Math.abs(position[2])
  })
})

const step = () => {
  const collisions = {}

  particles.forEach(p => {
    p.velocity[0] += p.acceleration[0]
    p.velocity[1] += p.acceleration[1]
    p.velocity[2] += p.acceleration[2]

    p.position[0] += p.velocity[0]
    p.position[1] += p.velocity[1]
    p.position[2] += p.velocity[2]

    p.manhattan = Math.abs(p.position[0]) + Math.abs(p.position[1]) + Math.abs(p.position[2])

    if (!collisions[p.position.join(',')]) collisions[p.position.join(',')] = []
    collisions[p.position.join(',')].push(p)
  })

  let particlesToRemove = Object.values(collisions).filter(c => c.length > 1).reduce((acc, next) => acc.concat(next), [])
  particlesToRemove.forEach(p => particles.splice(particles.indexOf(p), 1))
}

let particle = null

for (let i = 0; i < 3000; i++) {
  step()
  if (i % 1000 === 0) console.log(particles.length)
}
