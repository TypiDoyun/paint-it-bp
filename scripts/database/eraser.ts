import { Player } from "@minecraft/server";
import { Database } from "../utils/database";
import { createShape, createShapeFromJSON } from "../helpers/factory";
import { ShapeObject } from "../types/shapes";
import { Shape } from "../classes/shape";

const createDefaultShape = () => {
    const shape = createShape("cube");
    shape.volume = 2;

    return shape;
}

export const getEraserShape = (player: Player) => {
    const shapeJSON = Database.readJSON<ShapeObject>("eraser-shape", player);

    if (shapeJSON) return createShapeFromJSON(shapeJSON);

    const defaultShape = createDefaultShape();

    Database.write("eraser-shape", defaultShape.toObject(), player);

    return defaultShape;
}

export const setEraserShape = (player: Player, shape: Shape) => {
    Database.write("eraser-shape", shape.toObject(), player);
}

export const getEraserArmLength = (player: Player) => {
    return +(Database.read("eraser-arm-length", player) ?? 12);
}

export const setEraserArmLength = (player: Player, length: number) => {
    Database.write("eraser-arm-length", length.toString(), player);
}