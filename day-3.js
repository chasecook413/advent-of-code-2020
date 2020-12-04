const fs = require('fs');

function countTrees(map, stepRight, stepDown) {
    let numTrees = 0;
    let currentStepRight = 0;
    let currentStepDown = 0;
    while (currentStepRight < map[0].length && currentStepDown < map.length) {
        if (map[currentStepDown][currentStepRight] === '#') {
            numTrees++;
        }

        currentStepRight = (currentStepRight + stepRight) % map[0].length;
        currentStepDown += stepDown;
    }

    return numTrees;
}

function readMap(mapFileName) {
    const mapData = fs.readFileSync(mapFileName).toString();
    const mapRows = mapData.split('\n');

    // split on each char
    const mapCols = mapRows.map(row => {
        return row.trim().split('');
    });

    return mapCols;
}

function main() {
    const map = readMap('./day-3-input.txt');
    const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ]

    let multiplicationReducer = 1;
    for (const slope of slopes) {
        multiplicationReducer *= countTrees(map, slope[0], slope[1]);
    }

    console.log(multiplicationReducer);
}

main();