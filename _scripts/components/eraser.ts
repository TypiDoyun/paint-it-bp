import { BlockPermutation, BlockTypes, ItemComponentMineBlockEvent, ItemComponentUseEvent, ItemCustomComponent, Player, system } from "@minecraft/server";
import { playSound } from "../utils/player";
import { Shape } from "../shapes/shape";
import { getEraserOption, playerErasers } from "../forms/eraser-setting";
import { Vector3 } from "../utils/math/vector";
import { Cuboid } from "../shapes/cuboid";
import { Vector2 } from "../utils/math/vector";
import { Sphere } from "../shapes/sphere";
import { Circle } from "../shapes/circle";
import { Cylinder } from "../shapes/cylinder";
import { Queue } from "../utils/queue";
import { HistoryRecorder } from "../history";

export class EraserComponent implements ItemCustomComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
        // this.onMineBlock = this.onMineBlock.bind(this);
    }

    public onUse(eventData: ItemComponentUseEvent) {
        const { source, itemStack } = eventData;

        playSound(source, "random.pop");

        let shape: Shape = playerErasers.get(source) ?? playerErasers.set(source, new Cuboid()).get(source)!;
        const option = getEraserOption(source);

        const viewVector = Vector3.from(source.getViewDirection());
        const arm = viewVector.clone.mul(option.armLength);
        const rotation = Vector2.from(source.getRotation()).mul(Math.PI / 180);
        rotation.y *= -1;

        const originVector = arm.clone.add(source.getHeadLocation());
        let step = 0.5;

        if (option.perfectShape) {
            if (
                shape instanceof Sphere ||
                shape instanceof Circle ||
                shape instanceof Cylinder
            ) {
                rotation.mul(0);
                step = 1;
            }
        }

        if (!option.xRotation) rotation.x = 0;
        if (!option.yRotation) rotation.y = 0;
        if (!option.xRotation && !option.yRotation) step = 1;

        system.runJob(function*() {
            for (const block of shape.getBlocks(originVector, source.dimension, rotation, step)) {
                if (block.typeId !== "typidoyun:sketch") continue;
                block.setType("air");
                yield;
            }
        }())
    }

    public onMineBlock(eventData: ItemComponentMineBlockEvent) {
        const { source, minedBlockPermutation, block } = eventData;

        if (!(source instanceof Player)) return;

        if (minedBlockPermutation.type.id !== "typidoyun:sketch") return;

        const visited = new Set<string>();
        const queue = new Queue<Vector3>();
        const start = Vector3.from(block.location);

        const recorder = new HistoryRecorder(source);

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
                
                recorder.record({
                    location: current,
                    before: currentBlock.permutation,
                    after: air,
                });
                currentBlock.setType(air);
                yield;
    
                queue.push(
                    // current.clone.add([1, 0, 0]),
                    // current.clone.add([1, 0, 1]),
                    // current.clone.add([0, 0, 1]),
                    // current.clone.add([-1, 0, 1]),
                    // current.clone.add([-1, 0, 0]),
                    // current.clone.add([-1, 0, -1]),
                    // current.clone.add([0, 0, -1]),
                    // current.clone.add([1, 0, -1]),

                    // current.clone.add([0, 1, 0]),
                    // current.clone.add([1, 1, 0]),
                    // current.clone.add([1, 1, 1]),
                    // current.clone.add([0, 1, 1]),
                    // current.clone.add([-1, 1, 1]),
                    // current.clone.add([-1, 1, 0]),
                    // current.clone.add([-1, 1, -1]),
                    // current.clone.add([0, 1, -1]),
                    // current.clone.add([1, 1, -1]),

                    // current.clone.add([0, -1, 0]),
                    // current.clone.add([1, -1, 0]),
                    // current.clone.add([1, -1, 1]),
                    // current.clone.add([0, -1, 1]),
                    // current.clone.add([-1, -1, 1]),
                    // current.clone.add([-1, -1, 0]),
                    // current.clone.add([-1, -1, -1]),
                    // current.clone.add([0, -1, -1]),
                    // current.clone.add([1, -1, -1]),

                    current.clone.add([1, 0, 0]),
                    current.clone.add([0, 1, 0]),
                    current.clone.add([0, 0, 1]),
                    current.clone.add([-1, 0, 0]),
                    current.clone.add([0, -1, 0]),
                    current.clone.add([0, 0, -1]),
                    
                )
            }
            recorder.save();
        }());
    }
}