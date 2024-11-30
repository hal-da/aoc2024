import { assertEquals } from "@std/assert";
import { input1, testInput1, testResult1 } from "./inputs.ts";

function puzzle1(input: string) {
  console.log("puzzle1 input: ", input);
  return '';
}

puzzle1(input1);

Deno.test(function t() {
  assertEquals(puzzle1(testInput1), testResult1);
});
