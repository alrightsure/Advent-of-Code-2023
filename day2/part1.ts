const inputFile = Bun.file("input.txt");
const inputString = await inputFile.text();
const input = inputString.split("\n");

const findColorValueInRound = (color: string, round: string) => {
    return round.split(",").reduce((total, subPart) => {
        if (subPart.includes(color)) {
            const value = parseInt(subPart.replace(/\D/g, ""));
            return total + value;
        }
        return total;
    }, 0);
};

const getPossibleGameIds = ({ maxRed, maxBlue, maxGreen }: { maxRed: number; maxBlue: number; maxGreen: number }) => {
    return input.reduce((possibleIds: number[], line) => {
        const [game, colors] = line.split(": ");
        const id = game.replace(/\D/g, "");

        let invalidRoundFound = false;
        for (const round of colors.split(";")) {
            const reds = findColorValueInRound("red", round);
            const blues = findColorValueInRound("blue", round);
            const greens = findColorValueInRound("green", round);

            if (reds > maxRed || blues > maxBlue || greens > maxGreen) {
                invalidRoundFound = true;
                break;
            }
        }

        if (!invalidRoundFound) {
            possibleIds.push(parseInt(id));
        }
        return possibleIds;
    }, []);
};

const possibleIds = getPossibleGameIds({ maxRed: 12, maxBlue: 14, maxGreen: 13 });
console.log(possibleIds.reduce((a, b) => a + b, 0));
