import { BlockTypes, Player, system } from "@minecraft/server";
import { playSound } from "../utils/player";
import { Vector3 } from "../utils/math/vector3";
import { Queue } from "../utils/queue";
export class EraserComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
        // this.onMineBlock = this.onMineBlock.bind(this);
    }
    onUse(eventData) {
        const { source, itemStack } = eventData;
        playSound(source, "random.pop");
    }
    onMineBlock(eventData) {
        const { source, minedBlockPermutation, block } = eventData;
        if (!(source instanceof Player))
            return;
        if (minedBlockPermutation.type.id !== "typidoyun:sketch")
            return;
        const visited = new Set();
        const queue = new Queue();
        const start = Vector3.from(block.location);
        queue.push(start);
        system.runJob(function* () {
            while (queue.size > 0) {
                const current = queue.pop();
                const locationStr = current.toString();
                if (visited.has(locationStr))
                    continue;
                visited.add(locationStr);
                const currentBlock = source.dimension.getBlock(current);
                if (!currentBlock)
                    continue;
                if (currentBlock.typeId !== "typidoyun:sketch" && current !== start)
                    continue;
                const air = BlockTypes.get("minecraft:air");
                currentBlock.setType(air);
                yield;
                queue.push(current.clone.add([1, 0, 0]), current.clone.add([0, 1, 0]), current.clone.add([0, 0, 1]), current.clone.add([-1, 0, 0]), current.clone.add([0, -1, 0]), current.clone.add([0, 0, -1]));
            }
        }());
    }
}
