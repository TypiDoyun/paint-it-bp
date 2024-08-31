import { Quaternion } from "./quaternion.js";
import { Vector4Array, VectorLike, VectorArray, CreatedVector, Vector4FactorElement, Vector4Like, VectorFactor } from "./types/vector.js";
import { isFourDimensional, isThreeDimensional, iterateVector } from "./vector.js";
import { Vector2 } from "./vector2.js";
import { Vector3 } from "./vector3.js";

export class Vector4 {
    private readonly values: Vector4Array = [0, 0, 0, 0];

    constructor(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public static from(value: VectorLike | VectorArray | number | Quaternion) {
        if (typeof value === "number") {
            return new Vector4(value, value, value, value);
        } else if (Array.isArray(value)) {
            return new Vector4(
                value[0],
                value[1],
                value[2] ?? 0,
                value[3] ?? 0
            );
        } else {
            if (isFourDimensional(value)) {
                return new Vector4(value.x, value.y, value.z, value.w);
            } else if (isThreeDimensional(value)) {
                return new Vector4(value.x, value.y, value.z, 0);
            } else {
                return new Vector4(value.x, value.y, 0, 0);
            }
        }
    }

    public *[Symbol.iterator]() {
        yield this.values[0];
        yield this.values[1];
        yield this.values[2];
        yield this.values[3];
    }

    public static get zero() {
        return new Vector4(0, 0, 0, 0);
    }

    public static get one() {
        return new Vector4(1, 1, 1, 1);
    }

    public static get up() {
        return new Vector4(0, 1, 0, 0);
    }

    public static get down() {
        return new Vector4(0, -1, 0, 0);
    }

    public static get left() {
        return new Vector4(-1, 0, 0, 0);
    }

    public static get right() {
        return new Vector4(1, 0, 0, 0);
    }

    public static get forward() {
        return new Vector4(0, 0, 1, 0);
    }

    public static get back() {
        return new Vector4(0, 0, -1, 0);
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

    public get w() {
        return this.values[3];
    }

    public set w(value: number) {
        this.values[3] = value;
    }

    public get lengthSquared() {
        return (
            this.x * this.x +
            this.y * this.y +
            this.z * this.z +
            this.w * this.w
        );
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
        this.w *= value / length;
    }

    public get array() {
        return [...this.values];
    }

    public get clone() {
        return new Vector4(this.x, this.y, this.z, this.w);
    }

    public get normalized() {
        const length = this.length;
        if (length === 0) return Vector4.zero;
        return new Vector4(
            this.x / length,
            this.y / length,
            this.z / length,
            this.w / length
        );
    }

    public get<V extends Vector4, F extends VectorFactor<V>>(
        factor: F
    ): CreatedVector<V, F> {
        const results: number[] = [];
        for (let i = 0; i < 4; i++) {
            const element = factor[i] as Vector4FactorElement;
            if (element === undefined) break;
            if (element === "_") results.push(0);
            else results.push(this[element]);
        }

        if (results.length === 1) return results[0] as CreatedVector<V, F>;
        else if (results.length === 2)
            return new Vector2(results[0], results[1]) as CreatedVector<V, F>;
        else if (results.length === 3)
            return new Vector3(
                results[0],
                results[1],
                results[2]
            ) as CreatedVector<V, F>;
        else if (results.length === 4)
            return new Vector4(
                results[0],
                results[1],
                results[2],
                results[3]
            ) as CreatedVector<V, F>;
        throw new Error("Invalid element count");
    }

    public add(value: VectorLike | VectorArray | number) {
        if (typeof value === "number") {
            this.x += value;
            this.y += value;
            this.z += value;
            this.w += value;
        } else if (Array.isArray(value)) {
            this.x += value[0];
            this.y += value[1];
            this.z += value[2] ?? 0;
            this.w += value[3] ?? 0;
        } else {
            this.x += value.x;
            this.y += value.y;
            if (isThreeDimensional(value)) this.z += value.z;
            if (isFourDimensional(value)) this.w += value.w;
        }
        return this;
    }

    public sub(value: VectorLike | VectorArray | number) {
        if (typeof value === "number") {
            this.x -= value;
            this.y -= value;
            this.z -= value;
            this.w -= value;
        } else if (Array.isArray(value)) {
            this.x -= value[0];
            this.y -= value[1];
            this.z -= value[2] ?? 0;
            this.w -= value[3] ?? 0;
        } else {
            this.x -= value.x;
            this.y -= value.y;
            if (isThreeDimensional(value)) this.z -= value.z;
            if (isFourDimensional(value)) this.w -= value.w;
        }
        return this;
    }

    public mul(value: VectorLike | VectorArray | number) {
        if (typeof value === "number") {
            this.x *= value;
            this.y *= value;
            this.z *= value;
            this.w *= value;
        } else if (Array.isArray(value)) {
            this.x *= value[0];
            this.y *= value[1];
            this.z *= value[2] ?? 1;
            this.w *= value[3] ?? 1;
        } else {
            this.x *= value.x;
            this.y *= value.y;
            if (isThreeDimensional(value)) this.z *= value.z;
            if (isFourDimensional(value)) this.w *= value.w;
        }
        return this;
    }

    public div(value: VectorLike | VectorArray | number) {
        if (typeof value === "number") {
            this.x /= value;
            this.y /= value;
            this.z /= value;
            this.w /= value;
        } else if (Array.isArray(value)) {
            this.x /= value[0];
            this.y /= value[1];
            this.z /= value[2] ?? 1;
            this.w /= value[3] ?? 1;
        } else {
            this.x /= value.x;
            this.y /= value.y;
            if (isThreeDimensional(value)) this.z /= value.z;
            if (isFourDimensional(value)) this.w /= value.w;
        }
        return this;
    }

    public dot(value: Vector4Like) {
        return (
            this.x * value.x +
            this.y * value.y +
            this.z * value.z +
            this.w * value.w
        );
    }

    public round(digit: number = 0) {
        const power = 10 ** digit;
        this.x = Math.round(this.x * power) / power;
        this.y = Math.round(this.y * power) / power;
        this.z = Math.round(this.z * power) / power;
        this.w = Math.round(this.w * power) / power;
        return this;
    }

    public floor(digit: number = 0) {
        const power = 10 ** digit;
        this.x = Math.floor(this.x * power) / power;
        this.y = Math.floor(this.y * power) / power;
        this.z = Math.floor(this.z * power) / power;
        this.w = Math.floor(this.w * power) / power;
        return this;
    }

    public ceil(digit: number = 0) {
        const power = 10 ** digit;
        this.x = Math.ceil(this.x * power) / power;
        this.y = Math.ceil(this.y * power) / power;
        this.z = Math.ceil(this.z * power) / power;
        this.w = Math.ceil(this.w * power) / power;
        return this;
    }

    public trunc(digit: number = 0) {
        const power = 10 ** digit;
        this.x = Math.trunc(this.x * power) / power;
        this.y = Math.trunc(this.y * power) / power;
        this.z = Math.trunc(this.z * power) / power;
        this.w = Math.trunc(this.w * power) / power;
        return this;
    }

    public abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        this.w = Math.abs(this.w);
        return this;
    }

    public min(value: VectorLike | VectorArray | number) {
        if (typeof value === "number") {
            this.x = Math.min(this.x, value);
            this.y = Math.min(this.y, value);
            this.z = Math.min(this.z, value);
            this.w = Math.min(this.w, value);
        } else if (Array.isArray(value)) {
            this.x = Math.min(this.x, value[0]);
            this.y = Math.min(this.y, value[1]);
            this.z = Math.min(this.z, value[2] ?? 0);
            this.w = Math.min(this.w, value[3] ?? 0);
        } else {
            this.x = Math.min(this.x, value.x);
            this.y = Math.min(this.y, value.y);
            if (isThreeDimensional(value)) this.z = Math.min(this.z, value.z);
            if (isFourDimensional(value)) this.w = Math.min(this.w, value.w);
        }
        return this;
    }

    public max(value: VectorLike | VectorArray | number) {
        if (typeof value === "number") {
            this.x = Math.max(this.x, value);
            this.y = Math.max(this.y, value);
            this.z = Math.max(this.z, value);
            this.w = Math.max(this.w, value);
        } else if (Array.isArray(value)) {
            this.x = Math.max(this.x, value[0]);
            this.y = Math.max(this.y, value[1]);
            this.z = Math.max(this.z, value[2] ?? 0);
            this.w = Math.max(this.w, value[3] ?? 0);
        } else {
            this.x = Math.max(this.x, value.x);
            this.y = Math.max(this.y, value.y);
            if (isThreeDimensional(value)) this.z = Math.max(this.z, value.z);
            if (isFourDimensional(value)) this.w = Math.max(this.w, value.w);
        }
        return this;
    }

    public clamp(min: VectorLike | VectorArray | number, max: VectorLike | VectorArray | number) {
        this.min(max).max(min);
        return this;
    }

    public distanceSquared(v: Vector4Like) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        const dz = this.z - v.z;
        const dw = this.w - v.w;
        return dx * dx + dy * dy + dz * dz + dw * dw;
    }

    public distance(v: Vector4Like) {
        return Math.sqrt(this.distanceSquared(v));
    }

    public normalize() {
        const length = this.length;
        if (length === 0) return this;
        this.x /= length;
        this.y /= length;
        this.z /= length;
        this.w /= length;
        return this;
    }

    public negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
        return this;
    }

    public lerp(v: Vector4Like, t: number) {
        this.x += (v.x - this.x) * t;
        this.y += (v.y - this.y) * t;
        this.z += (v.z - this.z) * t;
        this.w += (v.w - this.w) * t;
        return this;
    }

    public equals(v: Vector4Like) {
        return (
            this.x === v.x && this.y === v.y && this.z === v.z && this.w === v.w
        );
    }

    public toString() {
        return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }

    public toObject() {
        return { x: this.x, y: this.y, z: this.z, w: this.w };
    }
}
