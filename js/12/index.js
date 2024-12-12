import fs from "fs";
let file = await fs.readFileSync("./input.txt", "utf8");
let array = file.trim().split("\n");
array = ["0".repeat(array[0].length), ...array, "0".repeat(array[0].length)];
let map = array.map((v) => [0, ...v.split(""), 0]);

let working = [];

function findAdj(currentCell) {
    let directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];
    for (const d of directions) {
        let row = currentCell[0] + d[0];
        let col = currentCell[1] + d[1];
        if (map[row][col] == map[currentCell[0]][currentCell[1]]) {
            if (working.filter((v) => v[0] == row && v[1] == col).length <= 0) {
                working.push([row, col]);
                findAdj([row, col]);
            }
        }
    }
    if (
        working.filter((v) => v[0] == currentCell[0] && v[1] == currentCell[1])
            .length > 0
    ) {
        return;
    }
    working.push([currentCell[0], currentCell[1]]);
}

let regions = [];
let trackedCells = [];

const part1 = async () => {
    for (let r = 1; r < map.length - 1; r++) {
        for (let c = 1; c < map[0].length - 1; c++) {
            if (trackedCells.filter((v) => v[0] == r && v[1] == c).length > 0) {
                continue;
            }
            let region = {
                crop: map[r][c],
                cells: [],
            };

            let current = [r, c];
            working = [];
            findAdj(current);
            region.cells = working;
            trackedCells = [...working, ...trackedCells];
            regions.push(region);
        }
    }

    let sum = 0;

    for (const r of regions) {
        let area = r.cells.length;
        let perimeter = 0;
        for (const c of r.cells) {
            let directions = [
                [0, 1],
                [0, -1],
                [1, 0],
                [-1, 0],
            ];
            for (const d of directions) {
                let row = c[0] + d[0];
                let col = c[1] + d[1];
                if (map[row][col] != map[c[0]][c[1]]) {
                    perimeter++;
                }
            }
        }
        sum += area * perimeter;
    }
    console.log(sum);
};

const part2 = async () => {
    for (let r = 1; r < map.length - 1; r++) {
        for (let c = 1; c < map[0].length - 1; c++) {
            if (trackedCells.filter((v) => v[0] == r && v[1] == c).length > 0) {
                continue;
            }
            let region = {
                crop: map[r][c],
                cells: [],
            };

            let current = [r, c];
            working = [];
            findAdj(current);
            region.cells = working;
            trackedCells = [...working, ...trackedCells];
            regions.push(region);
        }
    }

    let sum = 0;

    for (const r of regions) {
        let area = r.cells.length;
        let sides = 0;
        for (const c of r.cells) {
            let value = map[c[0]][c[1]];
            let directions = [
                [0, 1],
                [1, 0],
                [0, -1],
                [-1, 0],
            ];
            let adjacent = 0;
            for (let i = 0; i < 4; i++) {
                let first = directions[i % 4];
                let second = directions[(i + 1) % 4];
                if (
                    map[c[0] + first[0]][c[1] + first[1]] != value &&
                    map[c[0] + second[0]][c[1] + second[1]] != value
                ) {
                    sides++;
                }
                if (
                    map[c[0] + first[0]][c[1] + first[1]] == value &&
                    map[c[0] + second[0]][c[1] + second[1]] == value &&
                    map[c[0] + first[0] + second[0]][
                        c[1] + first[1] + second[1]
                    ] != value
                ) {
                    sides++;
                }
            }

            if (adjacent == 3) sides++;
        }
        sum += area * sides;
    }
    console.log(sum);
};

part2();
