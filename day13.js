const fs = require("fs")

function sum(a, b) {
	return a + b
}

function setting(file) {
	return fs
		.readFileSync(file, "UTF-8")
		.split("\n")
		.filter(l => l.length)
		.map(l => {
			const [step, range] = l.split(": ")
			return [parseInt(step), parseInt(range)]
		})
}

function penaltyWithShift(instance, delay) {
	return instance
		.map(([step, range]) => [step + delay, range])
		.map(([step, range]) => {
			return step % (2 * (range - 1)) === 0 ? step * range : 0
		})
		.reduce(sum, 0)
}

const instance = setting("./day13-input.txt")
// answer 1
console.log(penaltyWithShift(instance, 0))
// answer 2
let delay = 0
while (penaltyWithShift(instance, delay) > 0) {
	delay++
}
console.log(delay)
