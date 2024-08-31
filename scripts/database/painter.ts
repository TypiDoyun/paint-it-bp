import { Player } from "@minecraft/server";
import { Database } from "../utils/database";
import { createShape, createShapeFromJSON } from "../helpers/factory";
import { ShapeObject } from "../types/shapes";
import { Shape } from "../classes/shape";
import { Paint } from "../classes/paint";
import { PaintObject } from "../types/paint";

const createDefaultShape = () => {
    const shape = createShape("sphere");
    shape.radius = 8;

    return shape;
}

export const getPainterShape = (player: Player) => {
    const shapeJSON = Database.readJSON<ShapeObject>("painter-shape", player);

    if (shapeJSON) return createShapeFromJSON(shapeJSON);

    const defaultShape = createDefaultShape();

    Database.write("painter-shape", defaultShape.toObject(), player);

    return defaultShape;
}

export const setPainterShape = (player: Player, shape: Shape) => {
    Database.write("painter-shape", shape.toObject(), player);
}

export const getPaint = (player: Player) => {
    const paintObject = Database.readJSON<PaintObject>("paint", player);
    if (!paintObject) return;
    return Paint.fromObject(paintObject);
}

export const setPaint = (player: Player, paint: Paint) => {
    Database.write("paint", paint.toObject(), player);
}

export const getPainterArmLength = (player: Player) => {
    return +(Database.read("painter-arm-length", player) ?? 12);
}

export const setPainterArmLength = (player: Player, length: number) => {
    Database.write("painter-arm-length", length.toString(), player);
}