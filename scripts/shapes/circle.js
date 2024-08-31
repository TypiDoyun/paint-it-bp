import { Axis } from "../types/axis";
import { Vector3 } from "../utils/math/vector";
import { Shape } from "../classes/shape";
export class Circle extends Shape {
    _radius;
    _axis;
    constructor() {
        super();
        this._radius = 1;
        this._axis = Axis.Y;
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
    get region() {
        const x = this._axis === Axis.X ? 0 : this._radius;
        const y = this._axis === Axis.Y ? 0 : this._radius;
        const z = this._axis === Axis.Z ? 0 : this._radius;
        return {
            from: new Vector3(-x, -y, -z),
            to: new Vector3(x, y, z),
        };
    }
    inShape(location) {
        const fromOrigin = Vector3.from(location);
        const radius = this._radius;
        return fromOrigin.lengthSquared <= radius * radius && fromOrigin[this._axis === 0 ? "x" : this._axis === 1 ? "y" : "z"] === 0;
    }
    toObject() {
        return JSON.stringify({
            type: "circle",
            radius: this._radius,
            axis: this._axis,
        });
    }
    fromObject(shapeJSON) {
        this._radius = shapeJSON.radius;
        this._axis = shapeJSON.axis;
        return this;
    }
}
