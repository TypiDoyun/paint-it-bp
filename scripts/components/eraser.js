import { Player, system } from "@minecraft/server";
import { Vector3 } from "../utils/math/vector3";
import { getEraserArmLength, getEraserShape } from "../database/eraser";
import { playSound, spawnBlockSideParticle } from "../helpers/player";
import { Queue } from "../utils/queue";
export class EraserComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }
    onUse(eventData) {
        const { source, itemStack } = eventData;
        playSound(source, "random.pop", 1);
        const shape = getEraserShape(source);
        const dimension = source.dimension;
        const viewDirection = Vector3.from(source.getViewDirection());
        viewDirection.length = getEraserArmLength(source);
        const placeLocation = viewDirection.clone.add(source.getHeadLocation());
        shape.rotationDegrees = source.getRotation();
        system.runJob(function* () {
            for (const block of shape.getBlocks(placeLocation, dimension)) {
                yield;
                if (block.typeId === "typidoyun:sketch")
                    continue;
                block.setType("minecraft:air");
                yield;
            }
        }());
    }
    onMineBlock(eventData) {
        const { source, block, minedBlockPermutation } = eventData;
        if (!(source instanceof Player))
            return;
        const dimension = block.dimension;
        const visited = new Set();
        const queue = new Queue();
        const age = 0.5;
        if (minedBlockPermutation.type.id !== "typidoyun:sketch")
            return;
        const neighbors = [
            new Vector3(1, 0, 0),
            new Vector3(-1, 0, 0),
            new Vector3(0, 1, 0),
            new Vector3(0, -1, 0),
            new Vector3(0, 0, 1),
            new Vector3(0, 0, -1),
        ];
        queue.push(block);
        visited.add(Vector3.from(block.location).toString());
        system.runJob(function* () {
            while (queue.size > 0) {
                const currentBlock = queue.pop();
                const currentLocation = currentBlock.location;
                currentBlock.setType("minecraft:air");
                yield;
                for (let i = 0; i < neighbors.length; i++) {
                    const neighbor = neighbors[i];
                    const neighborLocation = neighbor.clone.add(currentBlock.location);
                    const neighborBlock = dimension.getBlock(neighborLocation);
                    const locationStr = neighborLocation.toString();
                    const notVisited = !visited.has(locationStr);
                    if (neighborBlock?.typeId === "typidoyun:sketch" && notVisited) {
                        visited.add(locationStr);
                        queue.push(neighborBlock);
                    }
                    else if (notVisited) {
                        switch (i) {
                            case 0:
                                spawnBlockSideParticle(source, currentLocation, "x", age);
                                break;
                            case 1:
                                spawnBlockSideParticle(source, currentLocation, "-x", age);
                                break;
                            case 2:
                                spawnBlockSideParticle(source, currentLocation, "y", age);
                                break;
                            case 3:
                                spawnBlockSideParticle(source, currentLocation, "-y", age);
                                break;
                            case 4:
                                spawnBlockSideParticle(source, currentLocation, "z", age);
                                break;
                            case 5:
                                spawnBlockSideParticle(source, currentLocation, "-z", age);
                                break;
                        }
                    }
                }
            }
        }());
    }
}
