import { Player, system } from "@minecraft/server";
import { ActionFormData, FormCancelationReason, ModalFormData } from "@minecraft/server-ui";
import { SendForm } from "../types/send-form";
import { getPaint, getPainterArmLength, getPainterShape, setPaint, setPainterArmLength, setPainterShape } from "../database/painter";
import { sendShapeSettingForm } from "./shape-setting";
import { singlePaints } from "../paints/single";
import { Paint } from "../classes/paint";
import { mixPaints } from "../paints/mix";

export const sendPainterSettingForm = (player: Player, backFunction?: SendForm) => {
    return new Promise<undefined>((resolve, reject) => {
        system.run(async () => {
            const actionForm = new ActionFormData()
                .title("§l§6《§r 페인터 설정§l§6 》")
                .button(`§l§6《§r 페인트 설정§l§6 》`)
                .button(`§l§6《§r 모양 설정§l§6 》`)
                .button(`§l§6《§r 세부 설정§l§6 》`)
            
            const response = await actionForm.show(player as any);
            
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendPainterSettingForm(player));
            if (response.selection === undefined) return resolve(backFunction?.(player));
            const selection = response.selection;
            if (selection === 0) {
                return resolve(sendPaintSettingForm(player, sendPainterSettingForm));
            }
            else if (selection === 1) {
                const shape = getPainterShape(player);
                const newShape = await sendShapeSettingForm(player, shape, sendPainterSettingForm);

                if (!newShape) return;

                setPainterShape(player, newShape);

                resolve(undefined);
            }
            else if (selection === 2) return resolve(sendDetailedSettingForm(player, sendPainterSettingForm));
        });
    });
}

const sendDetailedSettingForm = (player: Player, backFunction?: SendForm) => {
    return new Promise<undefined>((resolve, reject) => {
        system.run(async () => {
            const currentArmLength = getPainterArmLength(player);
            const modalForm = new ModalFormData()
                .title("§l§6《§r 세부 설정§l§6 》")
                .slider(`§l§6《§r 팔 길이§l§6 》§r`, 4, 24, 1, currentArmLength)
            
            const response = await modalForm.show(player as any);
            
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendDetailedSettingForm(player));
            if (!response.formValues) return resolve(backFunction?.(player));
            
            const armLength = response.formValues[0] as number;

            setPainterArmLength(player, armLength);
        });
    });
}

const sendPaintSettingForm = (player: Player, backFunction?: SendForm) => {
    return new Promise<undefined>((resolve, reject) => {
        system.run(async () => {
            const modalForm = new ActionFormData()
                .title("§l§6《§r 세부 설정§l§6 》")
                .button(`§l§6《§r 단색 페인트§l§6 》§r`)
                .button(`§l§6《§r 혼합 페인트§l§6 》§r`)
                .button(`§l§6《§r 사용자 정의 페인트§l§6 》§r`)
            
            const response = await modalForm.show(player as any);
            
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendPaintSettingForm(player));
            if (response.selection === undefined) return resolve(backFunction?.(player));
            const selection = response.selection;
            
            if (selection === 0) {
                const paint = await sendSelectSinglePaintForm(player, sendPaintSettingForm);

                if (!paint) return resolve(undefined);

                setPaint(player, paint);
            }
            else if (selection === 1) {
                const paint = await sendSelectMixPaintForm(player, sendPaintSettingForm);

                if (!paint) return resolve(undefined);

                setPaint(player, paint);
            }
            else if (selection === 2) {
                const paint = await sendSelectSinglePaintForm(player, sendPaintSettingForm);

                if (!paint) return resolve(undefined);

                setPaint(player, paint);
            }
        });
    });
}

const sendSelectSinglePaintForm = (player: Player, backFunction?: SendForm) => {
    return new Promise<Paint | undefined>((resolve, reject) => {
        system.run(async () => {
            const currentPaint = getPaint(player);
            const modalForm = new ActionFormData()
                .title("§l§6《§r 단색 페인트 선택§l§6 》")

            if (currentPaint) modalForm.body(`현재 페인트: §l§6《§r ${currentPaint.name}§l§6 》§r`);
            
            for (const paint of singlePaints) {
                modalForm.button(`§l§6《§r ${paint.name}§l§6 》§r`);
            }
            
            const response = await modalForm.show(player as any);
            
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendSelectSinglePaintForm(player));
            if (response.selection === undefined) return resolve(backFunction?.(player));
            const selection = response.selection;
            const paint = singlePaints[selection];

            return resolve(paint);
        });
    });
}

const sendSelectMixPaintForm = (player: Player, backFunction?: SendForm) => {
    return new Promise<Paint | undefined>((resolve, reject) => {
        system.run(async () => {
            const currentPaint = getPaint(player);
            const modalForm = new ActionFormData()
                .title("§l§6《§r 혼합 페인트 선택§l§6 》")

            if (currentPaint) modalForm.body(`현재 페인트: §l§6《§r ${currentPaint.name}§l§6 》§r`);
            
            for (const paint of mixPaints) {
                modalForm.button(`§l§6《§r ${paint.name}§l§6 》§r`);
            }
            
            const response = await modalForm.show(player as any);
            
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendSelectSinglePaintForm(player));
            if (response.selection === undefined) return resolve(backFunction?.(player));
            const selection = response.selection;
            const paint = mixPaints[selection];

            return resolve(paint);
        });
    });
}

