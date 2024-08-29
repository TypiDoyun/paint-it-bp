import { Region } from "../types/root";
import { Axis } from "../utils/axis";
import { Vector3Like } from "../utils/math/vector";
import { Vector3 } from "../utils/math/vector3";
import { Shape } from "./shape";

export class Cylinder extends Shape {
    private _radius: number;
    private _axis: Axis;
    private _height: number;

    public constructor() {
        super();

        this._radius = 1;
        this._axis = Axis.Y;
        this._height = 0;
    }

    public get radius(): number {
        return this._radius;
    }

    public set radius(value: number) {
        this._radius = Math.floor(Math.abs(value));
    }

    public get axis(): Axis {
        return this._axis;
    }

    public set axis(value: Axis) {
        this._axis = value;
    }

    public get height(): number {
        return this._height;
    }

    public set height(value: number) {
        this._height = Math.floor(Math.abs(value));
    }

    public get region(): Region {
        const x = this._axis === Axis.X ? this._height : this._radius;
        const y = this._axis === Axis.Y ? this._height : this._radius;
        const z = this._axis === Axis.Z ? this._height : this._radius;

        return {
            from: new Vector3(-x, -y, -z),
            to: new Vector3(x, y, z),
        }
    }

    public inShape(location: Vector3Like, origin: Vector3Like = Vector3.zero): boolean {
        const fromOrigin = Vector3.from(location).sub(origin);
        switch (this._axis) {
            case Axis.X:
                return fromOrigin.y ** 2 + fromOrigin.z ** 2 <= this._radius ** 2 && fromOrigin.x <= this._height && fromOrigin.x >= -this._height;
            case Axis.Y:
                return fromOrigin.x ** 2 + fromOrigin.z ** 2 <= this._radius ** 2 && fromOrigin.y <= this._height && fromOrigin.y >= -this._height;
            case Axis.Z:
                return fromOrigin.x ** 2 + fromOrigin.y ** 2 <= this._radius ** 2 && fromOrigin.z <= this._height && fromOrigin.z >= -this._height;
        }
    }
}