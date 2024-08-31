import { Player, system } from "@minecraft/server";
import { ActionFormData, FormCancelationReason, ModalFormData } from "@minecraft/server-ui";
import { SendForm } from "../types/send-form";
import { getEraserArmLength, getEraserShape, setEraserArmLength, setEraserShape } from "../database/eraser";
import { sendShapeSettingForm } from "./shape-setting";

export const sendEraserSettingForm = (player: Player, backFunction?: SendForm) => {
    return new Promise<undefined>((resolve, reject) => {
        system.run(async () => {
            const actionForm = new ActionFormData()
                .title("§l§6《§r 지우개 설정§l§6 》")
                .button(`§l§6《§r 모양 설정§l§6 》`)
                .button(`§l§6《§r 세부 설정§l§6 》`)
            
            const response = await actionForm.show(player as any);
            
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendEraserSettingForm(player));
            if (response.selection === undefined) return resolve(backFunction?.(player));
            const selection = response.selection;
            
            if (selection === 0) {
                const shape = getEraserShape(player);
                const newShape = await sendShapeSettingForm(player, shape, sendEraserSettingForm);

                if (!newShape) return;

                setEraserShape(player, newShape);

                resolve(undefined);
            }
            else if (selection === 1) return resolve(sendDetailedSettingForm(player, sendEraserSettingForm));
        });
    });
}

const sendDetailedSettingForm = (player: Player, backFunction?: SendForm) => {
    return new Promise<undefined>((resolve, reject) => {
        system.run(async () => {
            const currentArmLength = getEraserArmLength(player);
            const modalForm = new ModalFormData()
                .title("§l§6《§r 세부 설정§l§6 》")
                .slider(`§l§6《§r 팔 길이§l§6 》§r`, 4, 24, 1, currentArmLength)
            
            const response = await modalForm.show(player as any);
            
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendDetailedSettingForm(player));
            if (!response.formValues) return resolve(backFunction?.(player));
            
            const armLength = response.formValues[0] as number;

            setEraserArmLength(player, armLength);
        });
    });
}