const fs = require("fs")
const assert = require("assert")
function readInput(file) {
	return fs.readFileSync(file, "UTF-8").split("\n").filter(l => l.length)
}

function sum(a, b) {
	return a + b
}

function leadingZeroes(len) {
	let str = ""
	for (let i = 0; i < len; i++)
		str += "0"
	return str
}

function countOfOnes(char) {
	return parseInt(char, 16).toString(2).split("0").join("").length
}

function getId(row, col) {
	return `[${row}, ${col}]`
}

function getRegions(input) {
	const memory = {}
	let regionId = 0
	input.forEach((line, lineIndex, arr) => {
		line.split("").forEach((bit, columnIndex, lineArr) => {
			if (bit === "1") {
				const id = getId(lineIndex, columnIndex)
				memory[id] = []
				let left = (columnIndex - 1 >= 0 && lineArr[columnIndex - 1]) || "0"
				let up = (lineIndex - 1 >= 0 && arr[lineIndex - 1][columnIndex]) || "0"
				if (left === "0" && up === "0") {
					regionId++
				}
				if (left !== "0") {
					memory[id] = memory[id].concat([getId(lineIndex, columnIndex - 1)])
				}
				if (up !== "0") {
					memory[id] = memory[id].concat([getId(lineIndex - 1, columnIndex)])
				}
			}
		})
	})
	return memory
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

function unique(arr) {
	let s = new Set()
	arr.forEach(element => {
		s.add(element)
	})
	return Array.from(s)
}

function debugPrint(input, assigned) {
	input.forEach((line, lineIndex, arr) => {
		const lineData = line.split("").map((bit, columnIndex, lineArr) => {
			const id = getId(lineIndex, columnIndex)
			const str = assigned[id] ? "" + assigned[id] : ".."
			return str.length === 2 ? str : " " + str
		})
		console.log(lineData.join(" "))
	})
}

function debugReduction(hashData, i = 0, j = 7, l = 0, m = 7) {
	return hashData
		.map(line => line.substring(i, j))
		.filter((a, line) => line >= l && line <= m)
}

function asBinary(hexInput) {
	return hexInput.map(l =>
		l
			.split("")
			.map(char => {
				const len = parseInt(char, 16).toString(2).length
				const str = leadingZeroes(4 - len) + parseInt(char, 16).toString(2)
				return str
			})
			.reduce((acc, x) => acc + x, "")
	)
}

function countAssignment(regions, assigned) {
	let regionId = 1
	return Object.keys(regions).reduceRight((acc, x) => {
		const reached = subGraph(regions, [], [].concat(x, regions[x]))
		const regionByData = reached.reduce((group, x) => {
			if (group && acc[x]) return Math.min(group, acc[x])
			return acc[x]
		}, 0)
		const region = regionByData ? regionByData : regionId++
		reached.forEach(x => acc[x] = region)
		return acc
	}, assigned)
}

const hashData = readInput("day14-input.txt")
const dataInput = asBinary(hashData)
const regions = getRegions(dataInput)

let assigned = {}
let bestNumberOfGroups = null
let numberOfGroups = Infinity
while (bestNumberOfGroups != numberOfGroups) {
	bestNumberOfGroups = numberOfGroups
	assigned = countAssignment(regions, assigned)
	numberOfGroups = unique(Object.values(assigned)).length
}
console.log(bestNumberOfGroups)
