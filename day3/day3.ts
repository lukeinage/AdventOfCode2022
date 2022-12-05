import { promises as fs } from 'fs';

type Rucksack = [string, string][];
type RucksackSet = string[][];

const priority = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

async function run() {
    const data = await fs.readFile('./data.txt', { encoding: 'utf-8' });
    const results = data.split('\n').map(rucksack => [rucksack.substring(0, rucksack.length / 2), rucksack.substring(rucksack.length / 2, rucksack.length)]) as Rucksack;

    console.log(results.map(([c1, c2]) => c1.split('').find(c1 => c2.includes(c1))).reduce((prevValue, value) => prevValue + priority.indexOf(value as string) + 1, 0));

    const badgeData = [] as RucksackSet;
    data.split('\n').reduce((prev, value, index) => {
        prev.push(value);
        if((index + 1) % 3 === 0) {
            badgeData.push(prev);
            return [];
        }
        return prev;
    }, [] as string[]);

    console.log(badgeData.map(([c1, c2, c3]) => c1.split('').find(c1 => c2.includes(c1) && c3.includes(c1))).reduce((prevValue, value) => prevValue + priority.indexOf(value as string) + 1, 0));
}

run();