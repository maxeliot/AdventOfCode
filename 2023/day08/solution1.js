const { log } = require('console');
const fs = require('fs');
const path = require('path');
const input = path.join(__dirname, '/input.txt');

let lines = fs.readFileSync(input, "utf8").split("\n");

let leftRight = lines[0];

let network = lines.slice(2);
let networkMap = new Map();
for(let i = 0; i < network.length; i++) {
    let line = network[i].split(" = ");
    let node = line[0];
    let destinations = line[1].split(", ")
    networkMap.set(node, [destinations[0].slice(1), destinations[1].slice(0, -1)]);
}

let currNode = 'AAA';
let stepsCount = 0;
for(let i = 0; i < leftRight.length; i++) {
    if(leftRight[i] == 'L') {
        currNode = networkMap.get(currNode)[0];
    } else {
        currNode = networkMap.get(currNode)[1];
    }
    
    stepsCount++;
    if(currNode == 'ZZZ') {
        break;
    }
    if(i == leftRight.length - 1) {
        i = -1;
    }
}
log(stepsCount);