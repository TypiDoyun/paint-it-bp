import { Region } from "../types/region";
import { Shape } from "../classes/shape";
import { CuboidShapeObject } from "../types/shapes";
import { Vector3Like } from "../utils/math/types/vector";
import { Vector3 } from "../utils/math/vector3";

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

    public toObject() {
        return JSON.stringify({
            type: "cuboid",
            volumes: {
                x: this._volumes.x,
                y: this._volumes.y,
                z: this._volumes.z
            }
        } satisfies CuboidShapeObject);
    }

    public fromObject(shapeJSON: CuboidShapeObject) {
        this.volumes = shapeJSON.volumes;

        return this;
    }
}