import { BlockTypes, ItemComponentMineBlockEvent, ItemComponentUseEvent, ItemCustomComponent, Player, system } from "@minecraft/server";
import { playSound } from "../utils/player";
import { Vector3 } from "../utils/math/vector3";
import { Queue } from "../utils/queue";

export class EraserComponent implements ItemCustomComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
        // this.onMineBlock = this.onMineBlock.bind(this);
    }

    public onUse(eventData: ItemComponentUseEvent) {
        const { source, itemStack } = eventData;

        playSound(source, "random.pop");

    }

    public onMineBlock(eventData: ItemComponentMineBlockEvent) {
        const { source, minedBlockPermutation, block } = eventData;

        if (!(source instanceof Player)) return;

        if (minedBlockPermutation.type.id !== "typidoyun:sketch") return;

        const visited = new Set<string>();
        const queue = new Queue<Vector3>();
        const start = Vector3.from(block.location);

        queue.push(start);

        system.runJob(function*() {
            while (queue.size > 0) {
                const current = queue.pop()!;
                const locationStr = current.toString();
                if (visited.has(locationStr)) continue;
                visited.add(locationStr);
    
                const currentBlock = source.dimension.getBlock(current);
    
                if (!currentBlock) continue;
                if (currentBlock.typeId !== "typidoyun:sketch" && current !== start) continue;

                const air = BlockTypes.get("minecraft:air")!;
                currentBlock.setType(air);
                yield;
    
                queue.push(
                    current.clone.add([1, 0, 0]),
                    current.clone.add([0, 1, 0]),
                    current.clone.add([0, 0, 1]),
                    current.clone.add([-1, 0, 0]),
                    current.clone.add([0, -1, 0]),
                    current.clone.add([0, 0, -1]), 
                )
            }
        }());
    }
}