import {
    isThreeDimensional,
    Vector2,
    Vector3Array,
    VectorArray,
    VectorLike,
    Vector4,
    VectorGetterFactor,
    CreatedValue,
    VectorSetterFactor,
    Vector3FactorElement,
    iterateVector,
    Vector3Like,
} from "./vector.js";
import { Quaternion } from "./quaternion.js";

export class Vector3 {
    private readonly values: Vector3Array = [0, 0, 0];

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public static from(value: VectorLike | VectorArray | number) {
        if (typeof value === "number") {
            return new Vector3(value, value, value);
        } else if (Array.isArray(value)) {
            return new Vector3(value[0], value[1], value[2] ?? 0);
        } else {
            if (isThreeDimensional(value)) {
                return new Vector3(value.x, value.y, value.z);
            } else {
                return new Vector3(value.x, value.y, 0);
            }
        }
    }

    public static get zero() {
        return new Vector3(0, 0, 0);
    }

    public static get one() {
        return new Vector3(1, 1, 1);
    }

    public static get up() {
        return new Vector3(0, 1, 0);
    }

    public static get down() {
        return new Vector3(0, -1, 0);
    }

    public static get left() {
        return new Vector3(-1, 0, 0);
    }

    public static get right() {
        return new Vector3(1, 0, 0);
    }

    public static get forward() {
        return new Vector3(0, 0, 1);
    }

    public static get back() {
        return new Vector3(0, 0, -1);
    }

    public get x() {
        return this.values[0];
    }

    public set x(value: number) {
        this.values[0] = value;
    }

    public get y() {
        return this.values[1];
    }

    public set y(value: number) {
        this.values[1] = value;
    }

    public get z() {
        return this.values[2];
    }

    public set z(value: number) {
        this.values[2] = value;
    }

    public get lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    public get length() {
        return Math.sqrt(this.lengthSquared);
    }

    public set length(value: number) {
        const length = this.length;
        if (length === 0) throw new Error("vector has no direction");
        this.x *= value / length;
        this.y *= value / length;
        this.z *= value / length;
    }

    public get array() {
        return [...this.values];
    }

    public get clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    public get normalized() {
        const length = this.length;
        if (length === 0) return Vector3.zero;
        return new Vector3(this.x / length, this.y / length, this.z / length);
    }

    public get<V extends Vector3, F extends VectorGetterFactor<V>>(
        factor: F
    ): CreatedValue<V, F> {
        const results: number[] = [];
        for (let i = 0; i < 4; i++) {
            const element = factor[i] as Vector3FactorElement;
            if (element === undefined) break;
            if (element === "_") results.push(0);
            else results.push(this[element]);
        }

        if (results.length === 1) return results[0] as CreatedValue<V, F>;
        else if (results.length === 2)
            return new Vector2(results[0], results[1]) as CreatedValue<V, F>;
        else if (results.length === 3)
            return new Vector3(
                results[0],
                results[1],
                results[2]
            ) as CreatedValue<V, F>;
        else if (results.length === 4)
            return new Vector4(
                results[0],
                results[1],
                results[2],
                results[3]
            ) as CreatedValue<V, F>;
        throw new Error("Invalid element count");
    }

    public set(
        elements: VectorSetterFactor<Vector3>,
        value: VectorLike | VectorArray | number
    ) {
        if (typeof value === "number") {
            for (let i = 0; i < 3; i++) {
                const element = elements[i] as Vector3FactorElement;
                if (element === "_") continue;
                this[element] = value;
            }
        } else if (Array.isArray(value)) {
            for (let i = 0; i < 3; i++) {
                const element = elements[i] as Vector3FactorElement;
                if (element === "_") continue;
                this[element] = value[i] ?? 0;
            }
        } else {
            if (value === this) value = this.clone;
            iterateVector(value, (v, i) => {
                const element = elements[i] as Vector3FactorElement;
                if (element === undefined) return;
                if (element === "_") return;
                this[element] = v;
            });
        }
    }

    public add(value: VectorLike | VectorArray | number) {
        if (typeof value === "number") {
            this.x += value;
            this.y += value;
            this.z += value;
        } else if (Array.isArray(value)) {
            this.x += value[0];
            this.y += value[1];
            this.z += value[2] ?? 0;
        } else {
            this.x += value.x;
            this.y += value.y;
            if (isThreeDimensional(value)) this.z += value.z;
        }
        return this;
    }

    public sub(value: VectorLike | VectorArray | number) {
        if (typeof value === "number") {
            this.x -= value;
            this.y -= value;
            this.z -= value;
        } else if (Array.isArray(value)) {
            this.x -= value[0];
            this.y -= value[1];
            this.z -= value[2] ?? 0;
        } else {
            this.x -= value.x;
            this.y -= value.y;
            if (isThreeDimensional(value)) this.z -= value.z;
        }
        return this;
    }

    public mul(value: VectorLike | VectorArray | number) {
        if (typeof value === "number") {
            this.x *= value;
            this.y *= value;
            this.z *= value;
        } else if (Array.isArray(value)) {
            this.x *= value[0];
            this.y *= value[1];
            this.z *= value[2] ?? 1;
        } else {
            this.x *= value.x;
            this.y *= value.y;
            if (isThreeDimensional(value)) this.z *= value.z;
        }
        return this;
    }

