import { Region } from "../types/root";
import { Vector3, Vector3Like } from "../utils/math/vector";
import { Shape } from "./shape";

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
        const size = this._volume;
        return {
            from: new Vector3(-size, -size, -size),
            to: new Vector3(size, size, size)
        }
    }
    
    public inShape(location: Vector3Like, origin: Vector3Like = Vector3.zero): boolean {
        const fromOrigin = Vector3.from(location).sub(origin);
        const { from, to } = this.region;

        return fromOrigin.x >= from.x && fromOrigin.x <= to.x &&
               fromOrigin.y >= from.y && fromOrigin.y <= to.y &&
               fromOrigin.z >= from.z && fromOrigin.z <= to.z;
    }
}