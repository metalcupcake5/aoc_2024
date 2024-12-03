import fs from "fs";
let file = await fs.readFileSync("./input.txt", "utf8");
let array = file.split("\n");

const part1 = async () => {
    let sum = 0;
    for (const line of array) {
        let match = line.match(/mul\((\d+,\d+)\)/g);
        for (const mul of match) {
            const numbers = mul
                .substring(4, mul.length - 1)
                .split(",")
                .map((v) => parseInt(v));
            sum += numbers[0] * numbers[1];
        }
    }
    console.log(sum);
    console.log("done");
};

const part2 = async () => {
    let sum = 0;
    let parse = true;
    for (const line of array) {
        let match = line.match(/mul\((\d+,\d+)\)|do\(\)|don't\(\)/g);
        for (const mul of match) {
            if (mul == "do()") {
                parse = true;
                continue;
            }
            if (mul == "don't()") {
                parse = false;
                continue;
            }
            if (!parse) {
                console.log("skipped");
                continue;
            }

            const numbers = mul
                .substring(4, mul.length - 1)
                .split(",")
                .map((v) => parseInt(v));
            console.log(numbers);
            sum += numbers[0] * numbers[1];
        }
    }
    console.log(sum);
    console.log("done");
};

part2();
