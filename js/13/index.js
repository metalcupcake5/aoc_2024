import fs from "fs";
let file = await fs.readFileSync("./input.txt", "utf8");
let array = file.split("\n\n");

import { det, multiply } from "mathjs";

const part1 = async () => {
    let sum = 0;
    for (let machine of array) {
        let split = machine.split("\n");
        let A = {
            X: parseInt(split[0].match(/\d+/g)[0]),
            Y: parseInt(split[0].match(/\d+/g)[1]),
        };
        let B = {
            X: parseInt(split[1].match(/\d+/g)[0]),
            Y: parseInt(split[1].match(/\d+/g)[1]),
        };
        let prize = {
            X: parseInt(split[2].match(/\d+/g)[0]),
            Y: parseInt(split[2].match(/\d+/g)[1]),
        };
        let moves = false;
        for (let x = 0; x < prize.X; x += A.X) {
            if (Number.isInteger((prize.X - x) / B.X)) {
                let movesA = x / A.X;
                let movesB = (prize.X - x) / B.X;
                if (movesA > 100 || movesB > 100) continue;
                if (A.Y * movesA + B.Y * movesB != prize.Y) continue;
                let cost = (x / A.X) * 3 + (prize.X - x) / B.X;
                if (cost < moves.cost || !moves) {
                    moves = {
                        a: movesA,
                        b: movesB,
                        cost,
                    };
                }
            }
        }

        if (!moves) continue;
        console.log(moves);
        sum += moves.cost;
    }
    console.log(sum);
    console.log("done");
};

const part2 = async () => {
    let sum = 0;
    for (let machine of array) {
        let split = machine.split("\n");
        let A = {
            X: parseInt(split[0].match(/\d+/g)[0]),
            Y: parseInt(split[0].match(/\d+/g)[1]),
        };
        let B = {
            X: parseInt(split[1].match(/\d+/g)[0]),
            Y: parseInt(split[1].match(/\d+/g)[1]),
        };
        let prize = {
            X: parseInt(split[2].match(/\d+/g)[0]) + 10000000000000,
            Y: parseInt(split[2].match(/\d+/g)[1]) + 10000000000000,
        };

        let A_ = [
            [A.X, B.X],
            [A.Y, B.Y],
        ];
        let determinant = det(A_);
        let inv = multiply(1 / determinant, [
            [B.Y, -B.X],
            [-A.Y, A.X],
        ]);
        let solution = multiply(inv, [prize.X, prize.Y]);
        if (
            Math.round(solution[0]) * A.X + Math.round(solution[1]) * B.X !=
                prize.X ||
            Math.round(solution[0]) * A.Y + Math.round(solution[1]) * B.Y !=
                prize.Y
        ) {
            continue;
        }

        sum += Math.round(solution[0]) * 3 + Math.round(solution[1]);
    }
    console.log(sum);
    console.log("done");
};

part2();
