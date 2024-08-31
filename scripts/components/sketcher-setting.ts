import { ItemComponentUseEvent, ItemCustomComponent } from "@minecraft/server";
import { playSound } from "../helpers/player";
import { sendSketcherSettingForm } from "../forms/sketcher-setting";

export class SketcherSettingComponent implements ItemCustomComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }

    public onUse(eventData: ItemComponentUseEvent) {
        const { source, itemStack } = eventData;

        playSound(source, "tile.piston.out", 1);

        sendSketcherSettingForm(source);
    }
}