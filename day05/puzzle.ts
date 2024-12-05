import { input1, testInput1, testResult1 } from "./inputs.ts";
const parseInput = (input: string):[Map<number,number[]>, number[][]] => {
    const [rulesRaw, pages] = input.split("\n\n")
        .map((field) =>
            field.split("\n")
                .map((line) =>
                    line.split(/[,|]/)
                        .map(Number)
                )
        );
    const rules = new Map<number, number[]>();
    rulesRaw.forEach((rule) => {
        const [k, v] = rule;
        if (rules.has(k)) rules.get(k)!.push(v);
        else rules.set(k, [v]);
    });
    return [rules, pages];
};

const lineIsCorrect = (line: number[], rules: Map<number, number[]>) => {
    const pastNums: number[] = [];

    for (let i = 0; i < line.length; i++) {
        const actualNum = line[i];
        const forbiddenNums = rules.get(actualNum);
        if (forbiddenNums) {
            for (let j = 0; j < forbiddenNums.length; j++) {
                const forbiddenNum = forbiddenNums[j];
                if (pastNums.find((num) => num === forbiddenNum)) {
                    return false;
                }
            }
        }
        pastNums.push(actualNum);
    }
    return true;
};

function puzzle1(input: string) {
    const [rules, pages] = parseInput(input);

    let sum = 0;
    pages.forEach((line) => {
        if(lineIsCorrect(line, rules)){
            const iCenter = Math.floor(line.length / 2);
            sum+=line[iCenter]
        }
    });
    return sum;
}

const correctLine = (line: number[], rules: Map<number, number[]>) => {
    let pastNums: number[] = [];
    let lineChanged = false;
    for (let i = 0; i < line.length; i++) {
        if(i==0) pastNums = []

        const actualNum = line[i];
        const forbiddenNums = rules.get(actualNum);
        if (forbiddenNums) {
            for (let j = 0; j < forbiddenNums.length; j++) {
                const forbiddenNum = forbiddenNums[j];
                if (pastNums.find((num) => num === forbiddenNum)) {
                    const indexForbiddenNum = line.findIndex(num => num === forbiddenNum);
                    if(indexForbiddenNum > -1) {
                        line[indexForbiddenNum] = actualNum;
                        line[i] = forbiddenNum;
                        i = -1
                        pastNums = []
                    }
                    lineChanged = true;
                }
            }
        }
        pastNums.push(actualNum);
    }
    if(lineChanged)return line
    return null;
};

const puzzle2 = (input: string) => {
    const [rules,
        pages] = parseInput(input);

    let sum = 0;
    pages.forEach((line) => {
        const correctedLine = correctLine(line, rules);
        if(correctedLine) {
            const iCenter = Math.floor(line.length / 2);
            sum+=line[iCenter]
        }
    });
    return sum;
}
console.log(puzzle1(input1))
console.log(puzzle2(input1))
