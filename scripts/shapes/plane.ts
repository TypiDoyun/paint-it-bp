import { Axis } from "../types/axis";
import { Region } from "../types/region";
import { Vector2 } from "../utils/math/vector";
import { Vector3 } from "../utils/math/vector";
import { Shape } from "../classes/shape";
import { PlaneShapeObject } from "../types/shapes";
import { Vector2Like, Vector3Like } from "../utils/math/types/vector";

export class Plane extends Shape {
    private _size: Vector2;
    private _axis: Axis;

    public constructor() {
        super();

        this._size = Vector2.zero;
        this._axis = Axis.Y;
    }

    public get size(): Vector2 {
        return this._size;
    }

    public set size(value: Vector2Like) {
        this._size = Vector2.from(value).abs();
    }

    public get axis(): Axis {
        return this._axis;
    }

    public set axis(value: Axis) {
        this._axis = value;
    }

    public get region(): Region {
        switch (this._axis) {
            case Axis.X:
                return {
                    from: new Vector3(0, -this._size.y, -this._size.x),
                    to: new Vector3(0, this._size.y, this._size.x),
                };
            case Axis.Y:
                return {
                    from: new Vector3(-this._size.x, 0, -this._size.y),
                    to: new Vector3(this._size.x, 0, this._size.y),
                };
            case Axis.Z:
                return {
                    from: new Vector3(-this._size.x, -this._size.y, 0),
                    to: new Vector3(this._size.x, this._size.y, 0),
                };
        }
    }

    public inShape(location: Vector3Like): boolean {
        const { from, to } = this.region;

        return location.x >= from.x && location.x <= to.x &&
               location.y >= from.y && location.y <= to.y &&
               location.z >= from.z && location.z <= to.z;
    }

    public toObject() {
        return JSON.stringify({
            type: "plane",
            size: {
                x: this._size.x,
                y: this._size.y,
            },
            axis: this._axis,
        } satisfies PlaneShapeObject);
    }

    public fromObject(shapeJSON: PlaneShapeObject) {
        this.size = shapeJSON.size;
        this._axis = shapeJSON.axis;

        return this;
    }
}