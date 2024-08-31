import { Shape } from "../classes/shape";
import { Cube, Cuboid, Plane, Sphere, Circle, Cylinder } from "../shapes/index";
import { ShapeObject, Shapes, ShapeTypeMap } from "../types/shapes";

export const createShape = <T extends Shapes>(shapeType: T): ShapeTypeMap[T] => {
    switch (shapeType) {
        case "cube":
            return new Cube() as ShapeTypeMap[T];
        case "cuboid":
            return new Cuboid() as ShapeTypeMap[T];
        case "plane":
            return new Plane() as ShapeTypeMap[T];
        case "sphere":
            return new Sphere() as ShapeTypeMap[T];
        case "circle":
            return new Circle() as ShapeTypeMap[T];
        case "cylinder":
            return new Cylinder() as ShapeTypeMap[T];
        default:
            throw new Error(`Invalid shape type: ${shapeType}`);
    }
}

export const createShapeFromJSON = (shapeJSON: ShapeObject) => {
    const shape = createShape(shapeJSON.type) as Shape;

    return shape.fromObject(shapeJSON);
}