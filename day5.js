const fs = require('fs')

const instructions = fs
  .readFileSync('./input.txt', 'UTF-8')
  .split('\n')
  .filter(l => l.length)
  .map(x => parseInt(x, 10))

function stepsUntilOut(ins, pos = 0, steps = 0) {
  const [min, max] = [0, ins.length - 1]
  while(pos >= min && pos <= max) {
    if (ins[pos] >= 3) {
      pos += ins[pos]--
    } else {
      pos += ins[pos]++
    }
    steps++
  }
  return steps
}

console.log(stepsUntilOut(instructions))
