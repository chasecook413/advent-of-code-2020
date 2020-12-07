const fs = require('fs');

function findMissingNumber(l) {
    // in a contiguous set of numbers
    // returns a missing number, if any

    if (l.length < 1) {
        return null;
    }

    let cur = l[0];

    for (let i = 1; i < l.length - 1; i++) {
        if (l[i] !== cur + 1) {
            return cur + 1;
        }

        cur = l[i];
    }

    return null;
}

function binaryDecision(code, lowChar, highChar) {
    let low = 0, high = Math.pow(2, code.length) - 1;
    for (const char of code) {
        if (char === lowChar) {
            high = Math.floor((high + low) / 2);
        } else {
            low = Math.ceil((high + low) / 2);
        }
    }

    return low;
}

function getSeatID(seatCode) {
    const rowCode = seatCode.slice(0, 7);
    const colCode = seatCode.slice(7, 10);
    const row = binaryDecision(rowCode, 'F', 'B');
    const column = binaryDecision(colCode, 'L', 'R');
    return row * 8 + column;
}

function main() {
    const rawData = fs.readFileSync('./day-5-input.txt').toString();
    const seatCodes = rawData.split('\n');
    const seatIds = [];
    for (let seatCode of seatCodes) {
        seatCode = seatCode.trim();
        const seatId = getSeatID(seatCode);
        seatIds.push(seatId);
    }

    // easier to find the missing value in a sorted list
    seatIds.sort((a,b) => a-b);
    console.log(`Missing value: ${findMissingNumber(seatIds)}`);
    console.log(`Maximum seat ID ${seatIds[seatIds.length - 1]}`);
}

main();
