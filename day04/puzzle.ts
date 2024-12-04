import { input1, testInput1, testResult1 } from "./inputs.ts";

const parseInput = (input: string) => {
    return input.split("\n").map((line) => line.trim().split(""));
};

function puzzle1(input: string) {
    const arr = parseInput(input);
    const MAS = 'MAS'
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === "X") { // it's not stupid if it works
                if(arr[i][j+1] + arr[i][j+2] + arr[i][j+3] === MAS)sum++
                if(arr[i][j-1] + arr[i][j-2] + arr[i][j-3] === MAS)sum++
                // vertikal
                try {
                    if(arr[i-1][j] + arr[i-2][j] + arr[i-3][j] === MAS)sum++
                } catch (e){}
                try {
                    if(arr[i+1][j] + arr[i+2][j] + arr[i+3][j] === MAS)sum++
                } catch (e) {}
                // diagonal
                try {
                    if(arr[i-1][j-1] + arr[i-2][j-2] + arr[i-3][j-3] === MAS)sum++
                } catch (e) {}
                try {
                    if(arr[i+1][j+1] + arr[i+2][j+2] + arr[i+3][j+3] === MAS)sum++
                } catch (e) {}
                try {
                    if(arr[i-1][j+1] + arr[i-2][j+2] + arr[i-3][j+3] === MAS)sum++
                } catch (e) {}
                try {
                    if(arr[i+1][j-1] + arr[i+2][j-2] + arr[i+3][j-3] === MAS)sum++
                } catch (e) {}
            }
        }
    }
    return sum;
}
function puzzle2(input: string) {
    const arr = parseInput(input);
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === "A") {
                try { // might be out of bounds, just let it fail
                    const cross = arr[i-1][j-1] + arr[i-1][j+1] + arr[i+1][j+1] +arr[i+1][j-1];
                    if(cross ==='SSMM' || cross === 'MSSM' || cross === 'MMSS' || cross === 'SMMS')sum++
                } catch (e){}
            }
        }
    }
    return sum
}

console.log(puzzle1(input1));
console.log(puzzle2(input1));
