import { Player } from "@minecraft/server";
import { Database } from "../utils/database";
import { createShape, createShapeFromJSON } from "../helpers/factory";
import { ShapeObject } from "../types/shapes";
import { Shape } from "../classes/shape";
import { Vector2 } from "../utils/math/vector";

const createDefaultShape = () => {
    const shape = createShape("plane");
    shape.size = new Vector2(4, 4);

    return shape;
}

export const getSketcherShape = (player: Player) => {
    const shapeJSON = Database.readJSON<ShapeObject>("sketcher-shape", player);

    if (shapeJSON) return createShapeFromJSON(shapeJSON);

    const defaultShape = createDefaultShape();

    Database.write("sketcher-shape", defaultShape.toObject(), player);

    return defaultShape;
}

export const setSketcherShape = (player: Player, shape: Shape) => {
    Database.write("sketcher-shape", shape.toObject(), player);
}

export const getSketcherArmLength = (player: Player) => {
    return +(Database.read("sketcher-arm-length", player) ?? 12);
}

export const setSketcherArmLength = (player: Player, length: number) => {
    Database.write("sketcher-arm-length", length.toString(), player);
}