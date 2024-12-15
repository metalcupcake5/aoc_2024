import fs from "fs";
let file = await fs.readFileSync("./input.txt", "utf8");
let array = file.split("\n");

// Positive x means the robot is moving to the right, and positive y means the robot is moving down.
const part1 = async () => {
    let xlimit = 101;
    let ylimit = 103;
    let robots = [];
    for (let robot of array) {
        let split = robot.split(" ");
        let data = {
            pos: [
                parseInt(split[0].substring(2).split(",")[0]),
                parseInt(split[0].substring(2).split(",")[1]),
            ],
            vel: [
                parseInt(split[1].substring(2).split(",")[0]),
                parseInt(split[1].substring(2).split(",")[1]),
            ],
        };
        robots.push(data);
    }
    for (let t = 0; t < 100; t++) {
        for (let r of robots) {
            let newXPos = r.pos[0] + r.vel[0];
            let newYPos = r.pos[1] + r.vel[1];
            r.pos = [
                newXPos < 0 ? xlimit + newXPos : newXPos % xlimit,
                newYPos < 0 ? ylimit + newYPos : newYPos % ylimit,
            ];
        }
    }

    let halfwayX = Math.floor(xlimit / 2);
    let halfwayY = Math.floor(ylimit / 2);
    let quadrants = [0, 0, 0, 0];
    for (let r of robots) {
        if (r.pos[0] > halfwayX && r.pos[1] < halfwayY) quadrants[0] += 1; // quad 1
        if (r.pos[0] < halfwayX && r.pos[1] < halfwayY) quadrants[1] += 1; // quad 2
        if (r.pos[0] < halfwayX && r.pos[1] > halfwayY) quadrants[2] += 1;
        if (r.pos[0] > halfwayX && r.pos[1] > halfwayY) quadrants[3] += 1;
    }
    console.log(quadrants);
    const product = quadrants.reduce(
        (accumulator, currentValue) => accumulator * currentValue,
        1
    );
    console.log(product);
    console.log("done");
};

const part2 = async () => {
    let xlimit = 101;
    let ylimit = 103;
    let robots = [];
    for (let robot of array) {
        let split = robot.split(" ");
        let data = {
            pos: [
                parseInt(split[0].substring(2).split(",")[0]),
                parseInt(split[0].substring(2).split(",")[1]),
            ],
            vel: [
                parseInt(split[1].substring(2).split(",")[0]),
                parseInt(split[1].substring(2).split(",")[1]),
            ],
        };
        robots.push(data);
    }
    let time = 0;
    while (true) {
        time++;
        for (let r of robots) {
            let newXPos = r.pos[0] + r.vel[0];
            let newYPos = r.pos[1] + r.vel[1];
            r.pos = [
                newXPos < 0 ? xlimit + newXPos : newXPos % xlimit,
                newYPos < 0 ? ylimit + newYPos : newYPos % ylimit,
            ];
        }
        let unique = 0;
        for (let r of robots) {
            if (
                robots.filter(
                    (v) => v.pos[0] == r.pos[0] && v.pos[1] == r.pos[1]
                ).length > 1
            )
                continue;
            unique++;
        }
        if (unique == array.length) {
            console.log(time);
            break;
        }
    }
};

part2();
