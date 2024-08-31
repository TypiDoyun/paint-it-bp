import { playSound } from "../helpers/player";
import { sendSketcherSettingForm } from "../forms/sketcher-setting";
export class SketcherSettingComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }
    onUse(eventData) {
        const { source, itemStack } = eventData;
        playSound(source, "tile.piston.out", 1);
        sendSketcherSettingForm(source);
    }
}
