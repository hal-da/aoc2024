import { assertEquals } from "@std/assert";
import { input1, testInput1, testResult1 } from "./inputs.ts";

const parseInput = (input: string) => {
  return input.split("\n")
      .map(l => l.split('   ').map(Number))
}

const puzzle1 = (input: string)=>{
  const leftSide:number[] = []
  const rightSide:number[] = []
  let res = 0
  parseInput(input).forEach(l => {
    leftSide.push(l[0])
    rightSide.push(l[1])
  });
  leftSide.sort()
  rightSide.sort()
  for (let i = 0; i < leftSide.length; i++) {
    res += Math.abs(leftSide[i]-rightSide[i])
  }
  console.log('result: ', res)
  return res;
}
puzzle1(testInput1)
puzzle1(input1)


const puzzle2 = (input: string) => {
  const leftSide:number[] = []
  const rightSide:number[] = []
  let res = 0
  parseInput(input).forEach(l => {
    leftSide.push(l[0])
    rightSide.push(l[1])
  });

  const rightSideMap = new Map<number, number>();
  rightSide.forEach(l => {
   rightSideMap.set(l, (rightSideMap.get(l) || 0)+1);
  })
  leftSide.forEach(l => {
    res +=  (rightSideMap.get(l) || 0) * l
  })

  console.log('result: ', res)
  return res;
}

// puzzle1(testInput1);
// puzzle1(input1);
puzzle2(testInput1);
puzzle2(input1)

Deno.test(function t() {
  assertEquals(puzzle1(testInput1), testResult1);
});
