import fs from "fs";
let file = await fs.readFileSync("./input.txt", "utf8");
let array = file.split("\n\n");

const directions = {
    "<": [0, -1],
    "^": [-1, 0],
    ">": [0, 1],
    v: [1, 0],
};

const part1 = async () => {
    let map = array[0].split("\n").map((v) => v.split(""));
    let row = -1;
    let col = -1;
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map.length; c++) {
            if (map[r][c] == "@") {
                row = r;
                col = c;
                break;
            }
        }
        if (row > -1 && col > -1) break;
    }

    let instructions = array[1].split("\n").join("").split("");

    const move = (cellR, cellC, direction) => {
        if (map[cellR][cellC] != "O") {
            return;
        }
        let newRow = cellR + directions[direction][0];
        let newCol = cellC + directions[direction][1];
        let nextPos = map[newRow][newCol];
        if (nextPos == "#") return;
        if (nextPos == "O") {
            move(newRow, newCol, direction);
        }
        if (map[newRow][newCol] != "O") {
            map[newRow][newCol] = "O";
            map[cellR][cellC] = ".";
        }
        return;
    };

    for (let i of instructions) {
        let newRow = row + directions[i][0];
        let newCol = col + directions[i][1];
        let nextPos = map[newRow][newCol];
        if (nextPos == "#") continue;
        if (nextPos == "O") {
            move(newRow, newCol, i);
        }
        if (map[newRow][newCol] == "O") continue;
        map[row][col] = ".";
        map[newRow][newCol] = "@";
        row = newRow;
        col = newCol;
    }
    let s = 0;
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map.length; c++) {
            if (map[r][c] == "O") {
                s += r * 100 + c;
            }
        }
    }
    console.log(s);
    console.log("done");
};

const part2 = async () => {
    let map = array[0].split("\n").map((v) => v.split(""));
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[r].length; c++) {
            switch (map[r][c]) {
                case "#":
                    map[r].splice(c, 0, "#");
                    c++;
                    break;
                case "O":
                    map[r].splice(c, 1, "[", "]");
                    c++;
                    break;
                case "@":
                    map[r].splice(c, 1, "@", ".");
                    c++;
                    break;
                case ".":
                    map[r].splice(c, 0, ".");
                    c++;
                    break;
            }
        }
    }
    let row = -1;
    let col = -1;
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[0].length; c++) {
            if (map[r][c] == "@") {
                row = r;
                col = c;
                break;
            }
        }
        if (row > -1 && col > -1) break;
    }

    let instructions = array[1].split("\n").join("").split("");

    const seek = (cellR, cellC, direction) => {
        if (!"[]".includes(map[cellR][cellC])) {
            return false;
        }
        let sideDir = map[cellR][cellC] == "[" ? 1 : -1;
        let sidePos = [cellR, cellC + sideDir];
        let newRow = cellR + directions[direction][0];
        let newCol = cellC + directions[direction][1];
        let newRowSide = sidePos[0] + directions[direction][0];
        let newColSide = sidePos[1] + directions[direction][1];
        let nextPos = map[newRow][newCol];
        let nextPosSide = map[newRowSide][newColSide];
        if (nextPos == "#" || nextPosSide == "#") return false;
        if (".".includes(nextPos) && ".".includes(nextPosSide)) return true;

        let movable = true;
        if ("<>".includes(direction)) {
            if (
                (direction == ">" && sideDir == 1) ||
                (direction == "<" && sideDir == -1)
            ) {
                if ("[]".includes(nextPosSide)) {
                    movable =
                        movable && seek(newRowSide, newColSide, direction);
                }
                if (!"[]".includes(map[newRowSide][newColSide])) {
                    if (!movable) return false;
                }
            } else {
                movable = movable && seek(newRow, newCol, direction);
                if (!"[]".includes(map[newRow][newCol])) {
                    if (!movable) return false;
                }
            }
        } else {
            if ("[]".includes(nextPosSide)) {
                movable = movable && seek(newRowSide, newColSide, direction);
            }
            if ("[]".includes(nextPos)) {
                movable = movable && seek(newRow, newCol, direction);
            }
            if (
                !"[]".includes(map[newRow][newCol]) &&
                !"[]".includes(map[newRowSide][newColSide])
            ) {
                if (!movable) return false;
            }
        }
        return movable;
    };

    const move = (cellR, cellC, direction) => {
        if (!"[]".includes(map[cellR][cellC])) {
            return;
        }
        let sideDir = map[cellR][cellC] == "[" ? 1 : -1;
        let sidePos = [cellR, cellC + sideDir];
        let newRow = cellR + directions[direction][0];
        let newCol = cellC + directions[direction][1];
        let newRowSide = sidePos[0] + directions[direction][0];
        let newColSide = sidePos[1] + directions[direction][1];
        let nextPos = map[newRow][newCol];
        let nextPosSide = map[newRowSide][newColSide];
        if (nextPos == "#" || nextPosSide == "#") return false;
        let movable = seek(cellR, cellC, direction);
        if (!movable) return;
        if ("<>".includes(direction)) {
            if (
                (direction == ">" && sideDir == 1) ||
                (direction == "<" && sideDir == -1)
            ) {
                if ("[]".includes(nextPosSide)) {
                    move(newRowSide, newColSide, direction);
                }
                if (!"[]".includes(map[newRowSide][newColSide])) {
                    map[newRowSide][newColSide] = direction == "<" ? "[" : "]";
                    map[newRow][newCol] = direction == "<" ? "]" : "[";
                    map[cellR][cellC] = ".";
                }
            } else {
                move(newRow, newCol, direction);
                if (!"[]".includes(map[newRow][newCol])) {
                    map[newRow][newCol] = "O";
                    map[cellR][cellC] = ".";
                }
            }
        } else {
            if ("[]".includes(nextPosSide)) {
                move(newRowSide, newColSide, direction);
            }
            if ("[]".includes(nextPos)) {
                move(newRow, newCol, direction);
            }
            if (
                !"[]".includes(map[newRow][newCol]) &&
                !"[]".includes(map[newRowSide][newColSide])
            ) {
                map[newRowSide][newColSide] = sideDir == 1 ? "]" : "[";
                map[newRow][newCol] = sideDir == 1 ? "[" : "]";
                map[cellR][cellC + sideDir] = ".";
                map[cellR][cellC] = ".";
            }
        }
        return true;
    };

    for (let i of instructions) {
        let newRow = row + directions[i][0];
        let newCol = col + directions[i][1];
        let nextPos = map[newRow][newCol];
        if (nextPos == "#") continue;
        if ("[]".includes(nextPos)) {
            move(newRow, newCol, i);
        }
        if ("[]".includes(map[newRow][newCol])) continue;
        map[row][col] = ".";
        map[newRow][newCol] = "@";
        row = newRow;
        col = newCol;
    }
    let s = 0;
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[r].length; c++) {
            if (map[r][c] == "[") {
                s += r * 100 + c;
            }
        }
    }
    console.log(s);
    console.log("done");
};

part2();
