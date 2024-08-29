import { Axis } from "../types/axis";
import { Region } from "../types/region";
import { Vector3Like } from "../utils/math/vector";
import { Vector3 } from "../utils/math/vector3";
import { Shape } from "./shape";

export class Circle extends Shape {
    private _radius: number;
    private _axis: Axis;

    public constructor() {
        super();

        this._radius = 1;
        this._axis = Axis.Y;
    }

    public get radius(): number {
        return this._radius;
    }

    public set radius(value: number) {
        this._radius = Math.floor(Math.abs(value));
    }

    public get axis(): Axis {
        return this._axis;
    }

    public set axis(value: Axis) {
        this._axis = value;
    }

    public get region(): Region {
        const x = this._axis === Axis.X ? 0 : this._radius;
        const y = this._axis === Axis.Y ? 0 : this._radius;
        const z = this._axis === Axis.Z ? 0 : this._radius;

        return {
            from: new Vector3(-x, -y, -z),
            to: new Vector3(x, y, z),
        }
    }

    public inShape(location: Vector3Like): boolean {
        const fromOrigin = Vector3.from(location);
        const radius = this._radius;

        return fromOrigin.lengthSquared <= radius * radius;
    }
}