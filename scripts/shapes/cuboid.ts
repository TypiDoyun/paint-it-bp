import { Region } from "../types/region";
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
    
    public inShape(location: Vector3Like): boolean {
        const { from, to } = this.region;
        return location.x >= from.x && location.x <= to.x &&
               location.y >= from.y && location.y <= to.y &&
               location.z >= from.z && location.z <= to.z;
    }
}