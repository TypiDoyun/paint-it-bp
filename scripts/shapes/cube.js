import { Vector3 } from "../utils/math/vector";
import { Shape } from "./shape";
export class Cube extends Shape {
    _volume;
    constructor() {
        super();
        this._volume = 0;
    }
    get volumes() {
        return this._volume;
    }
    set volumes(value) {
        this._volume = Math.floor(Math.abs(value));
    }
    get region() {
        return {
            from: new Vector3(-this._volume, -this._volume, -this._volume),
            to: new Vector3(this._volume, this._volume, this._volume)
        };
    }
    inShape(location) {
        return location.x >= -this._volume && location.x <= this._volume &&
            location.y >= -this._volume && location.y <= this._volume &&
            location.z >= -this._volume && location.z <= this._volume;
    }
}
