import { promises as fs } from 'fs';

enum OMove {
    Rock = 'A',
    Paper = 'B',
    Scissors = 'C'
}

enum YMove {
    Rock = 'X',
    Paper = 'Y',
    Scissors = 'Z'
}

enum YResult {
    Lose = 'X',
    Draw = 'Y',
    Win = 'Z'
}

type Strategy = {OMove:OMove, YMove:YMove | YResult}[];

async function run() {
    const data = await fs.readFile('./data.txt', { encoding: 'utf-8' });
    const results = data.split('\n').map(moves => ({ OMove: moves.split(' ')[0], YMove: moves.split(' ')[1]})) as Strategy;

    console.log(results.reduce((result, value) => {
        switch(value.YMove) {
            case YMove.Rock:
                result += 1;
            break;
            case YMove.Paper:
                result += 2;
            break;
            case YMove.Scissors:
                result += 3;
            break;
        }
        if(value.YMove === YMove.Rock && value.OMove === OMove.Rock) return result + 3;
        if(value.YMove === YMove.Paper && value.OMove === OMove.Paper) return result + 3;
        if(value.YMove === YMove.Scissors && value.OMove === OMove.Scissors) return result + 3;

        if(value.YMove === YMove.Rock && value.OMove === OMove.Paper) return result;
        if(value.YMove === YMove.Paper && value.OMove === OMove.Scissors) return result;
        if(value.YMove === YMove.Scissors && value.OMove === OMove.Rock) return result;

        if(value.YMove === YMove.Paper && value.OMove === OMove.Rock) return result + 6;
        if(value.YMove === YMove.Scissors && value.OMove === OMove.Paper) return result + 6;
        if(value.YMove === YMove.Rock && value.OMove === OMove.Scissors) return result + 6;
        throw Error("Move not found: " + JSON.stringify(value))
    }, 0));

    console.log(results.reduce((result, value) => {
        if(value.YMove === YResult.Draw && value.OMove === OMove.Rock) return result + 3 + 1;
        if(value.YMove === YResult.Draw && value.OMove === OMove.Paper) return result + 3 + 2;
        if(value.YMove === YResult.Draw && value.OMove === OMove.Scissors) return result + 3 + 3;

        if(value.YMove === YResult.Win && value.OMove === OMove.Rock) return result + 6 + 2; // win with paper
        if(value.YMove === YResult.Win && value.OMove === OMove.Paper) return result + 6 + 3; // win with scissors
        if(value.YMove === YResult.Win && value.OMove === OMove.Scissors) return result + 6 + 1; // win with rock

        if(value.YMove === YResult.Lose && value.OMove === OMove.Rock) return result + 3; // lose with scissors
        if(value.YMove === YResult.Lose && value.OMove === OMove.Paper) return result + 1; // lose with rock
        if(value.YMove === YResult.Lose && value.OMove === OMove.Scissors) return result + 2; // lose with paper

        throw Error("No match for: " + JSON.stringify(value))
    }, 0));
}

run();