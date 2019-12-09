const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')

let validPassPhrase = (passphrase) => {
  let words = passphrase.split(' ')
  let set = new Set(words)

  return words.length === set.size
}

const permutator = inputArr => {
  if (inputArr.length === 1) return [inputArr]

  const result = []
  for (let i = 0; i < inputArr.length; i++) {
    const copy = inputArr.slice() // make copy

    const element = copy.splice(i, 1)

    for (const perm of permutator(copy)) {
      result.push(element.concat(perm))
    }
  }

  return result
}

let doesNotContainsAnagram = (passphrase) => {
  let words = passphrase.split(' ')
  let set = new Set(words)

  for (let word of words) {
    let permutations = new Set(permutator(word.split('')).map(w => w.join('')).slice(1))
    permutations.delete(word)

    for (let perm of permutations) {
      if (set.has(perm)) {
        return false
      }
    }
  }

  return true
}

let validPassphrases = input.filter(validPassPhrase)
console.log('Part 1:', validPassphrases.length)

validPassphrases = validPassphrases.filter(doesNotContainsAnagram)
console.log('Part 2:', validPassphrases.length)
