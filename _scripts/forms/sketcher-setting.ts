import { Player, system } from "@minecraft/server";
import { SendForm } from "../types/send-form";
import { ActionFormData, FormCancelationReason, ModalFormData } from "@minecraft/server-ui";
import { Shape } from "../shapes/shape";
import { Cuboid } from "../shapes/cuboid";
import { Vector3 } from "../utils/math/vector";
import { Sphere } from "../shapes/sphere";
import { Circle } from "../shapes/circle";
import { SketcherOption } from "../types/sketcher-option";
import { Cylinder } from "../shapes/cylinder";
import { sendShapeSettingForm } from "./shape-setting";

export const playerSketches = new Map<Player, Shape>();
export const playerSketcherOptions = new Map<Player, SketcherOption>();

export const getSketcherOption = (player: Player) => {
    return playerSketcherOptions.get(player) ?? playerSketcherOptions.set(player, {
        armLength: 12,
        perfectShape: false,
        xRotation: true,
        yRotation: true,
    }).get(player)!;
}

export const sendSketcherSettingForm = (player: Player, backFunction?: SendForm) => {
    return new Promise<Shape | undefined>((resolve, reject) => {
        system.run(async () => {
            const actionForm = new ActionFormData()
                .title("§l§6《§r 스케쳐 설정§l§6 》")
                .button("§l§6《§r 모양 설정§l§6 》")
                .button("§l§6《§r 세부 설정§l§6 》")
            
            const response = await actionForm.show(player as any);
            
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendSketcherSettingForm(player));
            if (response.selection === undefined) return resolve(backFunction?.(player));

            if (response.selection === 0) {
                const oldShape = playerSketches.get(player) ?? playerSketches.set(player, new Cuboid()).get(player)!;
                const shape = await sendShapeSettingForm(player, oldShape, sendSketcherSettingForm);

                if (shape === undefined) return resolve(undefined);

                playerSketches.set(player, shape);
            }
            else if (response.selection === 1) return resolve(sendDetailSettingForm(player, sendSketcherSettingForm));
        });
    });
}

const sendDetailSettingForm = (player: Player, backFunction: SendForm): Promise<Shape | undefined> => {
    return new Promise<Shape | undefined>((resolve, reject) => {
        system.run(async () => {
            const option = getSketcherOption(player);
            const modalForm = new ModalFormData()
                .title("§l§6《§r 스케쳐 세부 설정§l§6 》")
                .slider("§l§6 > §r§f팔 길이", 4, 40, 2, option.armLength)
                .toggle("§l§6 > §r§f완벽한 도형", option.perfectShape)
                .toggle("§l§6 > §r§f시선에 따른 x축 회전", option.xRotation)
                .toggle("§l§6 > §r§f시선에 따른 y축 회전", option.yRotation)
            
            const response = await modalForm.show(player as any);
            
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendDetailSettingForm(player, backFunction));
            if (response.canceled) return resolve(backFunction(player));
            if (response.formValues === undefined) return resolve(undefined);

            const armLength = response.formValues[0] as number;
            const perfectShape = response.formValues[1] as boolean;
            const xRotation = response.formValues[2] as boolean;
            const yRotation = response.formValues[3] as boolean;

            option.armLength = armLength;
            option.perfectShape = perfectShape;
            option.xRotation = xRotation;
            option.yRotation = yRotation

            resolve(backFunction?.(player));
        });
    });
}