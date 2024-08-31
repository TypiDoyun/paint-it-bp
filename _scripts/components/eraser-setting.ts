import { ItemComponentUseEvent, ItemCustomComponent } from "@minecraft/server";
import { playSound } from "../utils/player";
import { Vector3 } from "../utils/math/vector";
import { sendEraserSettingForm } from "../forms/eraser-setting";

export class EraserSettingComponent implements ItemCustomComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }

    public onUse(eventData: ItemComponentUseEvent) {
        const { source, itemStack } = eventData;

        playSound(source, "tile.piston.out");

        sendEraserSettingForm(source);
    }
}