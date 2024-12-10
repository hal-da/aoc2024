import { input, t1, t2, } from "./inputs.ts";

const parseInput = (input: string) => {
    return input.split("\n").map(line => line.split('').map(Number));
}
const pathsToPeaks:Set<string> = new Set();
let trails = 0

const followThePath = (startingPoint:number[], arr:number[][], pastPath:number[][] = []) => {
    pastPath.push(startingPoint);
    const [i,j] = startingPoint
    const height = arr[i][j]
    const oneUp = height+1
    if(arr[i][j]===9) {
        pathsToPeaks.add(`${pastPath[0][0]}/${pastPath[0][1]},${[i]}/${j}`)
        trails += 1
    }
    if(i-1 >= 0 && arr[i-1][j] === oneUp ) followThePath([i - 1, j], arr, pastPath);
    if(i+1 < arr.length && arr[i+1][j] === oneUp ) followThePath([i + 1, j], arr, pastPath);
    if(j-1 >= 0 && arr[i][j-1] === oneUp ) followThePath([i, j - 1], arr, pastPath);
    if(j+1 < arr[i].length && arr[i][j+1] === oneUp ) followThePath([i, j + 1], arr, pastPath);
}

const p1 = (input:string) => {
    const arr = parseInput(input);
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === 0) {
                followThePath([i,j], arr)
            }
        }
    }
    console.log(pathsToPeaks.size); // part 1
    console.log(trails) // part 2
}

p1(input)