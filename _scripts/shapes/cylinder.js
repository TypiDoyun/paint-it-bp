import { Axis } from "../utils/axis";
import { Vector3 } from "../utils/math/vector3";
import { Shape } from "./shape";
export class Cylinder extends Shape {
    _radius;
    _axis;
    _height;
    constructor() {
        super();
        this._radius = 1;
        this._axis = Axis.Y;
        this._height = 0;
    }
    get radius() {
        return this._radius;
    }
    set radius(value) {
        this._radius = Math.floor(Math.abs(value));
    }
    get axis() {
        return this._axis;
    }
    set axis(value) {
        this._axis = value;
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = Math.floor(Math.abs(value));
    }
    get region() {
        const x = this._axis === Axis.X ? this._height : this._radius;
        const y = this._axis === Axis.Y ? this._height : this._radius;
        const z = this._axis === Axis.Z ? this._height : this._radius;
        return {
            from: new Vector3(-x, -y, -z),
            to: new Vector3(x, y, z),
        };
    }
    inShape(location, origin = Vector3.zero) {
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
