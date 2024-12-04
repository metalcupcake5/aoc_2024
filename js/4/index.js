import fs from "fs";
let file = await fs.readFileSync("./input.txt", "utf8");
let array = file.split("\n");

const part1 = async () => {
    let count = 0;
    let chart = [];
    for (const line of array) {
        chart.push(line.split(""));
        // rows
        count += line.match(/XMAS/g)?.length ?? 0;
        count += line.match(/SAMX/g)?.length ?? 0;
    }

    let height = chart.length;
    let width = chart[0].length;
    let columns = new Array(width);
    for (let i = 0; i < columns.length; i++) {
        columns[i] = new Array(height);
    }

    let xmas = "XMAS";
    for (let r = 0; r < chart.length; r++) {
        for (let c = 0; c < chart[0].length; c++) {
            let cell = chart[r][c];
            columns[c][r] = cell;
            // up to the right
            if (r > 2 && c < width - 3) {
                for (let i = 0; i < xmas.length; i++) {
                    if (chart[r - i][c + i] != xmas[i]) {
                        break;
                    }
                    if (i == 3) {
                        count++;
                    }
                }
            }
            // up to the left
            if (r > 2 && c > 2) {
                for (let i = 0; i < xmas.length; i++) {
                    if (chart[r - i][c - i] != xmas[i]) {
                        break;
                    }
                    if (i == 3) {
                        count++;
                    }
                }
            }
            // down to the left
            if (r < height - 3 && c > 2) {
                for (let i = 0; i < xmas.length; i++) {
                    if (chart[r + i][c - i] != xmas[i]) {
                        break;
                    }
                    if (i == 3) {
                        count++;
                    }
                }
            }
            // down to the right
            if (r < height - 3 && c < width - 3) {
                for (let i = 0; i < xmas.length; i++) {
                    if (chart[r + i][c + i] != xmas[i]) {
                        break;
                    }
                    if (i == 3) {
                        count++;
                    }
                }
            }
        }
    }

    for (const c of columns) {
        const line = c.join("");
        // columns
        count += line.match(/XMAS/g)?.length ?? 0;
        count += line.match(/SAMX/g)?.length ?? 0;
    }

    console.log(count);
    console.log("done");
};

const part2 = async () => {
    let count = 0;
    let chart = [];
    for (const line of array) {
        chart.push(line.split(""));
    }

    for (let r = 1; r < chart.length - 1; r++) {
        for (let c = 1; c < chart[0].length - 1; c++) {
            let cell = chart[r][c];
            if (cell != "A") continue;

            let d1 = chart[r - 1][c - 1] + cell + chart[r + 1][c + 1];
            let mas1 = d1 == "MAS" || d1 == "SAM";
            let d2 = chart[r + 1][c - 1] + cell + chart[r - 1][c + 1];
            let mas2 = d2 == "MAS" || d2 == "SAM";
            if (mas1 && mas2) count++;
        }
    }

    console.log(count);
    console.log("done");
};

part2();
