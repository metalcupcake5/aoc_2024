import fs from "fs";
let file = await fs.readFileSync("./input.txt", "utf8");
let array = file.split("\n");

function check(array) {
    let diff = [];

    for (let i = 1; i < array.length; i++) {
        diff.push(array[i - 1] - array[i]);
    }

    if (!(diff.every((v) => v < 0) || diff.every((v) => v > 0))) {
        return false;
    }

    for (let v of diff) {
        if (Math.abs(v) > 3) {
            return false;
        }
        if (v == 0) return false;
    }

    return true;
}

const part1 = async () => {
    let safe = 0;
    for (const line of array) {
        let split = line.split(" ");
        split = split.map((v) => parseInt(v));

        if (check(split)) safe++;
    }
    console.log(safe);
    console.log("done");
};

const part2 = async () => {
    let safe = 0;
    for (const line of array) {
        let split = line.split(" ");
        split = split.map((v) => parseInt(v));

        if (check(split)) {
            safe++;
            continue;
        }

        for (let i = 0; i < split.length; i++) {
            let newArray = split.slice();
            newArray.splice(i, 1);
            if (check(newArray)) {
                safe++;
                break;
            }
        }
    }
    console.log(safe);
    console.log("done");
};

part2();
