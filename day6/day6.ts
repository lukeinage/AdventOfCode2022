import { promises as fs } from 'fs';
import { exit } from "process";

const uniqueLetters = 14;

async function run() {
    const data = await fs.readFile('./data.txt', { encoding: 'utf-8' });

    data.split('').forEach((value, index, array) => {
        const letters = array.slice(index, index + uniqueLetters);
        if(letters.filter((item, index, array) => array.indexOf(item) === index).length === uniqueLetters) {
            console.log(index + uniqueLetters);
            exit();
        }
    });
}

run();