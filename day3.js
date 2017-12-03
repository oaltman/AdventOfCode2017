// SPIRAL DEPTH
function* depthRange(seed = 1) {
  while(true) {
    yield seed ** 2
    seed += 2
  }
}

function getDepth(node) {
  let depth = 0
  const depthIter = depthRange()
  while(node > depthIter.next().value) {
    depth++
  }
  return depth
}

// quartals RIGHT, UP, LEFT, DOWN
function quartalRange(depth, node) {
  const squareBase = 1 + depth * 2
  const squareMax = squareBase ** 2
  const itemsInQuartal = (squareBase-1)
  for(i=0; i < 4; i++) {
    let [quartalMin, quartalMax] = [
      squareMax - itemsInQuartal * (4-i),
      squareMax - itemsInQuartal * (4-i-1)
    ]
    if(node > quartalMin && node <= quartalMax) {
      return [i, quartalMin, quartalMax]
    }
  }
}

function nodeInfo(node) {
  if (node == 1) return [1, [0, 0], 0]
  const depth = getDepth(node)
  const [quartalId, min, max] = quartalRange(depth, node)
  const middle = (min + max) / 2

  const POS = 1
  const NEG = -1
  const [extraSteps, direction] = node > middle
    ? [node - middle, POS]
    : [middle - node, NEG]

  // x , y
  const [x, y] = (() => {
    switch (quartalId) {
      case 0: return [ POS * depth, extraSteps * direction ]
      case 1: return [ NEG * extraSteps * direction, POS * depth ]
      case 2: return [ NEG * depth, NEG * extraSteps * direction ]
      case 3: return [ extraSteps * direction, NEG * depth ]
    }
  })()

  // node, coords, manhattan distance from middle
  return [node, [x, y], depth + extraSteps]
}

function isNeighbour(a, b) {
  return Math.abs(a[0] - b[0]) <= 1 && Math.abs(a[1] - b[1]) <= 1
}

// puzzle 1
console.log("PUZZLE 1")
console.log(nodeInfo(312051))

// puzzle 2
console.log("PUZZLE 2")
const memory = []
for (let i = 1; i <= 1000; i++ ) {
  const currentInfo = nodeInfo(i)
  const count = memory.reduce((acc, elem) => {
    return isNeighbour(elem.info[1], currentInfo[1])
      ? acc + elem.value
      : acc
  }, 0) || 1
  memory.push({info: currentInfo, value: count})
  if (count > 312051) return console.log(i, count)
}
