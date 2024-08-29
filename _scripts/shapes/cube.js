import { Vector3 } from "../utils/math/vector";
import { Shape } from "./shape";
export class Cube extends Shape {
    _volume;
    constructor() {
        super();
        this._volume = 0;
    }
    get volume() {
        return this._volume;
    }
    set volume(value) {
        this._volume = Math.floor(Math.abs(value));
    }
    get region() {
        const size = this._volume;
        return {
            from: new Vector3(-size, -size, -size),
            to: new Vector3(size, size, size)
        };
    }
    inShape(location, origin = Vector3.zero) {
        const fromOrigin = Vector3.from(location).sub(origin);
        const { from, to } = this.region;
        return fromOrigin.x >= from.x && fromOrigin.x <= to.x &&
            fromOrigin.y >= from.y && fromOrigin.y <= to.y &&
            fromOrigin.z >= from.z && fromOrigin.z <= to.z;
    }
}
