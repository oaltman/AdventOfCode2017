const {readFileSync} = require('fs')
const sum = (acc, x) => acc + x

// puzzle 1
const asnwer1 = readFileSync('day4-input.txt', 'UTF-8')
  .split('\n')
  .filter(l => l.length)
  .map(line => {
    const wordsSorted = line
      .split(' ')
      .filter(l => l.length)
      .sort()
    return wordsSorted.find((x, i, arr) => i > 0 && x === arr[i - 1])
     ? 0
     : 1
  })
  .reduce(sum, 0)

console.log(asnwer1)

// puzzle 2
const asnwer2 = readFileSync('day4-input.txt', 'UTF-8')
  .split('\n')
  .filter(l => l.length)
  .map(line => {
    const wordsSorted = line
      .split(' ')
      .filter(l => l.length)
      .map(word => {
        return word
          .split('')
          .sort()
          .join('')
      })
      .sort()
    return wordsSorted.find((x, i, arr) => i > 0 && x === arr[i - 1])
      ? 0
      : 1
  })
  .reduce(sum, 0)

console.log(asnwer2)
