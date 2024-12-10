import fs from "fs";
let file = await fs.readFileSync("./input.txt", "utf8");
let array = file.trim().split("\n");

const part1 = async () => {
    let sum = 0;
    const map = array.map((l) => l.split("").map((v) => parseInt(v)));
    const mapData = array.map((l) => new Array(map[0].length).fill(0));
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[0].length; c++) {
            let adj = [];
            if (r > 0) {
                adj.push({
                    number: map[r - 1][c],
                    row: r - 1,
                    column: c,
                });
            }
            if (c > 0) {
                adj.push({
                    number: map[r][c - 1],
                    row: r,
                    column: c - 1,
                });
            }
            if (r < map.length - 1) {
                adj.push({
                    number: map[r + 1][c],
                    row: r + 1,
                    column: c,
                });
            }
            if (c < map[0].length - 1) {
                adj.push({
                    number: map[r][c + 1],
                    row: r,
                    column: c + 1,
                });
            }
            mapData[r][c] = {
                number: map[r][c],
                row: r,
                column: c,
                adj,
            };
        }
    }
    let start = [].concat(...mapData).filter((v) => v.number == 0);
    for (let a of start) {
        let cells = [a];
        while (cells.filter((v) => v.number != 9).length > 0) {
            const check = cells.filter((v) => v.number != 9);
            cells = cells.filter((v) => v.number == 9);
            for (const c of check) {
                for (const a of c.adj) {
                    if (a.number == c.number + 1) {
                        if (a.number == 9) {
                            if (
                                cells.filter(
                                    (v) =>
                                        v.row == a.row && v.column == a.column
                                ).length > 0
                            ) {
                                continue;
                            }
                        }
                        cells.push(mapData[a.row][a.column]);
                    }
                }
            }
        }
        sum += cells.length;
    }
    console.log(sum);
    console.log("done");
};

const part2 = async () => {
    let sum = 0;
    const map = array.map((l) => l.split("").map((v) => parseInt(v)));
    const mapData = array.map((l) => new Array(map[0].length).fill(0));
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[0].length; c++) {
            let adj = [];
            if (r > 0) {
                adj.push({
                    number: map[r - 1][c],
                    row: r - 1,
                    column: c,
                });
            }
            if (c > 0) {
                adj.push({
                    number: map[r][c - 1],
                    row: r,
                    column: c - 1,
                });
            }
            if (r < map.length - 1) {
                adj.push({
                    number: map[r + 1][c],
                    row: r + 1,
                    column: c,
                });
            }
            if (c < map[0].length - 1) {
                adj.push({
                    number: map[r][c + 1],
                    row: r,
                    column: c + 1,
                });
            }
            mapData[r][c] = {
                number: map[r][c],
                row: r,
                column: c,
                adj,
            };
        }
    }
    let start = [].concat(...mapData).filter((v) => v.number == 0);
    for (let a of start) {
        let cells = [a];
        while (cells.filter((v) => v.number != 9).length > 0) {
            const check = cells.filter((v) => v.number != 9);
            cells = cells.filter((v) => v.number == 9);
            for (const c of check) {
                for (const a of c.adj) {
                    if (a.number == c.number + 1) {
                        if (a.number == 9) {
                            if (
                                cells.filter(
                                    (v) =>
                                        v.row == a.row && v.column == a.column
                                ).length > 0
                            ) {
                                sum++;
                                continue;
                            }
                        }
                        cells.push(mapData[a.row][a.column]);
                    }
                }
            }
        }
        sum += cells.length;
    }
    console.log(sum);
    console.log("done");
};

part1();
