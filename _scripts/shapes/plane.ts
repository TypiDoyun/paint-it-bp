import { Region } from "../types/root";
import { Axis } from "../utils/axis";
import { Vector2, Vector2Like, Vector3Like } from "../utils/math/vector";
import { Vector3 } from "../utils/math/vector";
import { Shape } from "./shape";

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

    public inShape(location: Vector3Like, origin: Vector3Like = Vector3.zero): boolean {
        const fromOrigin = Vector3.from(location).sub(origin);
        const { from, to } = this.region;

        return fromOrigin.x >= from.x && fromOrigin.x <= to.x &&
               fromOrigin.y >= from.y && fromOrigin.y <= to.y &&
               fromOrigin.z >= from.z && fromOrigin.z <= to.z;
    }
}