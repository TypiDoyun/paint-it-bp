import { Shape } from "../classes/shape";
import { Vector3 } from "../utils/math/vector3";
export class Cuboid extends Shape {
    _volumes;
    constructor() {
        super();
        this._volumes = Vector3.zero;
    }
    get volumes() {
        return this._volumes;
    }
    set volumes(value) {
        this._volumes.x = Math.floor(Math.abs(value.x));
        this._volumes.y = Math.floor(Math.abs(value.y));
        this._volumes.z = Math.floor(Math.abs(value.z));
    }
    get region() {
        return {
            from: new Vector3(-this._volumes.x, -this._volumes.y, -this._volumes.z),
            to: new Vector3(this._volumes.x, this._volumes.y, this._volumes.z)
        };
    }
    inShape(location) {
        const { from, to } = this.region;
        return location.x >= from.x && location.x <= to.x &&
            location.y >= from.y && location.y <= to.y &&
            location.z >= from.z && location.z <= to.z;
    }
    toObject() {
        return JSON.stringify({
            type: "cuboid",
            volumes: {
                x: this._volumes.x,
                y: this._volumes.y,
                z: this._volumes.z
            }
        });
    }
    fromObject(shapeJSON) {
        this.volumes = shapeJSON.volumes;
        return this;
    }
}
