const inputFile = Bun.file("input.txt");
const inputString = await inputFile.text();
const input = inputString.split("\n");

const numberRegex = /[0-9]/;

const getFullNumber = ({ inputIndex, numberIndex }: { inputIndex: number; numberIndex: number }) => {
    const anySymbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    let numberStartIndex = 0;
    let numberEndIndex = 0;
    // find start
    for (let i = numberIndex; i >= 0; i--) {
        if (anySymbolRegex.test(input[inputIndex][i])) {
            numberStartIndex = i + 1;
            break;
        }
    }

    // find end
    for (let i = numberIndex; i < input[inputIndex].length; i++) {
        if (anySymbolRegex.test(input[inputIndex][i])) {
            numberEndIndex = i - 1;
            break;
        }
    }
    if (numberEndIndex === 0) {
        numberEndIndex = input[inputIndex].length - 1;
    }

    return { fullNumber: parseInt(input[inputIndex].substring(numberStartIndex, numberEndIndex + 1)), newIndex: numberEndIndex + 1 };
};

const checkIfValidGear = ({ inputIndex, gearIndex }: { inputIndex: number; gearIndex: number }) => {
    const aboveRow = input[inputIndex - 1];
    const belowRow = input[inputIndex + 1];
    const adjacentNumbers: number[] = [];

    // left
    if (numberRegex.test(input[inputIndex][gearIndex - 1])) {
        const { fullNumber } = getFullNumber({ inputIndex, numberIndex: gearIndex - 1 });
        adjacentNumbers.push(fullNumber);
    }

    //right
    if (numberRegex.test(input[inputIndex][gearIndex + 1])) {
        const { fullNumber } = getFullNumber({ inputIndex, numberIndex: gearIndex + 1 });
        adjacentNumbers.push(fullNumber);
    }

    //above
    if (aboveRow) {
        for (let i = gearIndex - 1; i <= gearIndex + 1; i++) {
            if (numberRegex.test(aboveRow[i])) {
                const { fullNumber, newIndex } = getFullNumber({ inputIndex: inputIndex - 1, numberIndex: i });
                adjacentNumbers.push(fullNumber);
                i = newIndex;
            }
        }
    }

    // below
    if (belowRow) {
        for (let i = gearIndex - 1; i <= gearIndex + 1; i++) {
            if (numberRegex.test(belowRow[i])) {
                const { fullNumber, newIndex } = getFullNumber({ inputIndex: inputIndex + 1, numberIndex: i });
                adjacentNumbers.push(fullNumber);
                i = newIndex;
            }
        }
    }

    if (adjacentNumbers.length === 2) {
        return adjacentNumbers[0] * adjacentNumbers[1];
    }

    return null;
};

const gearRatios: number[] = [];

input.forEach((line, inputIndex) => {
    for (let i = 0; i < line.length; i++) {
        if (line[i] === "*") {
            const newRatio = checkIfValidGear({ inputIndex, gearIndex: i });
            if (newRatio) {
                gearRatios.push(newRatio);
            }
        }
    }
});

console.log(gearRatios.reduce((a, b) => a + b, 0));
