/*
1. expand the universe
go line by line from the top, if on empty line insert copy above
same for columns
3. get galaxies coordinates
2. calculate distances
distance between two points is manhattan distance
*/

const fs = require('fs');
const path = require('path');
const input = path.join(__dirname, '/input.txt');
const { log } = require('console');

let lines = fs.readFileSync(input, "utf8").split("\n");
lines.pop();


function expandUniverse(universe) {

    //expand rows
    for(let i = 0; i < universe.length; i++) {
        if(!universe[i].includes('#')) {
            universe.splice(i, 0, universe[i]);
            i++;
        }
    }

    universe = universe.map(line => line.split(""));
    //transpose matrix
    let universeT = Array.from({ length: universe[0].length }, () => []);
    for (let i = 0; i < universe.length; i++) {
        for (let j = 0; j < universe[0].length; j++) {
            universeT[j][i] = universe[i][j];
        }
    }
    
    universeT = universeT.map(line => line.join(""))

    //expand columns of initial universe 
    for(let k = 0; k < universeT.length; k++) {
        if(!universeT[k].includes('#')) {
            //log("hi")
            universeT.splice(k, 0, universeT[k]);
            k++;
        }
    }

    return universeT;
}

let expandedUniverse = expandUniverse(lines).map(line => line.split(""));

let galaxiesCoordinates = [];
for(let i = 0; i < expandedUniverse.length; i++) {
    for (let j = 0; j < expandedUniverse[0].length; j++) {
        if(expandedUniverse[i][j] == '#') {
            galaxiesCoordinates.push([i, j]);
        }
    }
}


let distance = 0

for(let i = 0; i < galaxiesCoordinates.length; i++) {
    for(let j = 0; j < galaxiesCoordinates.length; j++) {
        if(i < j) {
            distance += Math.abs(galaxiesCoordinates[i][0] - galaxiesCoordinates[j][0]) + Math.abs(galaxiesCoordinates[i][1] - galaxiesCoordinates[j][1]);
        }
        
    }
}

log(distance);