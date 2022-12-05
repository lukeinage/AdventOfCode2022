import { promises as fs } from 'fs';

type Stacks = { [key:string]: string[] };

const stacks:Stacks = {
    stack1: ['W','P','G','Z','V','S','B'],
    stack2: ['F','Z','C','B','V','J'],
    stack3: ['C','D','Z','N','H','M','L','V'],
    stack4: ['B','J','F','P','Z','M','D','L'],
    stack5: ['H','Q','B','J','G','C','F','V'],
    stack6: ['B','L','S','T','Q','F','G'],
    stack7: ['V','Z','C','G','L'],
    stack8: ['G','L','N'],
    stack9: ['C','H','F','J']
};

type Movements = {
    move:number;
    from:number;
    to:number;
}[];

async function run() {
    const data = await fs.readFile('./data.txt', { encoding: 'utf-8' });
    const movements:Movements = data.split('\n').map(item => {
        item = item.split('move ')[1];
        const move = parseInt(item.split(' from ')[0]);
        item = item.split(' from ')[1];
        const from = parseInt(item.split(' to ')[0]);
        const to = parseInt(item.split(' to ')[1]);

        return { move, from, to }
    });

    movements.forEach(movement => {
        const moving = stacks["stack" + movement.from].splice(0, movement.move);
        stacks["stack" + movement.to] = [...moving/* interchange .reverse() for answers */, ...stacks["stack" + movement.to]];
    });

    console.log(Object.keys(stacks).map(key => stacks[key][0]).join(''));
}

run();