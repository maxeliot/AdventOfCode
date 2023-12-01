// Node.js program to demonstrate 
// the fs.readFile() method 

// Include fs module 
var fs = require('fs'); 

var lines = fs.readFileSync("./input.txt", "utf8").split("\n");

function isCharNumber(c) {
    return c >= '0' && c <= '9';
}

var sum = lines.map(s => Array.from(s).filter(c => isCharNumber(c))) //keep only chars that are digits
    .map(arr => `${arr[0] || '0'}${arr[arr.length -1] || '0'}`) //get first and last digit chars with default value '0'
    .map(str => parseInt(str)) //map to integers
    .reduce((x, y) => x+y) //sum it all up

console.log(sum)
