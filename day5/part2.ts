const inputFile = Bun.file("input.txt");
const inputString = await inputFile.text();
const input = inputString.split("\n");

interface Entry {
    seed: number;
    soil: number;
    fertilizer: number;
    water: number;
    light: number;
    temperature: number;
    humidity: number;
    location: number;
}

const getDestinationValue = ({ title, sourceValue }: { title: string; sourceValue: number }) => {
    const startIndex = input.indexOf(title);

    for (let i = startIndex + 1; i < input.length; i++) {
        const line = input[i];
        if (!line) {
            break;
        }

        const [destinationStartString, sourceStartString, rangeLengthString] = line.split(" ");
        const destinationStart = Number(destinationStartString.trim());
        const sourceStart = Number(sourceStartString.trim());
        const rangeLength = Number(rangeLengthString.trim());

        if (sourceValue >= sourceStart && sourceValue < sourceStart + rangeLength) {
            return destinationStart + (sourceValue - sourceStart);
        }
    }
};

const entries = (() => {
    let entryCount = 0;
    const numberPairRegex = /(\d+\s\d+)/g;
    const [_, seedString] = input[0].split(":");
    const pairs = seedString.match(numberPairRegex);
    if (!pairs) {
        throw new Error("No pairs found");
    }

    return pairs.reduce((entries, pair) => {
        const [startString, lengthString] = pair.split(" ");
        const start = Number(startString.trim());
        const length = Number(lengthString.trim());

        for (let i = start; i <= start + length; i++) {
                console.log(`Adding entry ${entryCount++}`);
                entries.push({
                    seed: i,
                    soil: 0,
                    fertilizer: 0,
                    water: 0,
                    light: 0,
                    temperature: 0,
                    humidity: 0,
                    location: 0
                });
        }

        return entries;
    }, [] as Entry[]);
})();

entries.forEach((entry, index) => {
    console.log(`Processing entry ${index}`);
    entry.soil = getDestinationValue({ title: "seed-to-soil map:", sourceValue: entry.seed }) ?? entry.seed;
    entry.fertilizer = getDestinationValue({ title: "soil-to-fertilizer map:", sourceValue: entry.soil }) ?? entry.soil;
    entry.water = getDestinationValue({ title: "fertilizer-to-water map:", sourceValue: entry.fertilizer }) ?? entry.fertilizer;
    entry.light = getDestinationValue({ title: "water-to-light map:", sourceValue: entry.water }) ?? entry.water;
    entry.temperature = getDestinationValue({ title: "light-to-temperature map:", sourceValue: entry.light }) ?? entry.light;
    entry.humidity = getDestinationValue({ title: "temperature-to-humidity map:", sourceValue: entry.temperature }) ?? entry.temperature;
    entry.location = getDestinationValue({ title: "humidity-to-location map:", sourceValue: entry.humidity }) ?? entry.humidity;
});

const lowestLocation = entries.reduce((lowest, entry) => {
    return entry.location < lowest.location ? entry : lowest;
}, entries[0]);

console.log(lowestLocation.location);
