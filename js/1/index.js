import fs from "fs";
let file = await fs.readFileSync("./input.txt", "utf8");
let array = file.split("\n");

const part1 = async () => {
    let valuesRight = [];
    let valuesLeft = [];
    for (const line of array) {
        const split = line.split("   ");
        valuesRight.push(parseInt(split[0]));
        valuesLeft.push(parseInt(split[1]));
    }
    valuesLeft = valuesLeft.sort((a, b) => a - b);
    valuesRight = valuesRight.sort((a, b) => a - b);

    const diff = [];
    for (let i = 0; i < valuesLeft.length; i++) {
        diff.push(Math.abs(valuesLeft[i] - valuesRight[i]));
    }
    const sum = diff.reduce((partialSum, a) => partialSum + a, 0);
    console.log(sum);
    console.log("done");
};

const part2 = async () => {
    let valuesRight = [];
    let valuesLeft = [];
    for (const line of array) {
        const split = line.split("   ");
        valuesRight.push(parseInt(split[0]));
        valuesLeft.push(parseInt(split[1]));
    }
    const similarity = [];

    for (let v of valuesLeft) {
        similarity.push(v * valuesRight.filter((x) => x == v).length);
        // console.log(similarity);
    }
    const sum = similarity.reduce((partialSum, a) => partialSum + a, 0);
    console.log(sum);
    console.log("done");
};

part2();
