import { Region } from "../types/region";
import { Vector3, Vector3Like } from "../utils/math/vector";
import { Cuboid } from "./cuboid";
import { Shape } from "./shape";

export class Cube extends Shape {
    private _volume: number;

    public constructor() {
        super();

        this._volume = 0;
    }

    public get volumes(): number {
        return this._volume;
    }

    public set volumes(value: number) {
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
}