const fs = require('fs')

const banksInput = fs
  .readFileSync('./day6-input.txt', 'UTF-8')
  .split('\n')
  .filter(l => l.length)
  .map(x => parseInt(x, 10))

const history = {}

function solve(banks) {
  let currId = banks.join(',')
  let steps = 0
  while(!history[currId]) {
    history[currId] = steps
    steps++
    let max = Math.max(...banks)
    let sourceId = banks
      .map((x, i) => [x, i])
      .filter(([x, i]) => x === max)
      .map((([x, i]) => i))[0]
    banks[sourceId] = 0
    while(max--) {
      banks[++sourceId % banks.length]++
    }
    currId = banks.join(',')
  }

  return [steps, steps - history[currId]]
}

console.log(solve(banksInput))
