import { system } from "@minecraft/server";
import { playSound } from "../helpers/player";
import { Vector3 } from "../utils/math/vector3";
import { getSketcherArmLength, getSketcherShape } from "../database/sketcher";
export class SketcherComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }
    onUse(eventData) {
        const { source, itemStack } = eventData;
        playSound(source, "place.big_dripleaf", 0.75, 10);
        const shape = getSketcherShape(source);
        const dimension = source.dimension;
        const viewDirection = Vector3.from(source.getViewDirection());
        viewDirection.length = getSketcherArmLength(source);
        const placeLocation = viewDirection.clone.add(source.getHeadLocation());
        shape.rotationDegrees = source.getRotation();
        system.runJob(function* () {
            for (const block of shape.getBlocks(placeLocation, dimension)) {
                yield;
                if (block.typeId !== "minecraft:air")
                    continue;
                block.setType("typidoyun:sketch");
            }
        }());
    }
}
