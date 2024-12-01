const fs = require('fs');
const path = require('path');
const input = path.join(__dirname, '/input.txt');

let lines = fs.readFileSync(input, "utf8").split("\n");

function nextInput(numbers) {
    let sequence = [numbers];
    let currIndex = 0;
    while(sequence[sequence.length-1].filter(nbr => nbr != 0).length != 0) {
        let nextSequence = [];
        for(let j = 0; j < sequence[currIndex].length - 1; j++) {
            nextSequence[j] = sequence[currIndex][j+1] - sequence[currIndex][j];
        }
        sequence[currIndex+1] = nextSequence;
        currIndex++;
    }
    sequence[sequence.length - 1].unshift(0);

    for(let i = sequence.length - 2; i >= 0; i--) {
        sequence[i].unshift(sequence[i].shift() - sequence[i+1].shift())
    }

    return sequence[0].shift();
}

let sum = 0;
for(numbers of lines) {
    sum += nextInput(numbers.split(" ").map(str => parseInt(str)));
}

console.log(sum);