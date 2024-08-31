import { Paint } from "../classes/paint";

export const singlePaints: Paint[] = [
    new Paint("참나무 판자")
        .addBases({
            type: "minecraft:planks",
            percent: 100
        }),
    new Paint("잔디 블록")
        .addBases({
            type: "minecraft:grass_block",
            percent: 100
        }),
    new Paint("돌 블록")
        .addBases({
            type: "minecraft:stone",
            percent: 100
        }),
    new Paint("사암")
        .addBases({
            type: "minecraft:sandstone",
            percent: 100
        }),
];