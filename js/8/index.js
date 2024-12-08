import fs from "fs";
let file = await fs.readFileSync("./input.txt", "utf8");
let array = file.split("\n");

const part1 = async () => {
    const freq = new Set();
    const loc = [];
    let rows = array.length;
    let columns = array[0].length;
    for (let r = 0; r < array.length; r++) {
        let line = array[r];
        let split = line.split("");
        for (let c = 0; c < split.length; c++) {
            if (line[c] == ".") continue;
            freq.add(line[c]);
            loc.push({
                f: line[c],
                l: [r, c],
            });
        }
    }
    const antinodes = [];
    for (const f of freq) {
        let locs = loc.filter((l) => l.f == f).map((v) => v.l);
        if (locs.length <= 1) continue;
        let pairs = locs
            .map((v, i) => locs.slice(i + 1).map((w) => [v, w]))
            .flat();

        for (const p of pairs) {
            let diff = [p[0][0] - p[1][0], p[0][1] - p[1][1]];

            let r1 = [p[0][0] + diff[0], p[0][1] + diff[1]];
            let r2 = [p[0][0] - diff[0] * 2, p[0][1] - diff[1] * 2];
            if (r1[0] >= 0 && r1[0] < rows && r1[1] >= 0 && r1[1] < columns) {
                if (
                    antinodes.filter((v) => v[0] == r1[0] && v[1] == r1[1])
                        .length <= 0
                ) {
                    antinodes.push(r1);
                }
            }
            if (r2[0] >= 0 && r2[0] < rows && r2[1] >= 0 && r2[1] < columns) {
                if (
                    antinodes.filter((v) => v[0] == r2[0] && v[1] == r2[1])
                        .length <= 0
                ) {
                    antinodes.push(r2);
                }
            }
        }
    }
    console.log(antinodes.length);
    console.log("done");
};

const part2 = async () => {
    const freq = new Set();
    const loc = [];
    let rows = array.length;
    let columns = array[0].length;
    for (let r = 0; r < array.length; r++) {
        let line = array[r];
        let split = line.split("");
        for (let c = 0; c < split.length; c++) {
            if (line[c] == ".") continue;
            freq.add(line[c]);
            loc.push({
                f: line[c],
                l: [r, c],
            });
        }
    }
    const antinodes = [];
    for (const f of freq) {
        let locs = loc.filter((l) => l.f == f).map((v) => v.l);
        if (locs.length <= 1) continue;
        let pairs = locs
            .map((v, i) => locs.slice(i + 1).map((w) => [v, w]))
            .flat();

        for (const p of pairs) {
            let diff = [p[0][0] - p[1][0], p[0][1] - p[1][1]];

            const pos = [p[0]];

            while (true) {
                let newLoc1 = [
                    pos[pos.length - 1][0] + diff[0],
                    pos[pos.length - 1][1] + diff[1],
                ];
                if (
                    newLoc1[0] < 0 ||
                    newLoc1[0] >= rows ||
                    newLoc1[1] < 0 ||
                    newLoc1[1] >= columns
                )
                    break;
                pos.push(newLoc1);
            }

            while (true) {
                let newLoc1 = [
                    pos[pos.length - 1][0] - diff[0],
                    pos[pos.length - 1][1] - diff[1],
                ];
                if (
                    newLoc1[0] < 0 ||
                    newLoc1[0] >= rows ||
                    newLoc1[1] < 0 ||
                    newLoc1[1] >= columns
                )
                    break;
                pos.push(newLoc1);
            }

            for (const x of pos) {
                if (
                    antinodes.filter((v) => v[0] == x[0] && v[1] == x[1])
                        .length <= 0
                ) {
                    antinodes.push(x);
                }
            }
        }
    }
    console.log(antinodes.length);
    console.log("done");
};

part2();
