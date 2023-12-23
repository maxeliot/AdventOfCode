/*
start out at S
Take one of the 2 neighbour tiles that are valid.
For each labeled tile, the label determines the 2 available tiles
Get those two and go to the one that wasn't the previous (--> memorize previous tile)
Go to next and update previous
Do this until we are back at S.
*/

const { log } = require('console');
const fs = require('fs');
const path = require('path');
const input = path.join(__dirname, '/input.txt');

let lines = fs.readFileSync(input, "utf8").split("\n");
lines.splice(-1);

function neighbour(x, y) {
    let tile = lines[x][y];
    if(tile == 'F')
        return [[x+1, y], [x,y+1]];
    if(tile == '-')
        return [[x, y-1], [x,y+1]];
    if(tile == '|')
        return [[x-1, y], [x+1,y]];
    if(tile == 'J')
        return [[x-1, y], [x,y-1]];
    if(tile == '7')
        return [[x, y-1], [x+1,y]];
    if(tile == 'L')
        return [[x-1, y], [x,y+1]];
    else
        throw Error("Invalid tile");
}

function getPath(startX, startY) {
    //hard coded a bit lame
    let [prevX, prevY] = [92, 43];
    let [currX, currY] = [92, 44];

    let path = [[92,43]];
    do {
        const neighbours = neighbour(currX, currY).filter(tile => (tile[0] != prevX || tile[1] != prevY))[0];
        let nextX = neighbours[0];
        let nextY = neighbours[1];
        
        [prevX, prevY] = [currX, currY];
        [currX, currY] = [nextX, nextY];

        path.push([prevX, prevY]);
    } while(!(currX == startX && currY == startY))

    return path;
}


let [sX, sY] = [null, null];

outerloop:
for(let x = 0; x < lines.length; x++) {
    for(let y = 0; y < lines[0].length; y++) {
        if(lines[x][y] == 'S') {
            
            [sX, sY] = [x, y];
            break outerloop;
        }
    }
}

log(getPath(sX, sY).length/2)