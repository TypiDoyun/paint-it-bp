import { Vector3, Vector3Like } from "./vector.js";

export class Quaternion {
    private readonly _vector: Vector3;
    constructor(private _scalar: number, vector: Vector3Like) {
        this._vector = Vector3.from(vector);
    }

    public static get zero() {
        return new Quaternion(0, { x: 0, y: 0, z: 0 });
    }

    public static get identity() {
        return new Quaternion(1, { x: 0, y: 0, z: 0 });
    }

    public get scalar() {
        return this._scalar;
    }

    public set scalar(value: number) {
        this._scalar = value;
    }

    public get vector(): Vector3 {
        return this._vector;
    }

    public set vector(value: Vector3Like) {
        this._vector.set("xyz", value);
    }

    public get x() {
        return this._vector.x;
    }

    public set x(value: number) {
        this.scalar = value;
    }

    public get y() {
        return this._vector.y;
    }

    public set y(value: number) {
        this._vector.x = value;
    }

    public get z() {
        return this._vector.z;
    }

    public set z(value: number) {
        this._vector.y = value;
    }

    public get w() {
        return this._scalar;
    }

    public set w(value: number) {
        this._vector.z = value;
    }

    public get lengthSquared() {
        return this._scalar ** 2 + this._vector.lengthSquared;
    }

    public get length() {
        return Math.sqrt(this.lengthSquared);
    }

    public get clone() {
        return new Quaternion(this._scalar, this._vector.clone);
    }

    public get conjugate() {
        return new Quaternion(this._scalar, this._vector.clone.negate());
    }

    public get normalized() {
        const length = this.length;
        if (length === 0) return Quaternion.zero;
        return new Quaternion(
            this._scalar / length,
            this._vector.clone.div(length),
        );
    }

    public add(quaternion: Quaternion) {
        this._scalar += quaternion._scalar;
        this._vector.add(quaternion.vector);
        return this;
    }

    public sub(quaternion: Quaternion) {
        this._scalar -= quaternion._scalar;
        this._vector.sub(quaternion.vector);
        return this;
    }

    public mul(quaternion: Quaternion) {
        const scalar =
            this._scalar * quaternion._scalar -
            this._vector.dot(quaternion.vector);
        const vector = 
            quaternion._vector.clone
                .mul(this._scalar)
                .add(this._vector.clone.mul(quaternion._scalar))
                .add(this._vector.clone.cross(quaternion.vector));
        this._scalar = scalar;
        this._vector.set("xyz", vector);
        return this;
    }

    public toString() {
        return `Quaternion { scalar: ${this._scalar}, vector: ${this._vector} }`;
    }
}
