import { CreatedVector, Vector2Array, Vector2FactorElement, Vector2Like, VectorArray, VectorFactor, VectorLike } from "./types/vector";
import { Vector3 } from "./vector3";
import { Vector4 } from "./vector4";

export class Vector2 {
    private readonly values: Vector2Array = [0, 0];

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static from(value: VectorLike | VectorArray | number) {
        if (typeof value === "number") {
            return new Vector2(value, value);
        } else if (Array.isArray(value)) {
            return new Vector2(value[0], value[1]);
        } else {
            return new Vector2(value.x, value.y);
        }
    }

    public *[Symbol.iterator]() {
        yield this.values[0];
        yield this.values[1];
    }

    public static get zero() {
        return new Vector2(0, 0);
    }

    public static get one() {
        return new Vector2(1, 1);
    }

    public static get up() {
        return new Vector2(0, 1);
    }

    public static get down() {
        return new Vector2(0, -1);
    }

    public static get left() {
        return new Vector2(-1, 0);
    }

    public static get right() {
        return new Vector2(1, 0);
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

    public get lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }

    public get length() {
        return Math.sqrt(this.lengthSquared);
    }

    public set length(value: number) {
        const length = this.length;
        if (length === 0) throw new Error("vector has no direction");
        this.x *= value / length;
        this.y *= value / length;
    }

    public get array() {
        return [...this.values];
    }

    public get clone() {
        return new Vector2(this.x, this.y);
    }

    public get normalized() {
        const length = this.length;
        if (length === 0) return Vector2.zero;
        return new Vector2(this.x / length, this.y / length);
    }

    public get angle() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * create new vector from factor
     * @param factor
     * @example
     * const a = new Vector2(10, 20);
     *
     * console.log(a.get("x_yx")); // Vector4(10, 0, 20, 10)
     * console.log(a.get("yyxx")); // Vector4(20, 20, 10, 10)
     * console.log(a.get("x")); // 10
     * console.log(a.get("yx")); // Vector2(20, 10)
     */

    public get<V extends Vector2, F extends VectorFactor<V>>(
        factor: F
    ): CreatedVector<V, F> {
        const results: number[] = [];
        for (let i = 0; i < 4; i++) {
            const element = factor[i] as Vector2FactorElement;
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
            this.x = this.y = value;
        } else if (Array.isArray(value)) {
            this.x = value[0];
            this.y = value[1];
        } else {
            this.x = value.x;
            this.y = value.y;
        }
        return this;
    }

    public sub(value: VectorLike | VectorArray | number) {
        if (typeof value === "number") {
            this.x -= value;
            this.y -= value;
        } else if (Array.isArray(value)) {
            this.x -= value[0];
            this.y -= value[1];
        } else {
            this.x -= value.x;
            this.y -= value.y;
        }
        return this;
    }

    public mul(value: VectorLike | VectorArray | number) {
        if (typeof value === "number") {
            this.x *= value;
            this.y *= value;
        } else if (Array.isArray(value)) {
            this.x *= value[0];
            this.y *= value[1];
        } else {
            this.x *= value.x;
            this.y *= value.y;
        }
        return this;
    }

    public div(value: VectorLike | VectorArray | number) {
        if (typeof value === "number") {
            this.x /= value;
            this.y /= value;
        } else if (Array.isArray(value)) {
            this.x /= value[0];
            this.y /= value[1];
        } else {
            this.x /= value.x;
            this.y /= value.y;
        }
        return this;
    }

    public dot(v: Vector2Like) {
        return this.x * v.x + this.y * v.y;
    }

    public cross(v: Vector2Like) {
        return this.x * v.y - this.y * v.x;
    }

    public rotate(radian: number) {
        const cos = Math.cos(radian);
        const sin = Math.sin(radian);
        const x = this.x;
        const y = this.y;
        this.x = x * cos - y * sin;
        this.y = x * sin + y * cos;
        return this;
    }

    public round(digit: number = 0) {
        const pow = 10 ** digit;
        this.x = Math.round(this.x * pow) / pow;
        this.y = Math.round(this.y * pow) / pow;
        return this;
    }

    public floor(digit: number = 0) {
        const pow = 10 ** digit;
        this.x = Math.floor(this.x * pow) / pow;
        this.y = Math.floor(this.y * pow) / pow;
        return this;
    }

    public ceil(digit: number = 0) {
        const pow = 10 ** digit;
        this.x = Math.ceil(this.x * pow) / pow;
        this.y = Math.ceil(this.y * pow) / pow;
        return this;
    }

    public trunc(digit: number = 0) {
        const pow = 10 ** digit;
        this.x = Math.trunc(this.x * pow) / pow;
        this.y = Math.trunc(this.y * pow) / pow;
        return this;
    }

    public abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }

    public min(v: VectorLike | VectorArray | number) {
        if (typeof v === "number") {
            this.x = Math.min(this.x, v);
            this.y = Math.min(this.y, v);
        } else if (Array.isArray(v)) {
            this.x = Math.min(this.x, v[0]);
            this.y = Math.min(this.y, v[1]);
        } else {
            this.x = Math.min(this.x, v.x);
            this.y = Math.min(this.y, v.y);
        }
        return this;
    }

    public max(v: VectorLike | VectorArray | number) {
        if (typeof v === "number") {
            this.x = Math.max(this.x, v);
            this.y = Math.max(this.y, v);
        } else if (Array.isArray(v)) {
            this.x = Math.max(this.x, v[0]);
            this.y = Math.max(this.y, v[1]);
        } else {
            this.x = Math.max(this.x, v.x);
            this.y = Math.max(this.y, v.y);
        }
        return this;
    }

    public clamp(min: VectorLike | VectorArray | number, max: VectorLike | VectorArray | number) {
        this.max(min).min(max);
        return this;
    }

    public distanceSquared(v: VectorLike) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return dx * dx + dy * dy;
    }

    public distance(v: VectorLike) {
        return Math.sqrt(this.distanceSquared(v));
    }

    public normalize() {
        const length = this.length;
        if (length === 0) return this;
        this.x /= length;
        this.y /= length;
        return this;
    }

    public negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    public lerp(v: VectorLike, t: number) {
        this.x += (v.x - this.x) * t;
        this.y += (v.y - this.y) * t;
        return this;
    }

    public equals(v: VectorLike) {
        return this.x === v.x && this.y === v.y;
    }

    public toString() {
        return `(${this.x}, ${this.y})`;
    }

    public toObject() {
        return { x: this.x, y: this.y };
    }
}