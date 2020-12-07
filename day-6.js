const fs = require('fs');

function countYess(groups) {
    let yess = 0;
    for (const group of groups) {
        const groupCache = {};
        for (const person of group) {
            for (const char of person) {
                if (char in groupCache) {
                    groupCache[char]++;
                } else {
                    groupCache[char] = 1;
                }
            }
        }

        for (const yesAnswers of Object.keys(groupCache)) {
            if (groupCache[yesAnswers] === group.length) {
                yess++;
            }
        }
    }
    return yess;
}

function parseGroups(rawData) {
    let groupData = rawData.split('\n\n');
    const groups = [];
    for (const group of groupData) {
        groups.push(group.split('\n'));
    }

    return groups;
}

function main() {
    const rawData = fs.readFileSync('./day-6-input.txt').toString();
    const groups = parseGroups(rawData);

    console.log(countYess(groups));
}

main();
