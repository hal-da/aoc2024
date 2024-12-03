import { input1, testInput1, testInput2, testResult1 } from "./inputs.ts";

function puzzle1(input: string) {
    const regexp = /mul\(\d+,\d+\)/gm;
    let sum = 0;
    [...input.matchAll(regexp)]
        .join(", ")
        .split(", ")
        .map((mul) =>
            mul.split(",")
                .map((mu) => mu.replace(/\D/g, ""))
                .map(Number)
        )
        .map((arr) => arr[0] * arr[1])
        .forEach((num) => sum += num);
    return sum;
}

const puzzle2 = (input: string) => {
  const regexp = /don't\(\).*?(do\(\)|$)/gs
  const i = input
      .replaceAll(regexp,'')
return puzzle1(i)
};
console.log(puzzle1(input1)) // 184122457
console.log(puzzle2(input1)) // 107862689