    public div(value: VectorLike | VectorArray | number) {
        if (typeof value === "number") {
            this.x /= value;
            this.y /= value;
            this.z /= value;
        } else if (Array.isArray(value)) {
            this.x /= value[0];
            this.y /= value[1];
            this.z /= value[2] ?? 1;
        } else {
            this.x /= value.x;
            this.y /= value.y;
            if (isThreeDimensional(value)) this.z /= value.z;
        }
        return this;
    }

    public dot(v: Vector3Like) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    public cross(v: Vector3Like) {
        const { x, y, z } = this;
        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;
        return this;
    }

    public rotationFromQuaternion(u: Vector3, theta: number) {
        const v = new Quaternion(0, this.clone);
        const q = new Quaternion(
            Math.cos(theta / 2),
            u.clone.mul(Math.sin(theta / 2))
        ).normalized;
        const qConjugate = q.conjugate;

        const rotated = q.mul(v).mul(qConjugate);
        // console.log(rotated.toString());
        return rotated.vector;
    }

    public rotationFromEuler(euler: Vector3) {
        const x = euler.x;
        const y = euler.y;
        const z = euler.z;

        const c1 = Math.cos(x / 2);
        const c2 = Math.cos(y / 2);
        const c3 = Math.cos(z / 2);
        const s1 = Math.sin(x / 2);
        const s2 = Math.sin(y / 2);
        const s3 = Math.sin(z / 2);

        const w = c1 * c2 * c3 - s1 * s2 * s3;
        const x1 = s1 * c2 * c3 + c1 * s2 * s3;
        const y1 = c1 * s2 * c3 - s1 * c2 * s3;
        const z1 = c1 * c2 * s3 + s1 * s2 * c3;

        const q = new Quaternion(w, new Vector3(x1, y1, z1));
        const qConjugate = q.conjugate;
        const v = new Quaternion(0, this);

        return q.mul(v).mul(qConjugate).vector;
    }

    public rotateX(radian: number) {
        const cos = Math.cos(radian);
        const sin = Math.sin(radian);
        const y = this.y * cos - this.z * sin;
        const z = this.y * sin + this.z * cos;
        this.y = y;
        this.z = z;
        return this;
    }

    public rotateY(radian: number) {
        const cos = Math.cos(radian);
        const sin = Math.sin(radian);
        const z = this.z * cos - this.x * sin;
        const x = this.z * sin + this.x * cos;
        this.z = z;
        this.x = x;
        return this;
    }

    public rotateZ(radian: number) {
        const cos = Math.cos(radian);
        const sin = Math.sin(radian);
        const x = this.x * cos - this.y * sin;
        const y = this.x * sin + this.y * cos;
        this.x = x;
        this.y = y;
        return this;
    }

    public round(digit: number = 0) {
        const pow = 10 ** digit;
        this.x = Math.round(this.x * pow) / pow;
        this.y = Math.round(this.y * pow) / pow;
        this.z = Math.round(this.z * pow) / pow;
        return this;
    }

    public floor(digit: number = 0) {
        const pow = 10 ** digit;
        this.x = Math.floor(this.x * pow) / pow;
        this.y = Math.floor(this.y * pow) / pow;
        this.z = Math.floor(this.z * pow) / pow;
        return this;
    }

    public ceil(digit: number = 0) {
        const pow = 10 ** digit;
        this.x = Math.ceil(this.x * pow) / pow;
        this.y = Math.ceil(this.y * pow) / pow;
        this.z = Math.ceil(this.z * pow) / pow;
        return this;
    }

    public trunc(digit: number = 0) {
        const pow = 10 ** digit;
        this.x = Math.trunc(this.x * pow) / pow;
        this.y = Math.trunc(this.y * pow) / pow;
        this.z = Math.trunc(this.z * pow) / pow;
        return this;
    }

    public abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        return this;
    }

    public min(v: Vector3Like) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        return this;
    }

    public max(v: Vector3Like) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        return this;
    }

    public clamp(min: Vector3Like, max: Vector3Like) {
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        this.z = Math.max(min.z, Math.min(max.z, this.z));
        return this;
    }

    public distanceSquared(v: Vector3Like) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        const dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz;
    }

    public distance(v: Vector3Like) {
        return Math.sqrt(this.distanceSquared(v));
    }

    public normalize() {
        const length = this.length;
        if (length === 0) throw this;
        this.x /= length;
        this.y /= length;
        this.z /= length;
        return this;
    }

    public negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }

    public lerp(v: Vector3Like, t: number) {
        this.x += (v.x - this.x) * t;
        this.y += (v.y - this.y) * t;
        this.z += (v.z - this.z) * t;
        return this;
    }

    public slerp(v: Vector3Like, t: number) {
        const vector = new Vector3(v.x, v.y, v.z);
        const dot = this.normalized.dot(vector.normalized);
        const theta = Math.acos(dot) * t;
        const surface = this.clone.cross(v).normalized;
        this.set("xyz", this.rotationFromQuaternion(surface, theta));
        return this;
    }

    public equals(v: Vector3Like) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }

    public toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
}
