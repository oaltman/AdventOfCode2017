const answerGold = input
.split('')
.reduce((r,x,i,a) => x === a[++i % a.length] ? r + parseInt(x, 10) : r, 0)

const answerSilver = input
.split('')
.reduce((r,x,i,a) => x === a[(i + a.length / 2) % a.length] ? r + parseInt(x, 10) : r, 0)


console.log(answerGold)
console.log(answerSilver)
