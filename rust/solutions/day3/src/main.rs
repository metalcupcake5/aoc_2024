use regex::Regex;
use std::fs;

fn part1() {
    let contents =
        fs::read_to_string("../../inputs/3/input.txt").expect("could not read from file");

    let join: String = contents.split('\n').collect();
    let program = join.as_str();

    let re = Regex::new(r"mul\((\d+),(\d+)\)").unwrap();

    let mut products: Vec<i32> = vec![];

    for (_, [a, b]) in re.captures_iter(&program).map(|c| c.extract()) {
        let first: i32 = a.parse().unwrap();
        let second: i32 = b.parse().unwrap();
        products.push(first * second);
    }

    let sum: i32 = products.iter().sum();

    println!("{}", sum);
}

fn part2() {
    let contents =
        fs::read_to_string("../../inputs/3/input.txt").expect("could not read from file");

    let join: String = contents.split('\n').collect();
    let program = join.as_str();

    let re = Regex::new(r"(do\(\)|don't\(\)|mul\(\d+,\d+\))").unwrap();

    let mut products: Vec<i32> = vec![];
    let mut parse = true;
    for (_, [m]) in re.captures_iter(&program).map(|c| c.extract()) {
        match m {
            "do()" => {
                parse = true;
            }
            "don't()" => {
                parse = false;
            }
            _ if parse => {
                let re2 = Regex::new(r"(\d+),(\d+)").unwrap();
                for (_, [a, b]) in re2.captures_iter(m).map(|c| c.extract()) {
                    let first: i32 = a.parse().unwrap();
                    let second: i32 = b.parse().unwrap();
                    products.push(first * second);
                }
            }
            _ => {}
        }
    }

    let sum: i32 = products.iter().sum();

    println!("{}", sum);
}

fn main() {
    part2();
}
