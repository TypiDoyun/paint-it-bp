import { Region } from "../types/root";
import { Vector3, Vector3Like } from "../utils/math/vector";
import { Shape } from "./shape";

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

    public inShape(location: Vector3Like, origin: Vector3Like = Vector3.zero): boolean {
        const fromOrigin = Vector3.from(location).sub(origin);
        const radius = this._radius;

        return fromOrigin.lengthSquared <= radius ** 2;
    }
}