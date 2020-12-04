const fs = require('fs');

function sumOfEntries(l) {
    for (const i of l) {
       for (const j of l) {
           for (const h of l) {
               if (i + j + h == 2020) {
                   return i * j * h;
               }
           }
       }
    }
}

function main() {
    const rawData = fs.readFileSync('day-1-input.txt').toString();
    const arr = rawData.split('\n').map(value => {
        value = value.trim();
        return parseInt(value);
    });

    console.log(sumOfEntries(arr))
}

main();
