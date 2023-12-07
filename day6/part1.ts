const inputFile = Bun.file("input.txt");
const inputString = await inputFile.text();
const input = inputString.split("\n");

const timeString = input[0].split(":")[1].trim().replace(/\s+/g, " ");
const distanceString = input[1].split(":")[1].trim().replace(/\s+/g, " ");

const times = timeString
    .trim()
    .split(" ")
    .map(x => parseInt(x));
const distances = distanceString
    .trim()
    .split(" ")
    .map(x => parseInt(x));

const totalPossibleWins = times.reduce((acc, time, index) => {
    const distance = distances[index];
    let possibleWinsThisRound = 0;

    for (let i = 1; i < time; i++) {
        if (i * (time - i) > distance) {
            possibleWinsThisRound++;
        }
    }

    if (acc === 0) {
        return possibleWinsThisRound;
    }

    return acc * possibleWinsThisRound;
}, 0);

console.log(totalPossibleWins);
