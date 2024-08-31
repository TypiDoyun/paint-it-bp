import { ItemComponentUseEvent, ItemCustomComponent, system } from "@minecraft/server";
import { getPaint, getPainterArmLength, getPainterShape } from "../database/painter";
import { Vector3 } from "../utils/math/vector3";
import { playSound, sendWarning } from "../helpers/player";

export class PainterComponent implements ItemCustomComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }

    public onUse(eventData: ItemComponentUseEvent) {
        const { source, itemStack } = eventData;

        playSound(source, "item.trident.riptide_1", 2.5);

        const paint = getPaint(source);
        const shape = getPainterShape(source);
        const dimension = source.dimension;
        const viewDirection = Vector3.from(source.getViewDirection());
        viewDirection.length = getPainterArmLength(source);
        const placeLocation = viewDirection.clone.add(source.getHeadLocation());

        if (!paint) return sendWarning(source, "페인트를 설정해주세요");

        system.runJob(paint.paintShape(source, shape, { dimension, ...placeLocation.toObject() }));
    }
}