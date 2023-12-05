const fs = require('fs');
const path = require('path');
const input = path.join(__dirname, '/input.txt');

let lines = fs.readFileSync(input, "utf8").split("\n");

let seeds = lines[0].split(" ");
seeds.shift()
seeds = seeds.map(str => parseInt(str)); //Get only the numbers

function getNumbersFrom(str) {
    numbers = [];
    let idx  = lines.indexOf(str) + 1;
    while(lines[idx].length > 3) {
        numbers.push(lines[idx]);
        idx++;
    }
    
    return numbers.map(numbers => numbers.split(" ")).map(arr => arr.map(str => parseInt(str)));
}

function mapNumber(ranges, x) {
    srcRangeStart = ranges[1]
    rangeSize = ranges[2]
    destRangeStart = ranges[0]
    if(srcRangeStart <= x && x < srcRangeStart + rangeSize) {
        return destRangeStart + (x - srcRangeStart)
    }
    return x
}

function mapFromNumbers(numbers, x) {
    for(let i = 0; i < numbers.length; i++) {
        let subset = numbers[i];
        let y = mapNumber(subset, x);
        if(y != x) {
            return y;
        }
    }
    return x;
}


let seedToSoil = getNumbersFrom("seed-to-soil map:");
let soilToFert = getNumbersFrom("soil-to-fertilizer map:");
let fertToWater = getNumbersFrom("fertilizer-to-water map:");
let waterToLight = getNumbersFrom("water-to-light map:");
let lightToTemp = getNumbersFrom("light-to-temperature map:");
let tempToHumidity = getNumbersFrom("temperature-to-humidity map:");
let humidityToLocation = getNumbersFrom("humidity-to-location map:");


seeds = seeds.map(x => mapFromNumbers(seedToSoil, x))
    .map(x => mapFromNumbers(soilToFert, x))
    .map(x => mapFromNumbers(fertToWater, x))
    .map(x => mapFromNumbers(waterToLight, x))
    .map(x => mapFromNumbers(lightToTemp, x))
    .map(x => mapFromNumbers(tempToHumidity, x))
    .map(x => mapFromNumbers(humidityToLocation, x))

console.log(Math.min(...seeds));
