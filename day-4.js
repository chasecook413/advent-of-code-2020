const fs = require('fs');

const REQUIRED_FIELDS = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
]

function parsePassports(passportData) {
    const passports = [];
    let passportsUnparsed = passportData.split('\n\n')

    for (const passport of passportsUnparsed) {
        passports.push(passport.trim().split(/\s+/));
    }

    return passports;
}

function isValidField(field) {
    const fieldParts = field.trim().split(':');
    let fieldKey = fieldParts[0].trim();
    let fieldValue = fieldParts[1].trim();

    switch (fieldKey) {
        case 'byr':
            fieldValue = parseInt(fieldValue);
            return fieldValue >= 1920 && fieldValue <= 2002;
        case 'iyr':
            fieldValue = parseInt(fieldValue);
            return fieldValue >= 2010 && fieldValue <= 2020;
        case 'eyr':
            fieldValue = parseInt(fieldValue);
            return fieldValue >= 2020 && fieldValue <= 2030;
        case 'hgt':
            if (!(/^\d+(cm|in)$/).test(fieldValue)) {
                return false;
            }

            if (fieldValue.indexOf('cm') > -1) {
                //cm
                fieldValue = parseInt(fieldValue);
                return fieldValue >= 150 && fieldValue <= 193;
            } else {
                //in
                fieldValue = parseInt(fieldValue);
                return fieldValue >= 59 && fieldValue <= 76;
            }
        case 'hcl':
            return (/^#([0-9]|[a-f]){6}$/).test(fieldValue);
        case 'ecl':
            return (/^(amb|blu|brn|gry|grn|hzl|oth){1}$/).test(fieldValue);
        case 'pid':
            return (/^\d{9}$/).test(fieldValue);
        case 'cid':
            return true;
    }

    return false;
}

function isPassportValid(passport) {
    let hasAllRequiredFields = true;
    for (const requiredField of REQUIRED_FIELDS) {
        let hasRequiredField = false;
        for (const field of passport) {
            if (field.indexOf(requiredField) > -1) {
                if (isValidField(field)) {
                    hasRequiredField = true;
                }
            }
        }

        if (!hasRequiredField) {
            hasAllRequiredFields = false;
        }
    }

    return hasAllRequiredFields;
}

function countValidPassports(passports) {
    let count = 0;
    for (const passport of passports) {
        if (isPassportValid(passport)) {
            count++;
        }
    }

    return count;
}


function main() {
    const rawData = fs.readFileSync('day-4-input.txt').toString();
    const passports = parsePassports(rawData);

    const numValidPassports = countValidPassports(passports);
    console.log(numValidPassports);
}

main();