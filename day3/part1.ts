const inputFile = Bun.file("input.txt");
const inputString = await inputFile.text();
const input = inputString.split("\n");

const getNextNumber = (currentCharIndex: number, currentLine: string) => {
    const anySymbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const numberRegex = /[0-9]/;

    if (anySymbolRegex.test(currentLine[currentCharIndex])) {
        return { newCharIndex: currentCharIndex + 1, hasNumber: false };
    }

    let newCharIndex = currentCharIndex;
    for (newCharIndex; newCharIndex < currentLine.length; newCharIndex++) {
        if (!numberRegex.test(currentLine[newCharIndex])) {
            console.log(currentLine[newCharIndex]);
            break;
        }
    }

    return { newCharIndex: newCharIndex, hasNumber: true };
};

const checkIfValidNumber = ({
    inputIndex,
    beginningNumberIndex,
    endingNumberIndex
}: {
    inputIndex: number;
    beginningNumberIndex: number;
    endingNumberIndex: number;
}) => {
    const noPeriodSymbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;

    const aboveRow = input[inputIndex - 1];
    const belowRow = input[inputIndex + 1];

    // left
    if (noPeriodSymbolRegex.test(input[inputIndex][beginningNumberIndex - 1])) {
        return true;
    }

    //right
    if (noPeriodSymbolRegex.test(input[inputIndex][endingNumberIndex])) {
        return true;
    }

    //above
    if (aboveRow) {
        for (let i = beginningNumberIndex - 1; i <= endingNumberIndex; i++) {
            if (noPeriodSymbolRegex.test(aboveRow[i])) {
                return true;
            }
        }
    }

    // below
    if (belowRow) {
        for (let i = beginningNumberIndex - 1; i <= endingNumberIndex; i++) {
            if (noPeriodSymbolRegex.test(belowRow[i])) {
                return true;
            }
        }
    }

    return false;
};

const validNumbers: number[] = [];

input.forEach((line, inputIndex) => {
    let currentCharIndex = 0;

    while (currentCharIndex < line.length) {
        const { newCharIndex, hasNumber } = getNextNumber(currentCharIndex, line);

        if (hasNumber) {
            if (checkIfValidNumber({ inputIndex, beginningNumberIndex: currentCharIndex, endingNumberIndex: newCharIndex })) {
                const number = parseInt(line.substring(currentCharIndex, newCharIndex));
                validNumbers.push(number);
            }
        }

        currentCharIndex = newCharIndex;
    }
});

console.log(validNumbers.reduce((a, b) => a + b, 0));
