console.log(`start time ${new Date()}`);

import fs from "fs";
let file = await fs.readFileSync("./input.txt", "utf8");
let array = file.split("\n\n");
let ruleArray = array[0].split("\n");
let instrArray = array[1].split("\n");

let rules = [];
const part1 = async () => {
    let sum = 0;
    for (const r of ruleArray) {
        const split = r.split("|");
        rules.push(split);
    }

    o: for (const i of instrArray) {
        const split = i.split(",");
        for (const v of split) {
            let valueRules = rules.filter((r) => r[0] == v);
            for (const r of valueRules) {
                if (
                    split.indexOf(r[1]) > -1 &&
                    split.indexOf(r[1]) < split.indexOf(v)
                ) {
                    continue o;
                }
            }
        }
        let middle = split[Math.floor(split.length / 2)];
        sum += parseInt(middle);
    }

    console.log(sum);
    console.log("done");
};

const part2 = async () => {
    let sum = 0;
    for (const r of ruleArray) {
        const split = r.split("|");
        rules.push(split);
    }

    let incorrect = [];

    o: for (const i of instrArray) {
        const split = i.split(",");
        for (const v of split) {
            let valueRules = rules.filter((r) => r[0] == v);
            for (const r of valueRules) {
                if (
                    split.indexOf(r[1]) > -1 &&
                    split.indexOf(r[1]) < split.indexOf(v)
                ) {
                    incorrect.push(split);
                    continue o;
                }
            }
        }
    }

    for (let i of incorrect) {
        const iRules = rules.filter(
            (r) => i.includes(r[0]) && i.includes(r[1])
        );
        while (true) {
            let swaps = 0;
            for (const r of iRules) {
                let v1 = r[0];
                let v2 = r[1];
                if (i.indexOf(v1) > i.indexOf(v2)) {
                    i[i.indexOf(v1)] = v2;
                    i[i.indexOf(v2)] = v1;
                    swaps++;
                }
            }
            if (swaps == 0) {
                let middle = i[Math.floor(i.length / 2)];
                sum += parseInt(middle);
                break;
            }
            swaps = 0;
        }
    }

    console.log(sum);
    console.log("done");
};

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
}

const part2_bogo = () => {
    let sum = 0;
    for (const r of ruleArray) {
        const split = r.split("|");
        rules.push(split);
    }

    for (let i of instrArray) {
        let split = i.split(",");
        let valueRules = rules.filter(
            (r) => split.includes(r[0]) && split.includes(r[1])
        );
        for (const r of valueRules) {
            if (split.indexOf(r[1]) < split.indexOf(r[0])) {
                while (true) {
                    let sorted = true;
                    for (const r of valueRules) {
                        let v1 = r[0];
                        let v2 = r[1];
                        if (split.indexOf(v1) > split.indexOf(v2)) {
                            sorted = false;
                        }
                    }
                    if (sorted == true) {
                        console.log(`matched 1 | ${new Date()}`);
                        let middle = split[Math.floor(split.length / 2)];
                        sum += parseInt(middle);
                        break;
                    }
                    shuffle(split);
                    sorted = true;
                }
                break;
            }
        }
    }

    console.log(sum);
    console.log("done");
};

part2();
