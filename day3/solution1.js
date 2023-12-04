/* 
algorithm idea
store the input in a 2d array.
scan the array until you find a digit. if it is next to a symbol read the entire number,
add it to the sum and skip until next period. otherwise move to next char (could be digit or period)
*/
var fs = require('fs');
const path = require('path');
const input = path.join(__dirname, '/input.txt');

var lines = fs.readFileSync(input, "utf8").split("\n");
var table = lines.map(line => line.split(""))

//Includes itself in the neighbours, not a problem for this coding challenge
function tableNeighboursOf(table, x, y) {
    var xStart = Math.max(x - 1, 0)
    var xEnd = Math.min(x + 1, table.length - 1)
    var yStart = Math.max(y - 1, 0)
    var yEnd = Math.min(y + 1, table[0].length - 1)

    var neighbours = []

    for(let i = xStart; i <= xEnd; i++) {
        for(let j = yStart; j <= yEnd; j++) {
            neighbours.push(table[i][j])
        }
    }

    return neighbours
}

function isCharNumber(c) {
    return c >= '0' && c <= '9';
}

function isSymbol(c) {
    return !isCharNumber(c) && c != '.';
}

function readNumberAt(table, x, y) {
    var firstDigit = y;
    while(firstDigit > - 1 && isCharNumber(table[x][firstDigit])) {
        firstDigit--;
    }

    var lastDigit = y;
    while(lastDigit < table.length && isCharNumber(table[x][lastDigit])) {
        lastDigit++;
    }

    var strNumber = ""
    for(let i = firstDigit+1; i < lastDigit; i++) {
        strNumber += table[x][i];
    }

    return [parseInt(strNumber), lastDigit];
}

var sum = 0

for(let i = 0; i < table.length; i++) {
    for(let j = 0; j < table[0].length; j++) {
        if(isCharNumber(table[i][j])
        && tableNeighboursOf(table, i, j).filter(c => isSymbol(c)).length != 0) {
           var [number, lastDigit] = readNumberAt(table, i, j);
           sum += number;
           j = lastDigit;
        }
    }
}

console.log(sum);