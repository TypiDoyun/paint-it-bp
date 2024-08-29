import { Axis } from "../types/axis";
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
    inShape(location) {
        switch (this._axis) {
            case Axis.X:
                return (location.y * location.y + location.z * location.z <=
                    this._radius * this._radius &&
                    location.x <= this._height &&
                    location.x >= -this._height);
            case Axis.Y:
                return (location.x * location.x + location.z * location.z <=
                    this._radius * this._radius &&
                    location.y <= this._height &&
                    location.y >= -this._height);
            case Axis.Z:
                return (location.x * location.x + location.y * location.y <=
                    this._radius * this._radius &&
                    location.z <= this._height &&
                    location.z >= -this._height);
        }
    }
}
