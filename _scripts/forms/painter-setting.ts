import { BlockTypes, Player, system } from "@minecraft/server";
import { ActionFormData, FormCancelationReason, ModalFormData } from "@minecraft/server-ui";
import { Paint } from "../paint";
import { Cuboid } from "../shapes/cuboid";
import { Sphere } from "../shapes/sphere";
import { SendForm } from "../types/send-form";
import { Vector3 } from "../utils/math/vector3";
import { Shape } from "../shapes/shape";
import { sendShapeSettingForm } from "./shape-setting";

export const playerPaints = new Map<Player, Paint>();
export const playerPaintShapes = new Map<Player, Shape>();

export const getPlayerPaintShape = (player: Player) => {
    return playerPaintShapes.get(player) ?? playerPaintShapes.set(player, new Cuboid()).get(player)!;
}

const singlePaints: Paint[] = [
    new Paint("Cobblestone")
        .addBases(
            {
                type: "cobblestone",
                percent: 100
            }
        ),
    new Paint("Grass")
        .addBases(
            {
                type: "grass",
                percent: 100
            }
        ),
    new Paint("Stone")
        .addBases(
            {
                type: "stone",
                percent: 100
            }
        ),
    new Paint("Planks")
        .addBases(
            {
                type: "planks",
                percent: 100
            }
        ),
    new Paint("Sand")
        .addBases(
            {
                type: "sand",
                percent: 100
            }
        ),
]

export const sendPainterSettingForm = (player: Player, backFunction?: SendForm) => {
    return new Promise<Shape | undefined>((resolve, reject) => {
        system.run(async () => {
            const actionForm = new ActionFormData()
                .title("§l§6《§r 페인터 설정§l§6 》")
                .button("§l§6《§r 모양 선택§l§6 》")
                .button("§l§6《§r 페인트 선택§l§6 》");
            
            const response = await actionForm.show(player as any);
            
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendPainterSettingForm(player));
            if (response.selection === undefined) return resolve(backFunction?.(player));

            if (response.selection === 0) {
                const defaultShape = getPlayerPaintShape(player);
                const shape = await sendShapeSettingForm(player, defaultShape, sendPainterSettingForm);
                if (!shape) return resolve(undefined);

                playerPaintShapes.set(player, shape);
            }
            else if (response.selection === 1) return resolve(sendSelectPaintForm(player, sendPainterSettingForm));

            resolve(undefined);
        });
    });
}

const sendSelectPaintForm = (player: Player, backFunction?: SendForm): Promise<undefined> => {
    return new Promise<undefined>((resolve, reject) => {
        system.run(async () => {
            const actionForm = new ActionFormData()
                .title("§l§6《§r 페인트 선택§l§6 》")
                .button("§l§6《§r 단색 페인트§l§6 》")
                .button("§l§6《§r 혼합 페인트§l§6 》")
                .button("§l§6《§r 사용자 정의 페인트§l§6 》");
            
            const response = await actionForm.show(player as any);
            
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendSelectPaintForm(player));
            if (response.selection === undefined) return resolve(backFunction?.(player));

            if (response.selection === 0) return resolve(sendSinglePaintForm(player, sendSelectPaintForm));
            else if (response.selection === 1) return resolve(sendMixPaintForm(player, sendSelectPaintForm));
            else if (response.selection === 2) return resolve(sendCustomPaintForm(player, sendSelectPaintForm));

            resolve(undefined);
        });
    });
}

const sendSinglePaintForm = (player: Player, backFunction: SendForm): Promise<undefined> => {
    return new Promise<undefined>((resolve, reject) => {
        system.run(async () => {
            const currentPaint = playerPaints.get(player);
            const actionForm = new ActionFormData()
                .title("§l§6《§r 단색 페인트§l§6 》")
            
            if (currentPaint) actionForm.body(`§l§6 > §r§f현재 페인트: ${currentPaint.name}`);

            singlePaints.forEach(paint => actionForm.button(paint.name));
            
            const response = await actionForm.show(player as any);
            
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendSinglePaintForm(player, backFunction));
            if (response.selection === undefined) return resolve(backFunction(player));

            const paint = singlePaints[response.selection];
            playerPaints.set(player, paint);

            resolve(undefined);
        });
    });
}

