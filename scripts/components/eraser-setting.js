import { playSound } from "../utils/player";
export class EraserSettingComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }
    onUse(eventData) {
        const { source, itemStack } = eventData;
        playSound(source, "tile.piston.out");
    }
}
