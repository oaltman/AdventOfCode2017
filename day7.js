const fs = require('fs')


function lines (file) {
  return fs
    .readFileSync(file, 'UTF-8')
    .split('\n')
    .filter(l => l.length)
    .map(l => l.split('->'))
}

function sum (acc, x) {
  return acc + x
}

function graph (lines) {
  return lines
    .map(([parentRaw, childrenRaw]) => {
      const [name, weightRaw] = parentRaw.split(' ')
      // bleh
      const weight = parseInt(weightRaw.replace('(', '').replace(')', ''), 10)
      const children = (childrenRaw || '').split(' ').filter(Boolean).map(x => x.replace(',', ''))
      return {name, weight, children}
    })
    .reduce((acc, entry) => {
      return Object.assign(acc, {[entry.name]: {children: entry.children, weight: entry.weight}})
    }, {})
}

function root (graph) {
  let node = Object.keys(graph)[0]
  while(node) {
    let parent = Object.keys(graph).find(parent => graph[parent].children.includes(node))
    if (parent) {
      node = parent
    }
    else {
      return node
    }
  }
}

function weightOf (graph, root) {
  return graph[root].weight + graph[root].children
    .map(node => weightOf(graph, node))
    .reduce(sum, 0)
}

function weightOfSubprogramToBalanceGraph (graph, root, balanceOffset = 0) {
  const weights = graph[root].children.map(node => weightOf(graph, node))
  const weightAvg = weights.reduce(sum, 0) / weights.length
  const [[wW, iW], [wC, iC]] = weights
    .map((x, i) => [x, i])
    .sort(([wA], [wB]) => Math.abs(wB - weightAvg) - Math.abs(wA - weightAvg))
  if (weightAvg !== wW) {
    return weightOfSubprogramToBalanceGraph (graph, graph[root].children[iW], wC - wW)
  } else {
    return graph[root].weight + balanceOffset
  }
}

const g = graph(lines('./day7-input.txt'))
console.log(root(g))
console.log(weightOfSubprogramToBalanceGraph(g, root(g)))