const sendMixPaintForm = (player: Player, backFunction: SendForm): Promise<undefined> => {
    return new Promise<undefined>((resolve, reject) => {
        system.run(async () => {
            const actionForm = new ActionFormData()
                .title("§l§6《§r 혼합 페인트 선택§l§6 》")
                .button("§l§6《§r 페인트 선택§l§6 》");
            
            const response = await actionForm.show(player as any);
            
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendMixPaintForm(player, backFunction));
            if (response.selection === undefined) return resolve(backFunction(player));

            if (response.selection === 0) {
                const paint = singlePaints[0];
                playerPaints.set(player, paint);
                return resolve(backFunction(player));
            }

            resolve(undefined);
        });
    });
}

const sendCustomPaintForm = (player: Player, backFunction: SendForm): Promise<undefined> => {
    return new Promise<undefined>((resolve, reject) => {
        system.run(async () => {
            const actionForm = new ActionFormData()
                .title("§l§6《§r 사용자 정의 페인트 선택§l§6 》")
                .button("§l§6《§r 페인트 선택§l§6 》");
            
            const response = await actionForm.show(player as any);
            
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendCustomPaintForm(player, backFunction));
            if (response.selection === undefined) return resolve(backFunction(player));

            if (response.selection === 0) {
                const paint = singlePaints[0];
                playerPaints.set(player, paint);
                return resolve(backFunction(player));
            }

            resolve(undefined);
        });
    });
}

// export const sendEditPaintForm = (player: Player, paint: Paint): Promise<Paint | undefined> => {
//     return new Promise<Paint | undefined>((resolve, reject) => {
//         system.run(async () => {
//             const actionForm = new ActionFormData()
//                 .title("§l§6《§r 페인트 설정§l§6 》")
//                 .button("§l§6《§r 모양 선택§l§6 》")
            
//             if (paint.shape instanceof Cuboid) actionForm.button("§l§6《§r 직육면체 설정§l§6 》");
//             else if (paint.shape instanceof Sphere) actionForm.button("§l§6《§r 구 설정§l§6 》");

//             actionForm
//                 .button("§l§6《§r 블록 조각 설정§l§6 》");
            
//             const response = await actionForm.show(player as any);
            
//             if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendEditPaintForm(player, paint));
//             if (response.canceled) return resolve(paint);
//             if (response.selection === undefined) return resolve(paint);

//             if (response.selection === 0) return resolve(sendCreatePaintForm(player, player => sendEditPaintForm(player, paint)));
//             else if (response.selection === 1) {
//                 if (paint.shape instanceof Cuboid) return resolve(sendCreateCuboidPaintForm(player, player => sendEditPaintForm(player, paint)));
//                 else if (paint.shape instanceof Sphere) return resolve(sendCreateSpherePaintForm(player, player => sendEditPaintForm(player, paint)));
//             }
//             else if (response.selection === 2) return resolve(sendEditPaintSnippetForm(player, paint, player => sendEditPaintForm(player, paint)));

//             resolve(undefined);
//         });
//     });
// }

// const sendEditPaintSnippetForm = (player: Player, paint: Paint, backFunction: SendForm): Promise<Paint | undefined> => {
//     return new Promise<Paint | undefined>((resolve, reject) => {
//         system.run(async () => {
//             let percentSum = 0;
//             paint.base.forEach(paint => percentSum += paint.percent);

//             const actionForm = new ActionFormData()
//                 .title("§l§6《§r 블록 조각 설정§l§6 》")
//                 .body(paint.base.map(snippet => `${typeof snippet.type === "string" ? snippet.type : snippet.type.id}: ${snippet.percent}%%`).join("\n"))
                
