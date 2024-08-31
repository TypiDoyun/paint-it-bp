import { Region } from "../types/region";
import { Vector3 } from "../utils/math/vector";
import { Shape } from "../classes/shape";
import { CubeShapeObject } from "../types/shapes";
import { Vector3Like } from "../utils/math/types/vector";

export class Cube extends Shape {
    private _volume: number;

    public constructor() {
        super();

        this._volume = 0;
    }

    public get volume(): number {
        return this._volume;
    }

    public set volume(value: number) {
        this._volume = Math.floor(Math.abs(value));
    }

    public get region(): Region {
        return {
            from: new Vector3(-this._volume, -this._volume, -this._volume),
            to: new Vector3(this._volume, this._volume, this._volume)
        }
    }
    
    public inShape(location: Vector3Like): boolean {
        return location.x >= -this._volume && location.x <= this._volume &&
               location.y >= -this._volume && location.y <= this._volume &&
               location.z >= -this._volume && location.z <= this._volume;
    }

    public toObject() {
        return JSON.stringify({
            type: "cube",
            volume: this._volume
        } satisfies CubeShapeObject);
    }

    public fromObject(shapeJSON: CubeShapeObject) {
        this._volume = shapeJSON.volume;

        return this;
    }
}