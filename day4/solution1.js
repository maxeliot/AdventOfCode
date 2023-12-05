var fs = require('fs');
const path = require('path');
const input = path.join(__dirname, '/input.txt');

var lines = fs.readFileSync(input, "utf8").split("\n");

var sum = 0;

for(let i = 0; i < lines.length; i++) {
    let line = lines[i];

    let winningNumbers = line.split("|")[0].split(":")[1].split(/\ +/).splice(1).slice(0,-1)
    let myNumbers = line.split("|")[1].concat("  ").split(/\ +/).splice(1).slice(0,-1)
    
    let count = 0;
    for (let j = 0; j < myNumbers.length; j++) {
        if(winningNumbers.includes(myNumbers[j])) count++;
    }

    //important if not 0 check otherwise you add 2^(-1) = 0.5 every time you don't have any number
    if(count != 0) sum += 2**(count-1);
}

console.log(sum);
