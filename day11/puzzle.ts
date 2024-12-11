import {input, testInput1, testInput2} from "./inputs.ts";

const p = (input: string, times: number) => {
    const arr = input.split(" ").map(Number);
    let sum = 0
    arr.forEach(num => {
        const dict = {}
        dict[num] = 1
        for (let i = 0; i < times; i++) {
            Object.entries(dict).forEach(([k,v]) => {
                const n = Number(k)
                const str = n.toString()
                if(n===0){
                    if(dict["1"])dict["1"] = dict["1"] + v
                    else dict["1"] = v
                } else if(str.length % 2 === 0) {
                    const firstHalf = Number(str.slice(0, str.length / 2)).toString()
                    const secondHalf = Number(str.slice(str.length / 2, str.length)).toString()
                    if(dict[firstHalf])dict[firstHalf] = dict[firstHalf] + v
                    else dict[firstHalf] = v
                    if(dict[secondHalf])dict[secondHalf] = dict[secondHalf] + v
                    else dict[secondHalf] = v
                } else {
                    const x = n*2024
                    if(dict[x])dict[x] = dict[x] + v
                    else dict[x] = v
                }
                dict[str] = dict[str] - v
                if(dict[str]===0) delete dict[str]
            })
        }
        Object.values(dict).forEach((value) => sum += value)
    })
    console.log(sum)
}

p(input, 25);