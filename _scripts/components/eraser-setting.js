import { playSound } from "../utils/player";
import { sendEraserSettingForm } from "../forms/eraser-setting";
export class EraserSettingComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }
    onUse(eventData) {
        const { source, itemStack } = eventData;
        playSound(source, "tile.piston.out");
        sendEraserSettingForm(source);
    }
}
