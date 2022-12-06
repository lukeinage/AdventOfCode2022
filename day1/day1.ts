import { promises as fs } from 'fs';

async function run() {
    const data = await fs.readFile('./data.txt', { encoding: 'utf-8' });
    const results = data.split('\n\n').map(elve => elve.split('\n').reduce((prev, value) => prev + parseInt(value), 0)).sort((a, b) => a - b);
    console.log(Math.max(...results));
    console.log(results.slice(-3).reduce((prev, value) => prev + value));
}

run();