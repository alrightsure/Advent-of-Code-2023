const inputFile = Bun.file("input.txt");
const inputString = await inputFile.text();
const input = inputString.split("\n");

const outputNumbers = input.map(line => {
    const noLetterString = line.replace(/\D/g, "");
    const outputNumber = parseInt(noLetterString[0] + noLetterString[noLetterString.length - 1]);
    return outputNumber;
});

console.log(outputNumbers.reduce((a, b) => a + b, 0));
