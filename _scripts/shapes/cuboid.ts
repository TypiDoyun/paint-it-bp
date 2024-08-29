import { Region } from "../types/root";
import { Vector3, Vector3Like } from "../utils/math/vector";
import { Shape } from "./shape";

export class Cuboid extends Shape {
    private _volumes: Vector3;

    public constructor() {
        super();

        this._volumes = Vector3.zero;
    }

    public get volumes(): Vector3 {
        return this._volumes;
    }

    public set volumes(value: Vector3Like) {
        this._volumes.x = Math.floor(Math.abs(value.x));
        this._volumes.y = Math.floor(Math.abs(value.y));
        this._volumes.z = Math.floor(Math.abs(value.z));
    }

    public get region(): Region {
        return {
            from: new Vector3(-this._volumes.x, -this._volumes.y, -this._volumes.z),
            to: new Vector3(this._volumes.x, this._volumes.y, this._volumes.z)
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