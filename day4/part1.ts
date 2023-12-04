const inputFile = Bun.file("input.txt");
const inputString = await inputFile.text();
const input = inputString.split("\n");

const totalPoints = input.reduce((acc, line) => {
    const [_, numbersString] = line.split(":");
    const [winningNumbersString, givenNumbersString] = numbersString.trim().split(" | ");
    const winningNumbers = winningNumbersString
        .replace(/ +(?= )/g, "")
        .split(" ")
        .map(Number);
    const givenNumbers = givenNumbersString
        .replace(/ +(?= )/g, "")
        .split(" ")
        .map(Number);

    const points = winningNumbers.reduce((acc, winningNumber) => {
        if (givenNumbers.includes(winningNumber)) {
            if (acc > 0) {
                return acc * 2;
            }

            return acc + 1;
        }
        return acc;
    }, 0);

    return acc + points;
}, 0);

console.log(totalPoints);
