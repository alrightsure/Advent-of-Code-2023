const inputFile = Bun.file("input.txt");
const inputString = await inputFile.text();
const input = inputString.split("\n");

const cardOrder = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];
const handOrder = ["fiveOfAKind", "fourOfAKind", "fullHouse", "threeOfAKind", "twoPair", "onePair", "highCard"];

interface Hand {
    cards: string;
    bid: number;
    type?: (typeof handOrder)[number];
}

const getNonJokerDuplicateCount = (cards: string[]) => {
    const cardCounts: { [key: string]: number } = {};
    return cards.reduce((max, card) => {
        if (card === "J") {
            return max;
        }
        cardCounts[card] = (cardCounts[card] || 0) + 1;
        return cardCounts[card] > max ? cardCounts[card] : max;
    }, 0);
};

const getPairCount = (cards: string[]) => {
    const cardCounts: { [key: string]: number } = {};
    return cards.reduce((max, card) => {
        cardCounts[card] = (cardCounts[card] || 0) + 1;
        return cardCounts[card] === 2 ? max + 1 : max;
    }, 0);
};

const hands: Hand[] = input.map(line => {
    const [cards, bid] = line.split(" ");

    return {
        cards,
        bid: parseInt(bid)
    };
});

hands.forEach(hand => {
    const cards = hand.cards.split("");
    const duplicateCards = getNonJokerDuplicateCount(cards);
    const pairs = getPairCount(cards);
    const jokerCount = cards.filter(card => card === "J").length;

    if (duplicateCards + jokerCount === 5) {
        hand.type = "fiveOfAKind";
        return;
    }

    if (duplicateCards + jokerCount === 4) {
        hand.type = "fourOfAKind";
        return;
    }

    if (
        (duplicateCards === 3 && pairs === 2) ||
        (duplicateCards === 2 && pairs === 2 && jokerCount === 1) ||
        (duplicateCards === 1 && pairs === 2 && jokerCount === 2) ||
        (duplicateCards === 2 && pairs === 1 && jokerCount === 2)
    ) {
        hand.type = "fullHouse";
        return;
    }

    if (duplicateCards === 3 || (duplicateCards === 2 && jokerCount === 1) || (duplicateCards === 1 && jokerCount === 2)) {
        hand.type = "threeOfAKind";
        return;
    }

    if (pairs === 2 || (pairs === 1 && duplicateCards === 1 && jokerCount === 1)) {
        hand.type = "twoPair";
        return;
    }

    if (pairs === 1 || (pairs === 0 && duplicateCards === 1 && jokerCount === 1)) {
        hand.type = "onePair";
        return;
    }

    hand.type = "highCard";
});

hands.sort((a, b) => {
    if (a.type === b.type) {
        for (let i = 0; i < a.cards.length; i++) {
            if (a.cards[i] === b.cards[i]) {
                continue;
            }

            return cardOrder.indexOf(b.cards[i]) - cardOrder.indexOf(a.cards[i]);
        }
    }

    return handOrder.indexOf(b.type!) - handOrder.indexOf(a.type!);
});

const winnings = hands.reduce((total, hand, index) => {
    return total + hand.bid * (index + 1);
}, 0);

console.log({ winnings });
