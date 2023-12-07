const inputFile = Bun.file("input.txt");
const inputString = await inputFile.text();
const input = inputString.split("\n");

const time = parseInt(input[0].split(":")[1].trim().replace(/\s+/g, ""));
const distance = parseInt(input[1].split(":")[1].trim().replace(/\s+/g, ""));

let possibleWins = 0;
for (let i = 1; i < time; i++) {
    if (i * (time - i) > distance) {
        possibleWins++;
    }
}

console.log(possibleWins);
