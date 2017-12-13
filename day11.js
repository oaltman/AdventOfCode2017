fs = require("fs")

function sumVectors(a, b) {
	return a.map((x, i) => {
		return x + b[i]
	})
}

function directions(file) {
	return fs
		.readFileSync(file, "UTF-8")
		.split("\n")
		.filter(l => l.length)
		.map(l => l.split(","))[0]
		.map(d => {
			switch (d) {
				case "n":
					return [2, 0]
				case "s":
					return [-2, 0]
				case "nw":
					return [1, -1]
				case "se":
					return [-1, 1]
				case "sw":
					return [-1, -1]
				case "ne":
					return [1, 1]
			}
		})
}

function distance(directions) {
	const [a, b] = directions.reduce(sumVectors, [0, 0]).map(x => Math.abs(x))
	return Math.max(Math.round(a / 2), b)
}

directions("./day11-input.txt")
	.map((x, i, arr) => distance(arr.slice(0, i + 1))) // ANSWER 2 // .sort((a, b) => a > b)
	.forEach(x => console.log(x))
