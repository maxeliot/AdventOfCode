const fs = require('fs');
const path = require('path');
const input = path.join(__dirname, '/input.txt');

let lines = fs.readFileSync(input, "utf8").split("\n");


function beatsRecord(maxTime, record, holdMilliseconds) {
    if(holdMilliseconds < 0 || holdMilliseconds > maxTime) return false;

    //holdMilliseconds will correspond to speed of boat
    //maxTime - holdMilliseconds is time left for boat to move
    return ((maxTime - holdMilliseconds) * holdMilliseconds) > record
}


let time = lines[0].split(RegExp("\ +")).slice(1).reduce((acc, curr) => acc.concat(curr))
let record = lines[1].split(RegExp("\ +")).slice(1).reduce((acc, curr) => acc.concat(curr))
time = parseInt(time)
record = parseInt(record)

let waysWin = 0;
for (let j = 1; j < time; j++) {
    if(beatsRecord(time, record, j)) {
        waysWin++;
    }
}

console.log(waysWin);