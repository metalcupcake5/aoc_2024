import fs from "fs";
let file = await fs.readFileSync("./input.txt", "utf8");
let array = file.split(" ");

const part1 = async () => {
    for (let i = 0; i < 25; i++) {
        let newArray = [];
        for (let n of array) {
            // console.log(n);
            if (n == "0") {
                newArray.push("1");
            } else if (n.length % 2 == 0) {
                newArray.push(
                    parseInt(n.substring(0, n.length / 2)).toString()
                );
                newArray.push(parseInt(n.substring(n.length / 2)).toString());
            } else {
                newArray.push((parseInt(n) * 2024).toString());
            }
        }
        array = newArray;
    }
    console.log(array);
    console.log("done");
};

const values = {};

function getNext(value, depth) {
    if (depth == 75) {
        return 1;
    }
    if (values[value] && values[value][depth]) {
        return values[value][depth];
    }
    let sum = 0;
    if (value == 0) {
        let total = getNext(1, depth + 1);
        sum += total;
        if (!values[value]) {
            values[value] = {};
        }
        values[value][depth] = total;
    } else if (value.toString().length % 2 == 0) {
        let total =
            getNext(
                parseInt(
                    value.toString().substring(0, value.toString().length / 2)
                ),
                depth + 1
            ) +
            getNext(
                parseInt(
                    value.toString().substring(value.toString().length / 2)
                ),
                depth + 1
            );
        sum += total;
        if (!values[value]) {
            values[value] = {};
        }
        values[value][depth] = total;
    } else {
        let total = getNext(value * 2024, depth + 1);
        sum += total;
        if (!values[value]) {
            values[value] = {};
        }
        values[value][depth] = total;
    }
    return sum;
}

const part2 = async () => {
    let sum = 0;
    array = array.map((v) => parseInt(v));

    for (const v of array) {
        sum += getNext(v, 0);
    }

    console.log(sum);
    console.log("done");
};

part2();
