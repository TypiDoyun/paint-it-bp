import { playSound } from "../utils/player";
export class PainterComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }
    onUse(eventData) {
        const { source, itemStack } = eventData;
        playSound(source, "item.trident.riptide_1", 2.5);
    }
}
