import { ItemComponentUseEvent, ItemCustomComponent } from "@minecraft/server";
import { playSound } from "../utils/player";


export class SketcherComponent implements ItemCustomComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }

    public onUse(eventData: ItemComponentUseEvent) {
        const { source, itemStack } = eventData;

        playSound(source, "place.big_dripleaf", 0.75, 4)
    }
}