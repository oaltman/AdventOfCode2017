const fs = require('fs')

function lines (file) {
  return fs
    .readFileSync(file, 'UTF-8')
    .split('\n')
    .filter(l => l.length)
}

const memory = {}
let maxValue = 0

function ensureValue (y) {
  if (memory[y]) {
    return memory[y]
  } else {
    memory[y] = 0
    return 0
  }
}

function storeMax(value) {
  if (value > maxValue) {
    maxValue = value
  }
  return value
}

function process (lines) {
  lines.forEach(l => {
    const [x, op, dx, iff, y, cmp, yv] = l.split(' ')
    const truthy = (() => {
      switch (cmp) {
        case '>=': return ensureValue(y) >= parseInt(yv)
        case '<=': return ensureValue(y) <= parseInt(yv)
        case '<': return ensureValue(y) < parseInt(yv)
        case '>': return ensureValue(y) > parseInt(yv)
        case '==': return ensureValue(y) === parseInt(yv)
        case '!=': return ensureValue(y) !== parseInt(yv)
    }})()
    if (truthy) {
      memory[x] = op === 'inc'
        ? storeMax(ensureValue(x) + parseInt(dx))
        : storeMax(ensureValue(x) - parseInt(dx))
    }
  })
  return memory
}

const processedMemory = process(lines('./day8-input.txt'))
const values = Object.keys(processedMemory).map(k => processedMemory[k])
console.log(Math.max(...values))
console.log(maxValue)
