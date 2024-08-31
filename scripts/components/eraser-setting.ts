import { ItemComponentUseEvent, ItemCustomComponent, system } from "@minecraft/server";
import { playSound } from "../helpers/player";
import { sendEraserSettingForm } from "../forms/eraser-setting";

export class EraserSettingComponent implements ItemCustomComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }

    public onUse(eventData: ItemComponentUseEvent) {
        const { source, itemStack } = eventData;

        playSound(source, "tile.piston.out", 1);

        sendEraserSettingForm(source);
    }
}