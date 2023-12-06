const fs = require('fs');
const path = require('path');
const input = path.join(__dirname, '/input.txt');

let lines = fs.readFileSync(input, "utf8").split("\n");


/*
for i in time allowed,
check if holding i milliseconds then releasing for remaining milliseconds beats the record
if it does, add to count
multiply count of each race
*/
function beatsRecord(maxTime, record, holdMilliseconds) {
    if(holdMilliseconds < 0 || holdMilliseconds > maxTime) return false;

    //holdMilliseconds will correspond to speed of boat
    //maxTime - holdMilliseconds is time left for boat to move
    return ((maxTime - holdMilliseconds) * holdMilliseconds) > record
}


let times = lines[0].split(RegExp("\ +")).slice(1).map(s => parseInt(s));
let records = lines[1].split(RegExp("\ +")).slice(1).map(s => parseInt(s));


let waysWin = 1;
for (let i = 0; i < times.length; i++) {
    let count = 0;
    let time = times[i]
    for (let j = 1; j < time; j++) {
        if(beatsRecord(time, records[i], j)) {
            count++;
        }
    }

    waysWin *= count
}

console.log(waysWin);