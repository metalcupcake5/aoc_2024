use std::fs;

fn part1() {
    let contents =
        fs::read_to_string("../../inputs/1/input.txt").expect("could not read from file");

    let mut numbers_left: Vec<i64> = Vec::new();
    let mut numbers_right: Vec<i64> = Vec::new();

    let split = contents.split('\n');

    for line in split {
        let array: Vec<&str> = line.split("   ").collect();
        numbers_left.push(array[0].parse::<i64>().unwrap());
        numbers_right.push(array[1].parse::<i64>().unwrap());
    }

    numbers_left.sort();
    numbers_right.sort();

    let mut diff = 0;

    for (i, v) in numbers_left.iter().enumerate() {
        diff += (v - numbers_right[i]).abs();
    }

    println!("{diff}");
}

fn part2() {
    let contents =
        fs::read_to_string("../../inputs/1/input.txt").expect("could not read from file");

    let mut numbers_left: Vec<i64> = Vec::new();
    let mut numbers_right: Vec<i64> = Vec::new();

    let split = contents.split('\n');

    for line in split {
        let array: Vec<&str> = line.split("   ").collect();
        numbers_left.push(array[0].parse::<i64>().unwrap());
        numbers_right.push(array[1].parse::<i64>().unwrap());
    }

    numbers_left.sort();
    numbers_right.sort();

    let mut similarity = 0;

    for v in numbers_left {
        let filtered: Vec<i64> = numbers_right
            .clone()
            .into_iter()
            .filter(|&x| x == v)
            .collect();

        similarity += v * filtered.len() as i64;
    }

    println!("{similarity}")
}

fn main() {
    part2();
}
