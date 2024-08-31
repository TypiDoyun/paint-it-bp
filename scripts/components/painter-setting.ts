import { ItemComponentUseEvent, ItemCustomComponent, system } from "@minecraft/server";
import { playSound } from "../helpers/player";
import { sendPainterSettingForm } from "../forms/painter-setting";

export class PainterSettingComponent implements ItemCustomComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }

    public onUse(eventData: ItemComponentUseEvent) {
        const { source, itemStack } = eventData;

        playSound(source, "tile.piston.out", 1);

        sendPainterSettingForm(source);
    }
}