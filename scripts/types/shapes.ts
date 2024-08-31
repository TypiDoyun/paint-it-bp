import { Cube, Cuboid, Plane, Sphere, Circle, Cylinder } from "../shapes/index";
import { Vector2Like, Vector3Like } from "../utils/math/types/vector";
import { Axis } from "./axis";

export type Shapes = "cube" | "cuboid" | "plane" | "sphere" | "circle" | "cylinder";
export type CubeShapeObject = {
    type: Extract<Shapes, "cube">;
    volume: number;
}

export type CuboidShapeObject = {
    type: Extract<Shapes, "cuboid">;
    volumes: Vector3Like;
}

export type PlaneShapeObject = {
    type: Extract<Shapes, "plane">;
    size: Vector2Like;
    axis: Axis;
}

export type SphereShapeObject = {
    type: Extract<Shapes, "sphere">;
    radius: number;
}

export type CircleShapeObject = {
    type: Extract<Shapes, "circle">;
    radius: number;
    axis: Axis;
}

export type CylinderShapeObject = {
    type: Extract<Shapes, "cylinder">;
    radius: number;
    height: number;
    axis: Axis;
}

export type ShapeObject = CubeShapeObject | CuboidShapeObject | PlaneShapeObject | SphereShapeObject | CircleShapeObject | CylinderShapeObject;
export type ShapeTypeMap = {
    cube: Cube;
    cuboid: Cuboid;
    plane: Plane;
    sphere: Sphere;
    circle: Circle;
    cylinder: Cylinder;
}