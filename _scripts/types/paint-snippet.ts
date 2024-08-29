import { BlockType } from "@minecraft/server"

export type PaintSnippet = {
    type: BlockType | string,
    percent: number
}

export type PaintPositionedSnippet = {
    heightMap: (BlockType | string)[],
    percent: number
}