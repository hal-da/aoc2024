import { assertEquals } from "@std/assert";
import { input1, testInput1, testResult1 } from "./inputs.ts";

const parseInput = (input: string) => {
    const leftSide: number[] = [];
    const rightSide: number[] = [];
    input.split("\n")
        .map((l) =>
            l.split(/\s+/)
                .map(Number)
        )
        .forEach((l) => {
            leftSide.push(l[0]);
            rightSide.push(l[1]);
        });
    return [leftSide, rightSide];
};

const puzzle1 = (input: string) => {
    const [leftSide, rightSide] = parseInput(input);
    leftSide.sort();
    rightSide.sort();
    let res = 0;
    for (let i = 0; i < leftSide.length; i++) {
        res += Math.abs(leftSide[i] - rightSide[i]);
    }
    return res;
};

const puzzle2 = (input: string) => {
    const [leftSide, rightSide] = parseInput(input);
    let res = 0;
    const rightSideMap = new Map<number, number>();

    rightSide.forEach((l) => {
        rightSideMap.set(l, (rightSideMap.get(l) || 0) + 1);
    });
    leftSide.forEach((l) => {
        res += (rightSideMap.get(l) || 0) * l;
    });
    return res;
};

console.log(puzzle1(testInput1))
console.log(puzzle1(input1))
console.log(puzzle2(testInput1))
console.log(puzzle2(input1))

Deno.test(function t() {
    assertEquals(puzzle1(testInput1), testResult1);
});
