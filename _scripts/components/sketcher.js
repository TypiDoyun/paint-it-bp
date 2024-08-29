import { playSound } from "../utils/player";
export class SketcherComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }
    onUse(eventData) {
        const { source, itemStack } = eventData;
        playSound(source, "place.big_dripleaf", 0.75, 4);
    }
}
