import { Vector3 } from "../utils/math/vector";
import { Shape } from "../classes/shape";
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
    toObject() {
        return JSON.stringify({
            type: "cube",
            volume: this._volume
        });
    }
    fromObject(shapeJSON) {
        this._volume = shapeJSON.volume;
        return this;
    }
}
