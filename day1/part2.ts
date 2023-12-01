const inputFile = Bun.file("input.txt");
const inputString = await inputFile.text();
const input = inputString.split("\n");

const numberWords = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
];

const getFirstDigit = (line: string) => {
    for (let i = 0; i < line.length; i++) {
        const digitCheck = parseInt(line[i]);
        if (!isNaN(digitCheck)) {
            return digitCheck;
        }
        for (let j = 0; j < numberWords.length; j++) {
            const wordCheck = numberWords[j];
            if (line.substring(i).startsWith(wordCheck)) {
                return j + 1;
            }
        }
    }
}

const getSecondDigit = (line: string) => {
    for (let i = line.length - 1; i >= 0; i--) {
        const digitCheck = parseInt(line[i]);
        if (!isNaN(digitCheck)) {
            return digitCheck;
        }
        for (let j = 0; j < numberWords.length; j++) {
            const wordCheck = numberWords[j];
            if (line.substring(i).startsWith(wordCheck)) {
                return j + 1;
            }
        }
    }
}

const outputNumbers = input.map((line) => {
    const firstDigit = getFirstDigit(line);
    const secondDigit = getSecondDigit(line);
    const outputNumber = parseInt(firstDigit + "" + secondDigit);
    return outputNumber;
});

console.log(outputNumbers.reduce((a, b) => a + b, 0));
