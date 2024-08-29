import { BlockType, BlockTypes, ItemComponentUseEvent, ItemCustomComponent, Player, system } from "@minecraft/server";
import { Cuboid } from "../shapes/cuboid";
import { Shape } from "../shapes/shape";
import { Vector3 } from "../utils/math/vector3";
import { Vector2 } from "../utils/math/vector2";
import { getSketcherOption, playerSketches } from "../forms/sketcher-setting";
import { Sphere } from "../shapes/sphere";
import { Circle } from "../shapes/circle";
import { Cylinder } from "../shapes/cylinder";
import { playSound } from "../utils/player";
import { HistoryRecorder } from "../history";


export class SketcherComponent implements ItemCustomComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }

    public onUse(eventData: ItemComponentUseEvent) {
        const { source, itemStack } = eventData;

        playSound(source, "place.big_dripleaf", 0.75, 4)

        let shape: Shape = playerSketches.get(source) ?? playerSketches.set(source, new Cuboid()).get(source)!;
        const option = getSketcherOption(source);

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

        const recorder = new HistoryRecorder(source);

        system.runJob(function*() {
            for (const block of shape.getBlocks(originVector, source.dimension, rotation, step)) {
                if (!block.isAir) continue;
                if (block.typeId === "typeidoyun:sketch") continue;

                const sketch = BlockTypes.get("typidoyun:sketch")!;
    
                recorder.record({
                    location: block.location,
                    before: block.permutation,
                    after: sketch
                })
                block.setType(sketch);
                yield;
            }
            recorder.save();
        }())
    }
}