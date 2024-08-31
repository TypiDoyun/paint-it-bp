import { playSound } from "../helpers/player";
import { sendPainterSettingForm } from "../forms/painter-setting";
export class PainterSettingComponent {
    constructor() {
        this.onUse = this.onUse.bind(this);
    }
    onUse(eventData) {
        const { source, itemStack } = eventData;
        playSound(source, "tile.piston.out", 1);
        sendPainterSettingForm(source);
    }
}
