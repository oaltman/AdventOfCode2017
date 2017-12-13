const fs = require("fs")

function lengths(file) {
  return fs
    .readFileSync(file, "UTF-8")
    .split("\n")
    //.filter(l => l.length)
    .map(l => l.split(","))[0]
    .map(x => parseInt(x, 10))
}

function lengthsAsBytes(file) {
  return fs
    .readFileSync(file, "UTF-8")
    .split("\n")
    .filter(l => l.length)[0]
    .split("")
    .map(c => c.charCodeAt(0))
    .concat([17, 31, 73, 47, 23])
}

function range(from, to) {
  let arr = []
  for (let i = from; i <= to; i++)
    arr.push(i)
  return arr
}

function step(curr, len, position, skip) {
  const p1 = [position, Math.min(position + (len - 1), curr.length - 1)]
  const p2 = len - (p1[1] - p1[0] + 1) ? [0, len - (p1[1] - p1[0]) - 2] : []
  const reverted = p2.length
    ? []
        .concat(curr.slice(p1[0], p1[1] + 1), curr.slice(p2[0], p2[1] + 1))
        .reverse()
    : [].concat(curr.slice(p1[0], p1[1] + 1)).reverse()

  reverted.forEach((x, i) => {
    curr[(position + i) % curr.length] = x
  })

  return [curr, (position + len + skip) % curr.length, skip + 1]
}

function knotHashStep([base, pos, skip], lengths) {
  return lengths.reduce(
    ([hash, pos, skip], l, i) => {
      return step(hash, l, pos, skip)
    },
    [base, pos, skip]
  )
}

function denseHashReducer(acc, x , i) {
  return (i > 0 ? acc ^ x : x)
}

function blocksReducer(acc, x, i, arr) {
  return (i + 1) % 16 == 0 ? acc.concat([arr.slice(i - 15, i + 1)]) : acc
}

const bytes = lengthsAsBytes("./day10-input.txt")
let [hash, pos, skip] = [range(0, 255), 0, 0]
for (let i = 0; i < 64; i++) {
  ;[hash, pos, skip] = knotHashStep([hash, pos, skip], bytes)
}
const final = hash
  .reduce(blocksReducer, [])
  .map(block => block.reduce(denseHashReducer, 0))
  .map(x => x.toString(16))
  .join('')

console.log(final)
