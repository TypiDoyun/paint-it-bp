import { Axis } from "../types/axis";
import { Vector2 } from "../utils/math/vector";
import { Vector3 } from "../utils/math/vector3";
import { Shape } from "./shape";
export class Plane extends Shape {
    _size;
    _axis;
    constructor() {
        super();
        this._size = Vector2.zero;
        this._axis = Axis.Y;
    }
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = Vector2.from(value).abs();
    }
    get axis() {
        return this._axis;
    }
    set axis(value) {
        this._axis = value;
    }
    get region() {
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
    inShape(location) {
        const { from, to } = this.region;
        return location.x >= from.x && location.x <= to.x &&
            location.y >= from.y && location.y <= to.y &&
            location.z >= from.z && location.z <= to.z;
    }
}
