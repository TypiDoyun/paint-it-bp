import { Player, system } from "@minecraft/server";
import { ActionFormData, FormCancelationReason, ModalFormData } from "@minecraft/server-ui";
import { SendForm } from "../types/send-form";
import { getSketcherArmLength, getSketcherShape, setSketcherArmLength, setSketcherShape } from "../database/sketcher";
import { sendShapeSettingForm } from "./shape-setting";

export const sendSketcherSettingForm = (player: Player, backFunction?: SendForm) => {
    return new Promise<undefined>((resolve, reject) => {
        system.run(async () => {
            const actionForm = new ActionFormData()
                .title("§l§6《§r 스케쳐 설정§l§6 》")
                .button(`§l§6《§r 모양 설정§l§6 》`)
                .button(`§l§6《§r 세부 설정§l§6 》`)
            
            const response = await actionForm.show(player as any);
            
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendSketcherSettingForm(player));
            if (response.selection === undefined) return resolve(backFunction?.(player));
            const selection = response.selection;

            
            if (selection === 0) {
                const shape = getSketcherShape(player);
                const newShape = await sendShapeSettingForm(player, shape, sendSketcherSettingForm);

                if (!newShape) return;

                setSketcherShape(player, newShape);

                resolve(undefined);
            }
            else if (selection === 1) return resolve(sendDetailedSettingForm(player, sendSketcherSettingForm));
        });
    });
}

const sendDetailedSettingForm = (player: Player, backFunction?: SendForm) => {
    return new Promise<undefined>((resolve, reject) => {
        system.run(async () => {
            const currentArmLength = getSketcherArmLength(player);
            const modalForm = new ModalFormData()
                .title("§l§6《§r 세부 설정§l§6 》")
                .slider(`§l§6《§r 팔 길이§l§6 》§r`, 4, 24, 1, currentArmLength)
            
            const response = await modalForm.show(player as any);
            
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendDetailedSettingForm(player));
            if (!response.formValues) return resolve(backFunction?.(player));
            
            const armLength = response.formValues[0] as number;

            setSketcherArmLength(player, armLength);
        });
    });
}