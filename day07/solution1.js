const fs = require('fs');
const path = require('path');
const input = path.join(__dirname, '/input.txt');

let lines = fs.readFileSync(input, "utf8").split("\n");

//contains hands and their bids
let hands = [];

const cardLabels = new Map([
    ["A", 1],
    ["K", 2],
    ["Q", 3],
    ["J", 4],
    ["T", 5],
    ["9", 6],
    ["8", 7],
    ["7", 8],
    ["6", 9],
    ["5", 10],
    ["4", 11],
    ["3", 12],
    ["2", 13]
]);

lines.forEach((line , index) => {
    tmp = line.split(" ");
    hands[index] = [tmp[0], parseInt(tmp[1])];
})



function countCards(hand) {
    let cards = new Map();
    for(const c of hand) {
        cards.set(c, cards.get(c) + 1 || 1);
    }
    return cards;
}

//1 is best type (5 of a kind), 6 is worst (high card)
function handType(hand) {
    let cards = countCards(hand);
    let cardCounts = Array.from(cards.values());
    if(cardCounts.includes(5)) {
        return 1;
    } else if(cardCounts.includes(4)) {
        return 2;
    } else if(cardCounts.includes(3) && cardCounts.includes(2)) {
        return 3;
    }
    else if(cardCounts.includes(3)) {
        return 4;
    }
    else if(cardCounts.filter((count) => count == 2).length == 2) {
        return 5;
    }
    else if(cardCounts.includes(2)) {
        return 6;
    }
    return 7;
}

//return -1 if hand1 has highest card, 0 if same hands, 1 if hand2 has highest card (following rules)
function highestCard(hand1, hand2) {
    if(hand1 == hand2) return 0;
    for(let i = 0; i < hand1.length; i++) {
        const label1 = cardLabels.get(hand1.charAt(i));
        const label2 = cardLabels.get(hand2.charAt(i));

        if (label1 < label2) {
            return 1;
        } else if (label1 > label2) {
            return -1;
        }
    }
    return -1;
}

function compareHands(hand1, hand2) {

    type1 = handType(hand1);
    type2 = handType(hand2);
    if(type1 < type2) {
        return 1;
    } if(type2 < type1) {
        return -1;
    }
    return highestCard(hand1, hand2);
}

hands.sort((hand1, hand2) => compareHands(hand1[0], hand2[0]))

let sum = 0;
hands.forEach((hand, index) => {
    sum += hand[1]*(index+1);
})

console.log(sum);