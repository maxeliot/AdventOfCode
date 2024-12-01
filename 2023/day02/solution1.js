var fs = require('fs');
const path = require('path');
const input = path.join(__dirname, '/input.txt');

var lines = fs.readFileSync(input, "utf8").split("\n");

const TOTAL_RED_CUBES = 12;
const TOTAL_GREEN_CUBES = 13;
const TOTAL_BLUE_CUBES = 14;

const regexRed = /\d* red/g;
const regexBlue = /\d* blue/g;
const regexGreen = /\d* green/g;

var sum = 0;

//This code isn't very efficient, reading input 3 times over, good enough for now.
for(var gameID = 0; gameID < lines.length; gameID++) {
    var redCubes = lines[gameID].match(regexRed).map(str => parseInt(str.split(" ")[0]));
    var greenCubes = lines[gameID].match(regexGreen).map(str => parseInt(str.split(" ")[0]));
    var blueCubes = lines[gameID].match(regexBlue).map(str => parseInt(str.split(" ")[0]));

    if(redCubes.filter(x => x > TOTAL_RED_CUBES).length == 0
    && greenCubes.filter(x => x > TOTAL_GREEN_CUBES).length == 0
    && blueCubes.filter(x => x > TOTAL_BLUE_CUBES).length == 0)
    {
        sum += gameID+1;
    }
}

console.log(sum);
