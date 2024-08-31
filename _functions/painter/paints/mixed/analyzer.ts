import { readdirSync, readFileSync } from "fs";

const index = 16;
const files = readdirSync("./_functions/painter/paints/mixed");

const filePath = files.find(filename => filename.includes(`-${index}.mcfunction`));

if (!filePath) throw new Error(`File not found for index ${index}`);

console.log(filePath);

const content = readFileSync(`./_functions/painter/paints/mixed/${filePath}`, "utf-8")
const data: {[key: string]: number} = {};

const blocks = content.split("\n").map(
    line => line.match(/fill (?:~|\^)(?:\d+(?:\.\d+)?)? (?:~|\^)(?:\d+(?:\.\d+)?)? (?:~|\^)(?:\d+(?:\.\d+)?)? (?:~|\^)(?:\d+(?:\.\d+)?)? (?:~|\^)(?:\d+(?:\.\d+)?)? (?:~|\^)(?:\d+(?:\.\d+)?)? ([^\s]+(?: \d+)?) replace/)?.[1] ?? 
        line.match(/setblock ~ ~ ~ ([^\s]+(?: \d+)?)/)?.[1]).filter(block => block) as string[];
for (const block of blocks) {
    if (block in data) {
        data[block]++;
    }
    else {
        data[block] = 1;
    }
}
const total = blocks.length;
// const base: {[key: string]: number} = {};

console.log(`new Paint("")`)
console.log(`    .addBases(`)
for (const [ block, count ] of Object.entries(data)) {
    const percent = count / total * 100;
    const rounded = Math.round(percent * 100) / 100;
    // base[block] = rounded;

    console.log(`        {`);
    console.log(`            type: "${block}",`);
    console.log(`            percent: ${rounded}`);
    console.log(`        },`);
}
console.log(`    ),`)