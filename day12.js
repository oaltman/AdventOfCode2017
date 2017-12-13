const fs = require("fs")

function objectReducer(acc, [source, targets]) {
	return { ...acc, [source]: targets }
}

function graph(file) {
	return fs
		.readFileSync(file, "UTF-8")
		.split("\n")
		.filter(l => l.length)
		.map(l => {
			const [source, targetsTxt] = l.split(" <-> ")
			const targets = targetsTxt.split(", ")
			return [source, targets]
		})
		.reduce(objectReducer, {})
}

function unique(arr) {
	let s = new Set()
	arr.forEach(element => {
		s.add(element)
	})
	return Array.from(s)
}

function subGraph(graph, visited = [], toVisit = []) {
	while (toVisit.length) {
		const current = toVisit[0]
		visited = unique(visited.concat(current))
		toVisit = toVisit
			.slice(1)
			.concat(
				graph[current].filter(
					x => !visited.some(e => e === x) && !toVisit.some(e => e === x)
				)
			)
	}
	return visited
}

function findAllGroups(g) {
	let unreached = Object.keys(g)
	let groups = []
	while (unreached.length) {
		let group = subGraph(g, [], [unreached[0]])
		groups.push(group)
		unreached = unreached.filter(x => group.every(e => e !== x))
	}
	return groups
}

const g = graph("./day12-input.txt")
// ASNWER 1
console.log(subGraph(g, [], ["0"]).length)
// ANSWER 2
console.log(findAllGroups(g).length)
