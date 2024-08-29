import { ItemComponentUseEvent, ItemCustomComponent } from "@minecraft/server";
import { playSound } from "../utils/player";

export class PainterComponent implements ItemCustomComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }

    public onUse(eventData: ItemComponentUseEvent) {
        const { source, itemStack } = eventData;

        playSound(source, "item.trident.riptide_1", 2.5);
    }
}