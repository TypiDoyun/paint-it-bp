import { Region } from "../types/region";
import { Vector3 } from "../utils/math/vector";
import { Shape } from "../classes/shape";
import { SphereShapeObject } from "../types/shapes";
import { Vector3Like } from "../utils/math/types/vector";

export class Sphere extends Shape {
    private _radius: number;

    public constructor() {
        super();

        this._radius = 1;
    }

    public get radius(): number {
        return this._radius;
    }

    public set radius(value: number) {
        this._radius = Math.floor(Math.abs(value));
    }

    public get region(): Region {
        return {
            from: new Vector3(-this._radius, -this._radius, -this._radius),
            to: new Vector3(this._radius, this._radius, this._radius),
        }
    }

    public inShape(location: Vector3Like): boolean {
        const fromOrigin = Vector3.from(location);
        const radius = this._radius;

        return fromOrigin.lengthSquared <= radius ** 2;
    }

    public toObject() {
        return JSON.stringify({
            type: "sphere",
            radius: this._radius,
        } satisfies SphereShapeObject);
    }

    public fromObject(shapeJSON: SphereShapeObject) {
        this._radius = shapeJSON.radius;

        return this;
    }
}