import { Vector3 } from "./vector.js";
export class Quaternion {
    _scalar;
    _vector;
    constructor(_scalar, vector) {
        this._scalar = _scalar;
        this._vector = Vector3.from(vector);
    }
    static get zero() {
        return new Quaternion(0, { x: 0, y: 0, z: 0 });
    }
    static get identity() {
        return new Quaternion(1, { x: 0, y: 0, z: 0 });
    }
    get scalar() {
        return this._scalar;
    }
    set scalar(value) {
        this._scalar = value;
    }
    get vector() {
        return this._vector;
    }
    set vector(value) {
        this._vector.set("xyz", value);
    }
    get x() {
        return this._vector.x;
    }
    set x(value) {
        this.scalar = value;
    }
    get y() {
        return this._vector.y;
    }
    set y(value) {
        this._vector.x = value;
    }
    get z() {
        return this._vector.z;
    }
    set z(value) {
        this._vector.y = value;
    }
    get w() {
        return this._scalar;
    }
    set w(value) {
        this._vector.z = value;
    }
    get lengthSquared() {
        return this._scalar ** 2 + this._vector.lengthSquared;
    }
    get length() {
        return Math.sqrt(this.lengthSquared);
    }
    get clone() {
        return new Quaternion(this._scalar, this._vector.clone);
    }
    get conjugate() {
        return new Quaternion(this._scalar, this._vector.clone.negate());
    }
    get normalized() {
        const length = this.length;
        if (length === 0)
            return Quaternion.zero;
        return new Quaternion(this._scalar / length, this._vector.clone.div(length));
    }
    add(quaternion) {
        this._scalar += quaternion._scalar;
        this._vector.add(quaternion.vector);
        return this;
    }
    sub(quaternion) {
        this._scalar -= quaternion._scalar;
        this._vector.sub(quaternion.vector);
        return this;
    }
    mul(quaternion) {
        const scalar = this._scalar * quaternion._scalar -
            this._vector.dot(quaternion.vector);
        const vector = quaternion._vector.clone
            .mul(this._scalar)
            .add(this._vector.clone.mul(quaternion._scalar))
            .add(this._vector.clone.cross(quaternion.vector));
        this._scalar = scalar;
        this._vector.set("xyz", vector);
        return this;
    }
    toString() {
        return `Quaternion { scalar: ${this._scalar}, vector: ${this._vector} }`;
    }
}
