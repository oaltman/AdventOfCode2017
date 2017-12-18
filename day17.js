function* circularBuffer(stepSize) {
	let [buffer, position, next] = [{ 0: 0 }, 0, 1]
	while (true) {
		for (let s = 0; s < stepSize; s++) {
			position = buffer[position]
		}
		buffer[next] = buffer[position]
		buffer[position] = next++
		position = buffer[position]
		yield [buffer, next, position]
	}
}

const buff = circularBuffer(386)
for (let i = 0; i < 50000001; i++) {
	let [buffer, next, position] = buff.next().value
	if (i % 1000000 === 0) {
		console.log(next)
	}
	if (next === 50000001) {
		console.log("GOAL", buffer[0])
		break
	}
}
