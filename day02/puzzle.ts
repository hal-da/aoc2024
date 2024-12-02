import { input1, testInput1 } from "./inputs.ts";

const parseInput = (rawInput: string) => {
    return rawInput
        .split("\n")
        .map((line) =>
            line
                .split(" ")
                .map(Number)
        );
};
const checkIfLineIsSafe = (line:number[], dampener=0):boolean => {
    const atLeast = 1;
    const atMost = 3;
    const getGradient = (a:number,b:number) => a < b
    const gradient = getGradient(line[0], line[1]);
    for (let i = 0; i < line.length-1; i++) {
        const actual = line[i];
        const next = line[i+1];
        const difference = Math.abs(actual - next);
        if(
            gradient !== getGradient(actual,next)
            || difference < atLeast
            || difference > atMost
        ) {
            if(dampener===0) return false

            const newLine = line.toSpliced(i,1)
            const newLine2 = line.toSpliced(i+1,1)
            const newLine3 = line.toSpliced(i-1,1)
            return checkIfLineIsSafe(newLine, dampener-1)
                || checkIfLineIsSafe(newLine2, dampener-1)
                || checkIfLineIsSafe(newLine3, dampener-1);
        }
    }
    return true;
}
function puzzle(input: string, dampener=0) {
    let safeRows = 0
    const parsedInput = parseInput(input);
    parsedInput.forEach(line => {
        if(checkIfLineIsSafe(line, dampener)) safeRows++
    })
    return safeRows;
}

console.log('test1: ',puzzle(testInput1));
console.log('puzzle1: ', puzzle(input1))
console.log('test2; ',puzzle(testInput1, 1));
console.log('puzzle2; ',puzzle(input1, 1))
