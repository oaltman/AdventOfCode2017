function* generator(base, exp, mod, cond) {
	let value = base
	while (true) {
		value = value * exp % mod
		if (value % cond === 0) {
			yield value
		}
	}
}

const genA = generator(289, 16807, 2147483647, 4)
const genB = generator(629, 48271, 2147483647, 8)

let match = 0
const resultMod = 2 ** 16
for (let i = 0; i < 5 * 1000 * 1000; i++) {
	let valA = genA.next().value
	let valB = genB.next().value
	if (valA % resultMod === valB % resultMod) {
		match++
	}
}

console.log(match)
