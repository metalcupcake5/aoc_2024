import fs from "fs";
let file = await fs.readFileSync("./input.txt", "utf8");

const part2 = async () => {
    const map = file.split("\n").map((l) => l.split(""));

    let width = map[0].length;
    let height = map.length;

    // left, up, right, down
    const dirs = [
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
    ];

    let count = 0;

    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            if (["#", "^"].includes(map[r][c])) continue;
            let newMap = structuredClone(map);
            newMap[r][c] = "#";
            let pos = [
                map.findIndex((v) => v.includes("^")),
                map[map.findIndex((v) => v.includes("^"))].indexOf("^"),
            ];

            let originalPos = [
                map.findIndex((v) => v.includes("^")),
                map[map.findIndex((v) => v.includes("^"))].indexOf("^"),
            ];

            let walkedPositions = [width * (pos[0] - 1) + pos[1]];
            let dir = 1;
            while (true) {
                let pos1 = pos[0] + dirs[dir][0];
                let pos2 = pos[1] + dirs[dir][1];
                if (
                    originalPos[0] == pos1 &&
                    originalPos[1] == pos2 &&
                    dir == 1
                ) {
                    count++;
                    break;
                }
                if (pos1 >= height || pos1 < 0 || pos2 >= width || pos2 < 0) {
                    break;
                }
                if (map[pos1][pos2] == "#") {
                    dir = (dir + 1) % 4;
                    continue;
                }
                pos = [pos1, pos2];
                walkedPositions.push(width * (pos[0] - 1) + pos[1]);
            }
            // console.log(new Set(walkedPositions).size);
        }
    }

    console.log(count);

    console.log("done");
};

const part1 = async () => {
    const map = file.split("\n").map((l) => l.split(""));

    let width = map[0].length;
    let height = map.length;

    // left, up, right, down
    const dirs = [
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
    ];

    let pos = [
        map.findIndex((v) => v.includes("^")),
        map[map.findIndex((v) => v.includes("^"))].indexOf("^"),
    ];

    let walkedPositions = [width * (pos[0] - 1) + pos[1]];
    let dir = 1;
    while (true) {
        let pos1 = pos[0] + dirs[dir][0];
        let pos2 = pos[1] + dirs[dir][1];
        if (pos1 >= height || pos1 < 0 || pos2 >= width || pos2 < 0) {
            break;
        }
        if (map[pos1][pos2] == "#") {
            dir = (dir + 1) % 4;
            continue;
        }
        pos = [pos1, pos2];
        walkedPositions.push(width * (pos[0] - 1) + pos[1]);
    }
    console.log(count);

    console.log("done");
};

const test = async () => {
    const map = file.split("\n").map((l) => l.split(""));

    let width = map[0].length;
    let height = map.length;

    // left, up, right, down
    const dirs = [
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
    ];

    let count = 0;

    let pos = [
        map.findIndex((v) => v.includes("^")),
        map[map.findIndex((v) => v.includes("^"))].indexOf("^"),
    ];

    let originalWalkedPositions = [
        {
            row: pos[0],
            col: pos[1],
            dir: 1,
        },
    ];
    let dir = 1;
    while (true) {
        let pos1 = pos[0] + dirs[dir][0];
        let pos2 = pos[1] + dirs[dir][1];
        if (pos1 >= height || pos1 < 0 || pos2 >= width || pos2 < 0) {
            break;
        }
        if (["#", "O"].includes(map[pos1][pos2])) {
            dir = (dir + 1) % 4;
            continue;
        }
        pos = [pos1, pos2];
        originalWalkedPositions.push({
            row: pos[0],
            col: pos[1],
            dir,
        });
    }

    console.log(originalWalkedPositions);

    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            if (
                originalWalkedPositions.filter(
                    (v) => Math.abs(v.row - r) < 1 && Math.abs(v.col - c) < 1
                ).length < 1
            )
                continue;
            console.log(r, c);
            // if (r != 6) continue;
            // if (c != 3) continue;
            if (["#", "^"].includes(map[r][c])) continue;
            let newMap = structuredClone(map);
            newMap[r][c] = "O";
            // console.log(r, c);
            // console.log(newMap.map((v) => v.join("")).join("\n"));
            let pos = [
                map.findIndex((v) => v.includes("^")),
                map[map.findIndex((v) => v.includes("^"))].indexOf("^"),
            ];

            let originalPos = [
                map.findIndex((v) => v.includes("^")),
                map[map.findIndex((v) => v.includes("^"))].indexOf("^"),
            ];

            let walkedPositions = [
                {
                    row: pos[0],
                    col: pos[1],
                    dir: 1,
                },
            ];
            let dir = 1;
            while (true) {
                if (
                    walkedPositions.filter(
                        (v) =>
                            v.row == pos[0] && v.col == pos[1] && v.dir == dir
                    ).length > 1
                ) {
                    console.log(dir);
                    count++;
                    // console.log(walkedPositions);
                    break;
                }
                let pos1 = pos[0] + dirs[dir][0];
                let pos2 = pos[1] + dirs[dir][1];
                if (pos1 >= height || pos1 < 0 || pos2 >= width || pos2 < 0) {
                    // console.log("exited");
                    break;
                }
                if (["#", "O"].includes(newMap[pos1][pos2])) {
                    dir = (dir + 1) % 4;
                    continue;
                }
                pos = [pos1, pos2];
                // console.log(`traveled to ${pos}`);
                walkedPositions.push({
                    row: pos[0],
                    col: pos[1],
                    dir,
                });
            }
            // console.log(new Set(walkedPositions).size);
        }
    }

    console.log(count);

    console.log("done");
};

test();
