import { system } from "@minecraft/server";
import { getPlayerPaintShape, playerPaints } from "../forms/painter-setting";
import { playSound, sendWarning } from "../utils/player";
import { Vector3 } from "../utils/math/vector3";
export class PainterComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }
    onUse(eventData) {
        const { source, itemStack } = eventData;
        const paint = playerPaints.get(source);
        const shape = getPlayerPaintShape(source);
        if (!paint || !paint.isValid()) {
            if (!paint)
                sendWarning(source, "먼저 커스텀 페인트를 생성해주세요!");
            else
                sendWarning(source, "페인트에 블록 조각이 없습니다.");
            return;
        }
        let viewVector = Vector3.from(source.getViewDirection());
        viewVector.length = 12;
        system.runJob(paint.paintShape(source, shape, {
            dimension: source.dimension,
            x: source.getHeadLocation().x + viewVector.x,
            y: source.getHeadLocation().y + viewVector.y,
            z: source.getHeadLocation().z + viewVector.z,
        }));
        playSound(source, "item.trident.riptide_1", 2.5);
    }
}
