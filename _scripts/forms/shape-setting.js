import { system } from "@minecraft/server";
import { ActionFormData, FormCancelationReason, ModalFormData } from "@minecraft/server-ui";
import { Circle } from "../shapes/circle";
import { Cube } from "../shapes/cube";
import { Cuboid } from "../shapes/cuboid";
import { Cylinder } from "../shapes/cylinder";
import { Plane } from "../shapes/plane";
import { Sphere } from "../shapes/sphere";
import { Vector2 } from "../utils/math/vector2";
import { Vector3 } from "../utils/math/vector3";
export const sendShapeSettingForm = (player, shape, backFunction) => {
    return new Promise((resolve, reject) => {
        system.run(async () => {
            let currentShape = 0;
            switch (shape.constructor) {
                case Cube:
                    currentShape = 1;
                    break;
                case Cuboid:
                    currentShape = 2;
                    break;
                case Plane:
                    currentShape = 3;
                    break;
                case Sphere:
                    currentShape = 4;
                    break;
                case Circle:
                    currentShape = 5;
                    break;
                case Cylinder:
                    currentShape = 6;
                    break;
            }
            const shapeNames = ["", "정육면체", "직육면체", "평면", "구", "원", "원기둥"];
            const actionForm = new ActionFormData()
                .title("§l§6《§r 모양 설정§l§6 》")
                .button(`§l§a《§r 현재 모양 수정 ( ${shapeNames[currentShape]} )§l§a 》`)
                .button(`§l§6《§r ${shapeNames[1]}§l§6 》`)
                .button(`§l§6《§r ${shapeNames[2]}§l§6 》`)
                .button(`§l§6《§r ${shapeNames[3]}§l§6 》`)
                .button(`§l§6《§r ${shapeNames[4]}§l§6 》`)
                .button(`§l§6《§r ${shapeNames[5]}§l§6 》`);
            const response = await actionForm.show(player);
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy)
                return resolve(sendShapeSettingForm(player, shape));
            if (response.selection === undefined)
                return resolve(backFunction?.(player));
            let selection = response.selection;
            if (selection === 0) {
                selection = currentShape;
            }
            if (selection === 1)
                return resolve(sendCubeSettingForm(player, shape, sendShapeSettingForm));
            else if (selection === 2)
                return resolve(sendCuboidSettingForm(player, shape, sendShapeSettingForm));
            else if (selection === 3)
                return resolve(sendPlaneSettingForm(player, shape, sendShapeSettingForm));
            else if (selection === 4)
                return resolve(sendSphereSettingForm(player, shape, sendShapeSettingForm));
            else if (selection === 5)
                return resolve(sendCircleSettingForm(player, shape, sendShapeSettingForm));
            else if (selection === 6)
                return resolve(sendCylinderSettingForm(player, shape, sendShapeSettingForm));
        });
    });
};
const sendCubeSettingForm = (player, shape, backFunction) => {
    return new Promise((resolve, reject) => {
        system.run(async () => {
            const volume = shape instanceof Cube ? shape.volume : 0;
            const modalForm = new ModalFormData()
                .title("§l§6《§r 정육면체 설정§l§6 》")
                .slider("\n§l§6 > §r§f크기", 0, 20, 1, volume);
            const response = await modalForm.show(player);
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy)
                return resolve(sendCubeSettingForm(player, shape, backFunction));
            if (response.canceled)
                return resolve(backFunction?.(player, shape));
            if (response.formValues === undefined)
                return resolve(undefined);
            const createdShape = new Cube();
            createdShape.volume = response.formValues[0];
            resolve(createdShape);
        });
    });
};
const sendCuboidSettingForm = (player, shape, backFunction) => {
    return new Promise((resolve, reject) => {
        system.run(async () => {
            const volumes = shape instanceof Cuboid ? shape.volumes : Vector3.zero;
            const modalForm = new ModalFormData()
                .title("§l§6《§r 직육면체 설정§l§6 》")
                .slider("\n§l§6 > §r§fX축 크기", 0, 20, 1, volumes.x)
                .slider("\n§l§6 > §r§fY축 크기", 0, 20, 1, volumes.y)
                .slider("\n§l§6 > §r§fZ축 크기", 0, 20, 1, volumes.z);
            const response = await modalForm.show(player);
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy)
                return resolve(sendCuboidSettingForm(player, shape, backFunction));
            if (response.canceled)
                return resolve(backFunction?.(player, shape));
            if (response.formValues === undefined)
                return resolve(undefined);
            const createdShape = new Cuboid();
            createdShape.volumes = {
                x: response.formValues[0],
                y: response.formValues[1],
                z: response.formValues[2],
            };
            resolve(createdShape);
        });
    });
};
const sendPlaneSettingForm = (player, shape, backFunction) => {
    return new Promise((resolve, reject) => {
        system.run(async () => {
            const size = shape instanceof Plane ? shape.size : Vector2.zero;
            const axis = shape instanceof Plane ? shape.axis : 2;
            const modalForm = new ModalFormData()
                .title("§l§6《§r 평면 설정§l§6 》")
                .slider("\n§l§6 > §r§fX축 크기", 0, 30, 1, size.x)
                .slider("\n§l§6 > §r§fY축 크기", 0, 30, 1, size.y)
                .dropdown("\n§l§6 > §r§f평면", ["YZ", "XZ", "XY"], axis);
            const response = await modalForm.show(player);
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy)
                return resolve(sendPlaneSettingForm(player, shape, backFunction));
            if (response.canceled)
                return resolve(backFunction?.(player, shape));
            if (response.formValues === undefined)
                return resolve(undefined);
            const createdShape = new Plane();
            createdShape.size = {
                x: response.formValues[0],
                y: response.formValues[1],
            };
            createdShape.axis = response.formValues[2];
            resolve(createdShape);
        });
    });
};
const sendSphereSettingForm = (player, shape, backFunction) => {
    return new Promise((resolve, reject) => {
        system.run(async () => {
            const radius = shape instanceof Sphere ? shape.radius : 1;
            const modalForm = new ModalFormData()
                .title("§l§6《§r 구 설정§l§6 》")
                .slider("\n§l§6 > §r§f반지름", 1, 10, 1, radius);
            const response = await modalForm.show(player);
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy)
                return resolve(sendSphereSettingForm(player, shape, backFunction));
            if (response.canceled)
                return resolve(backFunction?.(player, shape));
            if (response.formValues === undefined)
                return resolve(undefined);
            const createdShape = new Sphere();
            createdShape.radius = response.formValues[0];
            resolve(createdShape);
        });
    });
};
const sendCircleSettingForm = (player, shape, backFunction) => {
    return new Promise((resolve, reject) => {
        system.run(async () => {
            const radius = shape instanceof Circle ? shape.radius : 1;
            const axis = shape instanceof Circle ? shape.axis : 2;
            const modalForm = new ModalFormData()
                .title("§l§6《§r 원 설정§l§6 》")
                .slider("\n§l§6 > §r§f반지름", 1, 20, 1, radius)
                .dropdown("\n§l§6 > §r§f평면", ["YZ", "XZ", "XY"], axis);
            const response = await modalForm.show(player);
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy)
                return resolve(sendCircleSettingForm(player, shape, backFunction));
            if (response.canceled)
                return resolve(backFunction?.(player, shape));
            if (response.formValues === undefined)
                return resolve(undefined);
            const createdShape = new Circle();
            createdShape.radius = response.formValues[0];
            createdShape.axis = response.formValues[1];
            resolve(createdShape);
        });
    });
};
const sendCylinderSettingForm = (player, shape, backFunction) => {
    return new Promise((resolve, reject) => {
        system.run(async () => {
            const radius = shape instanceof Cylinder ? shape.radius : 1;
            const height = shape instanceof Cylinder ? shape.height : 0;
            const axis = shape instanceof Cylinder ? shape.axis : 2;
            const modalForm = new ModalFormData()
                .title("§l§6《§r 원 설정§l§6 》")
                .slider("\n§l§6 > §r§f반지름", 1, 20, 1, radius)
                .slider("\n§l§6 > §r§f높이", 0, 20, 1, height)
                .dropdown("\n§l§6 > §r§f평면", ["YZ", "XZ", "XY"], axis);
            const response = await modalForm.show(player);
            if (response.canceled && response.cancelationReason === FormCancelationReason.UserBusy)
                return resolve(sendCylinderSettingForm(player, shape, backFunction));
            if (response.canceled)
                return resolve(backFunction?.(player, shape));
            if (response.formValues === undefined)
                return resolve(undefined);
            const createdShape = new Cylinder();
            createdShape.radius = response.formValues[0];
            createdShape.height = response.formValues[1];
            createdShape.axis = response.formValues[2];
            resolve(createdShape);
        });
    });
};
