const fs = require("fs")

function instructions(file) {
	return fs
		.readFileSync(file, "UTF-8")
		.split("\n")
		.filter(l => l.length)
		.map(l => l.split(","))[0]
}

function spin(instruction, formation) {
	const len = parseInt(instruction.substring(1), 10)
	const group = formation.substring(formation.length - len, formation.length)
	return group + formation.substring(0, formation.length - len)
}

function exchange(instruction, formation) {
	const [ia, ib] = instruction.substring(1).split("/").map(x => parseInt(x, 10))
	const [a, b] = [formation[ia], formation[ib]]
	let formationAsArray = formation.split("")
	formationAsArray[ia] = b
	formationAsArray[ib] = a
	return formationAsArray.join("")
}

function partner(instruction, formation) {
	const [a, b] = instruction.substring(1).split("/")
	const [ia, ib] = [formation.indexOf(a), formation.indexOf(b)]
	let formationAsArray = formation.split("")
	formationAsArray[ia] = b
	formationAsArray[ib] = a
	return formationAsArray.join("")
}

function dance(instructions, formation) {
	const ordered = instructions.concat().reverse()
	while (ordered.length) {
		let ins = ordered.pop()
		formation = (formation => {
			switch (ins[0]) {
				case "p":
					return partner(ins, formation)
				case "x":
					return exchange(ins, formation)
				case "s":
					return spin(ins, formation)
			}
		})(formation) // yield formation
	}
	return formation
}

const ins = instructions("./day16-input.txt")
// const ins = ['s1', 'x3/4', 'pe/b']

const initFormation = "abcdefghijklmnop"
// const initFormation = 'abcde'

const memory = {}

let formation = initFormation
for (let i = 0; i < 1000 * 1000; i++) {
	if (!memory[formation]) {
		memory[formation] = dance(ins, formation)
	}
	formation = memory[formation]
}
console.log(formation)
