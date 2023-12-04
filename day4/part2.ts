const inputFile = Bun.file("input.txt");
const inputString = await inputFile.text();
const input = inputString.split("\n");

const cards = input.map((card) => {
    const [cardInfo, numbersString] = card.split(":");
    const [winningNumbersString, givenNumbersString] = numbersString.trim().split(" | ");
    const winningNumbers = winningNumbersString
        .replace(/ +(?= )/g, "")
        .split(" ")
        .map(Number);
    const givenNumbers = givenNumbersString
        .replace(/ +(?= )/g, "")
        .split(" ")
        .map(Number);

    return {
        id: parseInt(cardInfo.replace(/\D/g, "")),
        winningNumbers,
        givenNumbers
    };
});

for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const matches = card.winningNumbers.reduce((acc, winningNumber) => {
        if (card.givenNumbers.includes(winningNumber)) {
            return acc + 1;
        }
        return acc;
    }, 0);

    for (let i = 1; i < matches + 1; i++) {
        const copy = cards.find((c) => c.id === card.id + i);
        if (!copy) {
            break;
        }
        cards.push(copy);
    }
}

console.log(cards.length);
