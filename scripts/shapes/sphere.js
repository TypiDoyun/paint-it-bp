import { Vector3 } from "../utils/math/vector";
import { Shape } from "../classes/shape";
export class Sphere extends Shape {
    _radius;
    constructor() {
        super();
        this._radius = 1;
    }
    get radius() {
        return this._radius;
    }
    set radius(value) {
        this._radius = Math.floor(Math.abs(value));
    }
    get region() {
        return {
            from: new Vector3(-this._radius, -this._radius, -this._radius),
            to: new Vector3(this._radius, this._radius, this._radius),
        };
    }
    inShape(location) {
        const fromOrigin = Vector3.from(location);
        const radius = this._radius;
        return fromOrigin.lengthSquared <= radius ** 2;
    }
    toObject() {
        return JSON.stringify({
            type: "sphere",
            radius: this._radius,
        });
    }
    fromObject(shapeJSON) {
        this._radius = shapeJSON.radius;
        return this;
    }
}
