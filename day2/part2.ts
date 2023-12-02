const inputFile = Bun.file("input.txt");
const inputString = await inputFile.text();
const input = inputString.split("\n");

const findHighestColorValueInGame = (color: string, game: string) => {
    return game.split(";").reduce((prevHighest, round) => {
        const colorValue = round.split(",").reduce((total, subPart) => {
            if (subPart.includes(color)) {
                const value = parseInt(subPart.replace(/\D/g, ""));
                return total + value;
            }
            return total;
        }, 0);

        if (colorValue > prevHighest) {
            return colorValue;
        }

        return prevHighest;
    }, 0);
};

const totalPower = input.reduce((total, line) => {
    const [_, game] = line.split(": ");

    const minRed = findHighestColorValueInGame("red", game);
    const minBlue = findHighestColorValueInGame("blue", game);
    const minGreen = findHighestColorValueInGame("green", game);

    const power = minRed * minBlue * minGreen;

    return total + power;
}, 0);

console.log(totalPower);
