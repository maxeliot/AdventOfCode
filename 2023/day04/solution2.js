var fs = require('fs');
const path = require('path');
const input = path.join(__dirname, '/input.txt');

var lines = fs.readFileSync(input, "utf8").split("\n");

//2nd attribute is the count of original + copies we get
lines = lines.map(s => [s, 1]);


for(let i = 0; i < lines.length; i++) {
    let line = lines[i][0];

    let winningNumbers = line.split("|")[0].split(":")[1].split(/\ +/).splice(1).slice(0,-1)
    let myNumbers = line.split("|")[1].concat("  ").split(/\ +/).splice(1).slice(0,-1)
    
    let count = 0;
    for (let j = 0; j < myNumbers.length; j++) {
        if(winningNumbers.includes(myNumbers[j])) count++;
    }

    //add amount of copies to next lines
    for (let k = 0; k < count; k++) {
        lines[i + k + 1][1] += lines[i][1]
    }

}

var sum = 0;
for (var line of lines) {
    sum += line[1]
}

console.log(sum);
