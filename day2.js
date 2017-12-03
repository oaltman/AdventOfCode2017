const {readFileSync} = require('fs')

function* divisiblePairs (numbers) {
  for (a of numbers) {
    for (b of numbers) {
      if (a !== b && (a % b) === 0) {
        yield [a, b]
      }
    }
  }
}

const answer = readFileSync('./input.txt', 'UTF-8')
  .split('\n')
  .filter(l => l.length)
  .map(l => {
    const numbers = l
      .split('\t')
      .map(s => parseInt(s, 10))
      .filter(x => x)
    const [a, b] = divisiblePairs(numbers).next().value
    return Math.max( a / b, b / a)
  })
  .reduce((acc, ln) => acc + ln, 0)

console.log(answer)
