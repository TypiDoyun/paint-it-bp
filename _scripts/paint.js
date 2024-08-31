import { BlockTypes, LocationOutOfWorldBoundariesError, UnloadedChunksError } from "@minecraft/server";
import { sendMessage } from "./utils/player";
import { Vector3 } from "./utils/math/vector";
import { Random } from "./utils/math/random";
// export function makePaint(brush_size: number, paint: Paint): string {
//     let commands: string[] = [];
//     const { base, positioned: up } = paint;
//     for (let x = -brush_size; x <= brush_size; x++) {
//         for (let y = -brush_size; y <= brush_size; y++) {
//             for (let z = -brush_size; z <= brush_size; z++) {
//                 const percent = Random.randInt(1, 1000);
//                 const up_block_percent = Random.randInt(1, 1000);
//                 const down_block_percent = Random.randInt(1, 1000);
//                 // base.forEach(block => {
//                 //     console.log(block.identifier, block.percentage[0], block.percentage[1], "\n");
//                 // })
//                 const selected_block = base.find(block => block.percentage[0] <= percent && percent <= block.percentage[1]);
//                 const selected_positioned_blocks = up.filter(block => block.percentage[0] <= up_block_percent && up_block_percent <= block.percentage[1]);
//                 if (selected_block === undefined) throw new Error("can not find block");
//                 if (selected_positioned_blocks) selected_positioned_blocks.forEach(block => {
//                     if (block.float) return commands.push(`execute as @s anchored eyes positioned ^${x} ^${y} ^${z + 12} if block ~ ~ ~ ${blockIdentifier} run execute as @s anchored eyes positioned ^${x} ^${y} ^${z + 12} detect ~ ~${1.6 + block.height!} ~ air 0 fill ~ ~${1.6 + block.height!} ~ ~ ~${1.6 + block.height!} ~ ${block.identifier} ${block.data} keep`);
//                     let result = `execute as @s anchored eyes positioned ^${x} ^${y} ^${z + 12} if block ~ ~ ~ ${blockIdentifier} run `;
//                     for (let _y = 0; _y !== block.height!; _y += Math.sign(block.height!)) {
//                         result += `execute as @s anchored eyes positioned ^${x} ^${y} ^${z + 12} detect ~ ~${(1.6 + _y + Math.sign(block.height!)).toFixed(1)} ~ air 0 `;
//                     }
//                     result += `fill ~ ~${(1.6 + block.height!).toFixed(1)} ~ ~ ~${(1.6 + block.height!).toFixed(1)} ~ ${block.identifier} ${block.data} keep`;
//                     commands.push(result);
//                 });
//                 commands.push(`execute as @s anchored eyes positioned ^${x} ^${y} ^${z + 12} fill ~ ~1.6 ~ ~ ~1.6 ~ ${selected_block.identifier} ${selected_block.data} replace ${blockIdentifier}`)
//             }
//         }
//     }
//     const result = `${commands.join('\n')}\nplaysound item.trident.riptide_1 @a[r = 20] ~ ~ ~ 10 2.5 10`;
//     return result;
// }
export class Paint {
    name;
    static BLOCK_IDENTIFIER = "typidoyun:sketch";
    base;
    positioned;
    constructor(name) {
        this.name = name;
        this.base = [];
        this.positioned = [];
    }
    addBases(...bases) {
        this.base.push(...bases);
        return this;
    }
    addPositioneds(...positioned) {
        this.positioned.push(...positioned);
        return this;
    }
    isValid() {
        return this.base.length > 0;
    }
    *paintShape(executor, shape, origin) {
        if (this.base.length === 0)
            return;
        let snippetPercentSum = 0;
        let positionedSnippetPercentSum = 0;
        this.base.forEach(snippet => snippetPercentSum += snippet.percent);
        this.positioned.forEach(snippet => positionedSnippetPercentSum += snippet.percent);
        if (snippetPercentSum > 100)
            return;
        if (positionedSnippetPercentSum > 100)
            return;
        const originVector = Vector3.from(origin);
        const snippetPercents = [1];
        const positionedSnippetPercents = [1];
        this.base.forEach((snippet, index) => snippetPercents[index + 1] = snippetPercents[index] + snippet.percent);
        this.positioned.forEach((snippet, index) => positionedSnippetPercents[index + 1] = positionedSnippetPercents[index] + snippet.percent);
        const blockChangeMap = new Map();
        try {
            const blocks = Array.from(shape.getBlocks(originVector, origin.dimension));
            for (const block of blocks) {
                if (block.typeId !== Paint.BLOCK_IDENTIFIER)
                    continue;
                const randomInt = Random.randInt(1, 100);
                const selectedSnippet = this.base.find((_, index) => randomInt >= snippetPercents[index] && randomInt <= snippetPercents[index + 1] - 1);
                if (!selectedSnippet)
                    blockChangeMap.set(block, BlockTypes.get("minecraft:air"));
                else
                    blockChangeMap.set(block, selectedSnippet.type);
            }
            for (const block of blocks) {
                if (block.typeId !== Paint.BLOCK_IDENTIFIER)
                    continue;
                const randomInt = Random.randInt(1, 100);
                const selectedSnippet = this.positioned.find((_, index) => randomInt >= positionedSnippetPercents[index] && randomInt <= positionedSnippetPercents[index + 1] - 1);
                if (!selectedSnippet)
                    continue;
                let bottomBlock = block;
                try {
                    for (let index = 0; index < selectedSnippet.heightMap.length; index++) {
                        const blockType = selectedSnippet.heightMap[index];
                        const above = bottomBlock.above();
                        if (!above)
                            break;
                        if (above.typeId !== "minecraft:air")
                            break;
                        if (index !== 0) {
                            const bottomBlockType = selectedSnippet.heightMap[index - 1];
                            const bottomBlockTypeId = typeof bottomBlockType === "string" ? bottomBlockType : bottomBlockType.id;
                            const actualBottomBlockType = blockChangeMap.get(bottomBlock);
                            if (!actualBottomBlockType)
                                break;
                            const actualBottomBlockTypeId = typeof actualBottomBlockType === "string" ? actualBottomBlockType : actualBottomBlockType.id;
                            if (actualBottomBlockTypeId !== bottomBlockTypeId)
                                break;
                        }
                        bottomBlock = above;
                        blockChangeMap.set(above, blockType);
                    }
                }
                catch (error) {
                    if (!(error instanceof LocationOutOfWorldBoundariesError))
                        throw error;
                    continue;
                }
            }
            for (const [block, blockType] of blockChangeMap.entries()) {
                block.setType(blockType);
                yield;
            }
        }
        catch (error) {
            if (error instanceof UnloadedChunksError) {
                sendMessage(executor, "청크가 로딩되지 않았습니다.", "c");
            }
            else
                throw error;
        }
    }
}