//             if (percentSum < 100) actionForm.button("§l§6《§r 추가하기§l§6 》");
//             if (paint.base.length > 0) actionForm.button("§l§6《§r 제거하기§l§6 》");
            
//             const response = await actionForm.show(player as any);
            
//             if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendEditPaintSnippetForm(player, paint, backFunction));
//             if (response.canceled) return resolve(backFunction(player));
//             if (response.selection === undefined) return resolve(paint);

//             const offset = percentSum < 100 ? 0 : 1;

//             if (response.selection === 0 - offset) return resolve(sendAddPaintSnippetForm(player, paint, player => sendEditPaintSnippetForm(player, paint, backFunction)))
//             else if (response.selection === 1 - offset) {
//                 return resolve(sendRemovePaintSnippetForm(player, paint, player => sendEditPaintSnippetForm(player, paint, backFunction)));
//             }

//             resolve(undefined);
//         });
//     });
// }

// const sendAddPaintSnippetForm = (player: Player, paint: Paint, backFunction: SendForm, data: { message?: string, percent?: number, type?: string } = {}): Promise<Paint | undefined> => {
//     return new Promise<Paint | undefined>((resolve, reject) => {
//         system.run(async () => {
//             let percentSum = 0;
//             paint.base.forEach(paint => percentSum += paint.percent);

//             if (percentSum >= 100) return resolve(backFunction(player));

//             const modalForm = new ModalFormData()
//                 .title("§l§6《§r 블록 조각 추가§l§6 》")
//                 .slider(`${data.message ?? ""}\n§l§6 > §r§f생성 확률`, 1, 100 - percentSum, 1, data.percent)
//                 .textField("\n§l§6 > §r§f생성 블록", "블록 식별자", data.type);
            
//             const response = await modalForm.show(player as any);
            
//             if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendAddPaintSnippetForm(player, paint, backFunction));
//             if (response.canceled) return resolve(backFunction(player));
//             if (response.formValues === undefined) return resolve(paint);

//             const percent = response.formValues[0] as number;
//             const typeId = response.formValues[1] as string;
//             const type = BlockTypes.get(typeId);

//             if (!type) return resolve(sendAddPaintSnippetForm(player, paint, backFunction, { message: "\n§l§c > §r§f존재하지 않는 블록입니다.\n", percent, type: typeId }));

//             const index = paint.base.findIndex(snippet => {
//                 const snippetTypeId = (typeof snippet.type === "string" ? snippet.type : snippet.type.id);

//                 return snippetTypeId === typeId || snippetTypeId === type.id;
//             });

//             if (index !== -1) {
//                 paint.base[index].percent += percent;
//             }
//             else {
//                 paint.base.push({
//                     percent,
//                     type
//                 });
//             }

//             resolve(sendEditPaintSnippetForm(player, paint, player => sendEditPaintForm(player, paint)));
//         });
//     });
// }

// const sendRemovePaintSnippetForm = (player: Player, paint: Paint, backFunction: SendForm): Promise<Paint | undefined> => {
//     return new Promise<Paint | undefined>((resolve, reject) => {
//         system.run(async () => {
//             if (paint.base.length <= 0) return resolve(backFunction(player));

//             const modalForm = new ModalFormData()
//                 .title("§l§6《§r 블록 조각 제거§l§6 》")
//                 .dropdown("\n§l§6 > §r§f블록 조각", paint.base.map(snippet => `${typeof snippet.type === "string" ? snippet.type : snippet.type.id}: ${snippet.percent}%%`));
            
//             const response = await modalForm.show(player as any);
            
//             if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy) return resolve(sendAddPaintSnippetForm(player, paint, backFunction));
//             if (response.canceled) return resolve(backFunction(player));
//             if (response.formValues === undefined) return resolve(paint);

//             const index = response.formValues[0] as number;
//             paint.base.splice(index, 1);

//             resolve(sendEditPaintSnippetForm(player, paint, player => sendEditPaintForm(player, paint)));
//         });
//     });
// }