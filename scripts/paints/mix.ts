import { BlockPermutation } from "@minecraft/server";
import { Paint } from "../classes/paint";
import { PurpurBlockStates } from "@minecraft/vanilla-data";

export const mixPaints: Paint[] = [
    new Paint("조약돌 1")
        .addBases(
            {
                type: "cobblestone",
                percent: 80
            },
            {
                type: "mossy_cobblestone",
                percent: 15
            },
            {
                type: "polished_andesite",
                percent: 5
            },
        ),
    new Paint("조약돌 2")
        .addBases(
            {
                type: "stone",
                percent: 72
            },
            {
                type: "cobblestone",
                percent: 7
            },
            {
                type: "andesite",
                percent: 7
            },
            {
                type: "polished_andesite",
                percent: 7
            },
            {
                type: "light_gray_concrete_powder",
                percent: 7
            },
        ),
    new Paint("잔디 1")
        .addBases(
            {
                type: "grass_block",
                percent: 70
            },
            {
                type: "green_terracotta",
                percent: 10
            },
            {
                type: "moss_block",
                percent: 10
            },
            {
                type: "lime_terracotta",
                percent: 10
            },
        ),
    new Paint("잔디 2")
        .addBases(
            {
                type: "grass_block",
                percent: 60
            },
            {
                type: "podzol",
                percent: 40
            },
        ),
    new Paint("얼음 1")
        .addBases(
            {
                type: "blue_ice",
                percent: 25
            },
            {
                type: "blue_stained_glass",
                percent: 25
            },
            {
                type: "light_blue_stained_glass",
                percent: 25
            },
            {
                type: "packed_ice",
                percent: 25
            },
        ),
    new Paint("균사체 1")
        .addBases(
            {
                type: "podzol",
                percent: 20
            },
            {
                type: "mycelium",
                percent: 80
            },
        )
        .addPositioneds(
            {
                heightMap: [
                    "red_mushroom"
                ],
                percent: 5
            },
            {
                heightMap: [
                    "brown_mushroom"
                ],
                percent: 5
            },
        ),
    new Paint("네더랙 1")
        .addBases(
            {
                type: "netherrack",
                percent: 80
            },
            {
                type: "magma",
                percent: 10
            },
            {
                type: "nether_brick",
                percent: 10
            },
        ),
    new Paint("사암 1")
        .addBases(
            {
                type: "sandstone",
                percent: 60
            },
            {
                type: "cut_sandstone",
                percent: 20
            },
            {
                type: "smooth_sandstone",
                percent: 10
            },
            {
                type: "chiseled_sandstone",
                percent: 10
            },
        ),
    new Paint("나무 1")
        .addBases(
            {
                type: "wood",
                percent: 55
            },
            {
                type: "spruce_wood",
                percent: 30
            },
            {
                type: "stripped_jungle_wood",
                percent: 15
            },
        ),
    new Paint("보라보라 블록 1")
        .addBases(
            {
                type: "purpur_block",
                percent: 70
            },
            {
                type: {
                    id: "purpur_block",
                    states: {
                        chisel_type: "lines",
                        pillar_axis: "x"
                    } as PurpurBlockStates,
                },
                percent: 10
            },
            {
                type: {
                    id: "purpur_block",
                    states: {
                        chisel_type: "lines",
                        pillar_axis: "y"
                    } as PurpurBlockStates,
                },
                percent: 10
            },
            {
                type: {
                    id: "purpur_block",
                    states: {
                        chisel_type: "lines",
                        pillar_axis: "z"
                    } as PurpurBlockStates,
                },
                percent: 10
            },
        ),
].sort((a, b) => a.name.localeCompare(b.name));