import fs from "fs";
let file = await fs.readFileSync("./input.txt", "utf8");
let array = file.split("");

const part1 = async () => {
    let sum = 0;
    let exp = [];
    let empty = false;
    let count = 0;
    for (const e of array) {
        for (let i = 0; i < parseInt(e); i++) {
            exp.push(empty ? -1 : count);
        }
        if (!empty) {
            count++;
        }
        empty = !empty;
    }

    let reverse = [...exp];

    for (let i = 0; i < exp.length; i++) {
        let test = [...exp];
        test.splice(0, i);
        if (test.every((v) => v == -1)) {
            break;
        }
        if (exp[i] == -1) {
            let newItem = reverse.pop();

            while (newItem == -1) {
                newItem = reverse.pop();
            }
            exp[i] = newItem;
            exp[reverse.length] = -1;
        }
    }

    for (let i = 0; i < exp.length; i++) {
        let item = exp[i];
        if (item == -1) break;
        sum += i * item;
    }
    console.log(sum);
    console.log("done");
};

function findIndex(array, id) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == id) {
            return i;
        }
    }
    return -1;
}

const part2 = async () => {
    let sum = 0;
    let data = [];
    let empty = false;
    let count = 0;
    for (const e of array) {
        let amount = parseInt(e);
        data.push({
            id: empty ? -1 : count,
            amt: amount,
        });

        if (!empty) {
            count++;
        }
        empty = !empty;
    }

    let exp = [];

    let numbers = data.filter((v) => v.id != -1);

    for (let i = numbers.length - 1; i >= 0; i--) {
        let cur = numbers[i];
        let amount = cur.amt;
        let index = findIndex(data, cur.id);
        for (let j = 0; j < index; j++) {
            if (data[j].id == -1 && data[j].amt >= amount) {
                data.splice(index, 1, {
                    id: -1,
                    amt: cur.amt,
                });
                data.splice(j, 1, cur, { id: -1, amt: data[j].amt - amount });
                break;
            }
        }
    }

    for (let d of data) {
        for (let i = 0; i < d.amt; i++) {
            exp.push(d.id);
        }
    }

    for (let i = 0; i < exp.length; i++) {
        let item = exp[i];
        if (item == -1) continue;
        sum += i * item;
    }
    console.log(sum);
    console.log("done");
};

part2();
