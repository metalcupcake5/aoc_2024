import fs from "fs";
let file = await fs.readFileSync("./input.txt", "utf8");
let array = file.split("\n");

const part1 = async () => {
    let sum = 0;
    for (const line of array) {
        let split = line.split(":");
        let total = parseInt(split[0]);
        let nums = split[1]
            .trim()
            .split(" ")
            .map((v) => parseInt(v));
        let totals = [nums[0]];
        for (let i = 1; i < nums.length; i++) {
            let newTotals = [];
            for (let n of totals) {
                newTotals.push(n + nums[i]);
                newTotals.push(n * nums[i]);
            }
            totals = newTotals;
        }
        if (totals.includes(total)) {
            sum += total;
        }
    }
    console.log(sum);
    console.log("done");
};

const part2 = async () => {
    let sum = 0;
    for (const line of array) {
        let split = line.split(":");
        let total = parseInt(split[0]);
        let nums = split[1]
            .trim()
            .split(" ")
            .map((v) => parseInt(v));
        let totals = [nums[0]];
        for (let i = 1; i < nums.length; i++) {
            let newTotals = [];
            for (let n of totals) {
                newTotals.push(n + nums[i]);
                newTotals.push(n * nums[i]);
                newTotals.push(parseInt(n + `${nums[i]}`));
            }
            totals = newTotals;
        }
        if (totals.includes(total)) {
            sum += total;
        }
    }
    console.log(sum);
    console.log("done");
};

part2();
