const fs = require('fs');

function positionsCorrect(str, letter, positionOne, positionTwo) {
    if (str[positionOne - 1] !== letter && str[positionTwo-1] === letter) {
        return true;
    }

    if (str[positionOne - 1] === letter && str[positionTwo-1] !== letter) {
        return true;
    }

    return false;
}

function numOccurrences(str, letter) {
    let count = 0;
    for (const s of str) {
        if (s === letter) {
            count++;
        }
    }

    return count;
}

function passwordIsValid(rawLine) {
    const rangeAndLetter = rawLine.split(':')[0].trim();
    const range = rangeAndLetter.split(' ')[0];
    const letter = rangeAndLetter.split(' ')[1];
    const password = rawLine.split(':')[1].trim();

    let min = parseInt(range.split('-')[0]);
    let max = parseInt(range.split('-')[1]);

    // let occurrences = numOccurrences(password, letter);
    // return occurrences <= max && occurrences >= min

    return positionsCorrect(password, letter, min, max);
}

function parsePasswords(rawInput) {
    rawInput = rawInput.toString();
    rawInput = rawInput.split('\n');

    let sum = 0;
    for (const rawLine of rawInput) {
        if (passwordIsValid(rawLine)) {
            sum++;
        }
    }

    return sum;
}

function main() {
    const data = fs.readFileSync('./day-2-input.txt');
    console.log(parsePasswords(data));
}

main();
