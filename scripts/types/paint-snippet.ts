import { BlockPermutation, BlockType } from "@minecraft/server"

export type PaintBlockType = string | { id: string, states?: Record<string, boolean | number | string>};

export type PaintSnippet = {
    type: PaintBlockType,
    percent: number
}

export type PaintPositionedSnippet = {
    heightMap: PaintBlockType[],
    percent: number
}