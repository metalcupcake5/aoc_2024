use std::fs;

fn check(array: &Vec<i32>) -> bool {
    let mut diff: Vec<i32> = Vec::new();

    for i in 1..array.len() {
        diff.push(array[i - 1] - array[i]);
    }

    if !(diff.iter().all(|v| *v > 0) || diff.iter().all(|v| *v < 0)) {
        return false;
    }

    for v in diff {
        if v.abs() > 3 {
            return false;
        }
        if v == 0 {
            return false;
        }
    }

    true
}

fn part1() {
    let contents =
        fs::read_to_string("../../inputs/2/input.txt").expect("could not read from file");

    let split = contents.split('\n');

    let mut safe = 0;

    for line in split {
        let array: Vec<i32> = line.split(" ").map(|v| v.parse().unwrap()).collect();
        if check(&array) {
            safe += 1;
        }
    }

    println!("{safe}");
}

fn part2() {
    let contents =
        fs::read_to_string("../../inputs/2/input.txt").expect("could not read from file");

    let split = contents.split('\n');

    let mut safe = 0;

    for line in split {
        let array: Vec<i32> = line.split(" ").map(|v| v.parse().unwrap()).collect();
        if check(&array) {
            safe += 1;
            continue;
        }

        for i in 0..array.len() {
            let mut newArray = array.to_vec();
            newArray.remove(i);

            if check(&newArray) {
                safe += 1;
                break;
            }
        }
    }

    println!("{safe}");
}

fn main() {
    part2();
}
