import { Vector3 } from "../utils/math/vector";
import { Shape } from "./shape";
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
}
