import {
    input,
    prosenc,
    test2,
    test3,
    testInput1,
    testResult1,
} from "./inputs.ts";

const parseInput = (input: string) => {
    return input.split("\n").map((line) => line.split(""));
};
// used for p1
const antiNodeIsInRange = (
    src: number,
    mirror: number,
    max: number,
): [boolean, number, number] => {
    let log = "source: " + src + " mirror: " + mirror;
    const delta = Math.abs(src - mirror);
    log += " delta: " + delta;
    let inRange = false;
    let possibleAntiNode = 0;
    if (src === mirror) return [true, mirror, delta];
    if (src < mirror) {
        inRange = (mirror + delta) < max;

        log += " | src < mirror -> (mirror + delta) < max: " +
            ((mirror + delta) < max);
        if (inRange) possibleAntiNode += mirror + delta;
    }

    if (src > mirror) {
        inRange = (mirror - delta) >= 0;
        log += " | src > mirror -> (mirror - delta) >= 0" +
            ((mirror - delta) >= 0);
        if (inRange) possibleAntiNode += mirror - delta;
    }
    log += " therefore inRange: " + inRange;
    if (inRange) log += " at " + possibleAntiNode + " others: " + delta;
    console.log(log);

    return [inRange, possibleAntiNode, delta];
};

function puzzle1(input: string) {
    const area = parseInput(input);
    const map: Map<string, number[][]> = new Map();
    let sum = 0;
    const antiNodes: Set<string> = new Set();
    const antiNodes2: Set<string> = new Set();
    for (let i = 0; i < area.length; i++) {
        for (let j = 0; j < area[i].length; j++) {
            if (area[i][j] !== "." && area[i][j] !== "#") {
                const s = area[i][j];
                if (map.has(s)) {
                    map.get(s)!.push([i, j]);
                } else {
                    map.set(s, [[i, j]]);
                }
            }
        }
    }

    map.forEach((antennas) => {
        antennas.forEach((antenna) => {
            const source = antenna;
            antennas.forEach((mirror) => {
                if (mirror != source) {
                    const [iSource, jSource] = source;
                    const [iMirror, jMirror] = mirror;
                    const [iDelta, jDelta] = [iMirror - iSource, jMirror - jSource,];
                    let i = iSource, j = jSource;
                    while (i >= 0 && i < area.length && j >= 0 && j < area.length) {
                        antiNodes2.add(`${i}/${j}`);
                        i += iDelta;
                        j += jDelta;
                    }

                    i = iSource;
                    j = jSource;
                    while (i >= 0 && i < area.length && j >= 0 && j < area.length) {
                        antiNodes2.add(`${i}/${j}`);
                        i -= iDelta;
                        j -= jDelta;
                    }
                }
            });
        });
    });
    return antiNodes2.size;
}

console.log(puzzle1(input));
