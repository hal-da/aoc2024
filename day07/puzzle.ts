import { input, testInput1, testResult1 } from "./inputs.ts";

const parseInput = (input: string) => {
    return input
        .split("\n")
        .map((line) => line
            .replace(':', '')
            .split(" ")
            .map(Number))
};

const myEval = (input: string[]) => {
    let sum = Number(input[0])
    for (let i = 1; i < input.length-1 ; i=i+2) {
        const operator = input[i]
        const operand = Number(input[i + 1])
        if(operator === "+") {
            sum += operand;
        } else if (operator === "*") {
            sum *= operand;
        } else {
            const sumStr = sum.toString()
            const operandStr = operand.toString()
            sum = Number(sumStr + operandStr)
        }
    }
    return sum;
}

const p1 = (input:string, base=2) => {
    const parsedInput = parseInput(input);
    let sum = 0
    for (const line of parsedInput) {
        const [result, ...ops] = line
        let valid = false;
        const numberOfOperators = ops.length-1
        const numberOfPossibilities = Math.pow(base, numberOfOperators)
        for (let i = 0; i < numberOfPossibilities; i++) {
            const bin = i.toString(base).padStart(numberOfOperators, "0")
            const binArr = bin.split('')
            const operation:string[] = []
            for (let j = 0; j < binArr.length; j++) {
                operation.push(ops[j].toString());
                if(binArr[j]=='0') operation.push('+');
                else if(binArr[j]=='1') operation.push('*');
                else operation.push('||');
            }
            operation.push(ops.at(-1)!.toString());
            const res = myEval(operation)
            if(res===result) {
                valid = true
            }
        }
        if(valid) {
            sum += result
        }
    }
    console.log(sum)
};

// too low p1: 189903872948, 189903873130

p1(input); // puzzle 1 - 932137732557
p1(input, 3) // puzzle 2 - 661823605105500
