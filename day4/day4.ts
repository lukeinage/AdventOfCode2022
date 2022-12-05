import { promises as fs } from 'fs';

async function run() {
    const data = await fs.readFile('./data.txt', { encoding: 'utf-8' });
    const results = data.split('\n')
        .map(ranges => ranges.split(',').map(range => range.split('-').map(i => parseInt(i))));

    console.log(results.reduce((previousValue, currentValue) => {
        if(currentValue[0][0] >= currentValue[1][0] && currentValue[0][1] <= currentValue[1][1]) return previousValue + 1;
        if(currentValue[1][0] >= currentValue[0][0] && currentValue[1][1] <= currentValue[0][1]) return previousValue + 1;

        return previousValue
    }, 0));

    console.log(results.reduce((previousValue, currentValue) => {
        if(currentValue[0][0] >= currentValue[1][0] && currentValue[0][0] <= currentValue[1][1]) return previousValue + 1;
        if(currentValue[0][1] >= currentValue[1][0] && currentValue[0][1] <= currentValue[1][1]) return previousValue + 1;
        if(currentValue[1][0] >= currentValue[0][0] && currentValue[1][0] <= currentValue[0][1]) return previousValue + 1;
        if(currentValue[1][1] >= currentValue[0][0] && currentValue[1][1] <= currentValue[0][1]) return previousValue + 1;

        return previousValue
    }, 0));
}

run();