import { ItemComponentUseEvent, ItemCustomComponent } from "@minecraft/server";
import { Vector3 } from "../utils/math/vector3";
import { playSound } from "../utils/player";

export class TeleporterComponent implements ItemCustomComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }

    public onUse(eventData: ItemComponentUseEvent) {
        const { source, itemStack } = eventData;

        playSound(source, "mob.endermen.portal");

        source.runCommand("function teleport");
    }
}