import { ItemComponentUseEvent, ItemCustomComponent } from "@minecraft/server";
import { sendSketcherSettingForm } from "../forms/sketcher-setting";
import { playSound } from "../utils/player";

export class SketcherSettingComponent implements ItemCustomComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }

    public onUse(eventData: ItemComponentUseEvent) {
        const { source, itemStack } = eventData;

        playSound(source, "tile.piston.out");

        sendSketcherSettingForm(source);
    }
}