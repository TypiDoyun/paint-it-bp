import { playSound } from "../utils/player";
export class TeleporterComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }
    onUse(eventData) {
        const { source, itemStack } = eventData;
        playSound(source, "mob.endermen.portal");
        source.runCommand("function teleport");
    }
}
