import { isFourDimensional, isThreeDimensional, iterateVector, Vector2, Vector3, } from "./vector.js";
export class Vector4 {
    values = [0, 0, 0, 0];
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    static from(value) {
        if (typeof value === "number") {
            return new Vector4(value, value, value, value);
        }
        else if (Array.isArray(value)) {
            return new Vector4(value[0], value[1], value[2] ?? 0, value[3] ?? 0);
        }
        else {
            if (isFourDimensional(value)) {
                return new Vector4(value.x, value.y, value.z, value.w);
            }
            else if (isThreeDimensional(value)) {
                return new Vector4(value.x, value.y, value.z, 0);
            }
            else {
                return new Vector4(value.x, value.y, 0, 0);
            }
        }
    }
    static get zero() {
        return new Vector4(0, 0, 0, 0);
    }
    static get one() {
        return new Vector4(1, 1, 1, 1);
    }
    static get up() {
        return new Vector4(0, 1, 0, 0);
    }
    static get down() {
        return new Vector4(0, -1, 0, 0);
    }
    static get left() {
        return new Vector4(-1, 0, 0, 0);
    }
    static get right() {
        return new Vector4(1, 0, 0, 0);
    }
    static get forward() {
        return new Vector4(0, 0, 1, 0);
    }
    static get back() {
        return new Vector4(0, 0, -1, 0);
    }
    get x() {
        return this.values[0];
    }
    set x(value) {
        this.values[0] = value;
    }
    get y() {
        return this.values[1];
    }
    set y(value) {
        this.values[1] = value;
    }
    get z() {
        return this.values[2];
    }
    set z(value) {
        this.values[2] = value;
    }
    get w() {
        return this.values[3];
    }
    set w(value) {
        this.values[3] = value;
    }
    get lengthSquared() {
        return (this.x * this.x +
            this.y * this.y +
            this.z * this.z +
            this.w * this.w);
    }
    get length() {
        return Math.sqrt(this.lengthSquared);
    }
    set length(value) {
        const length = this.length;
        if (length === 0)
            throw new Error("vector has no direction");
        this.x *= value / length;
        this.y *= value / length;
        this.z *= value / length;
        this.w *= value / length;
    }
    get array() {
        return [...this.values];
    }
    get clone() {
        return new Vector4(this.x, this.y, this.z, this.w);
    }
    get normalized() {
        const length = this.length;
        if (length === 0)
            return Vector4.zero;
        return new Vector4(this.x / length, this.y / length, this.z / length, this.w / length);
    }
    get(factor) {
        const results = [];
        for (let i = 0; i < 4; i++) {
            const element = factor[i];
            if (element === undefined)
                break;
            if (element === "_")
                results.push(0);
            else
                results.push(this[element]);
        }
        if (results.length === 1)
            return results[0];
        else if (results.length === 2)
            return new Vector2(results[0], results[1]);
        else if (results.length === 3)
            return new Vector3(results[0], results[1], results[2]);
        else if (results.length === 4)
            return new Vector4(results[0], results[1], results[2], results[3]);
        throw new Error("Invalid element count");
    }
    set(elements, value) {
        if (typeof value === "number") {
            for (let i = 0; i < 4; i++) {
                const element = elements[i];
                if (element === "_")
                    continue;
                this[element] = value;
            }
        }
        else if (Array.isArray(value)) {
            for (let i = 0; i < 4; i++) {
                const element = elements[i];
                if (element === "_")
                    continue;
                this[element] = value[i] ?? 0;
            }
        }
        else {
            if (value === this)
                value = this.clone;
            iterateVector(value, (v, i) => {
                const element = elements[i];
                if (element === undefined)
                    return;
                if (element === "_")
                    return;
                this[element] = v;
            });
        }
    }
    add(value) {
        if (typeof value === "number") {
            this.x += value;
            this.y += value;
            this.z += value;
            this.w += value;
        }
        else if (Array.isArray(value)) {
            this.x += value[0];
            this.y += value[1];
            this.z += value[2] ?? 0;
            this.w += value[3] ?? 0;
        }
        else {
            this.x += value.x;
            this.y += value.y;
            if (isThreeDimensional(value))
                this.z += value.z;
            if (isFourDimensional(value))
                this.w += value.w;
        }
        return this;
    }
    sub(value) {
        if (typeof value === "number") {
            this.x -= value;
            this.y -= value;
            this.z -= value;
            this.w -= value;
        }
        else if (Array.isArray(value)) {
            this.x -= value[0];
            this.y -= value[1];
            this.z -= value[2] ?? 0;
            this.w -= value[3] ?? 0;
        }
        else {
            this.x -= value.x;
            this.y -= value.y;
            if (isThreeDimensional(value))
                this.z -= value.z;
            if (isFourDimensional(value))
                this.w -= value.w;
        }
        return this;
    }
    mul(value) {
        if (typeof value === "number") {
            this.x *= value;
            this.y *= value;
            this.z *= value;
            this.w *= value;
        }
        else if (Array.isArray(value)) {
            this.x *= value[0];
            this.y *= value[1];
            this.z *= value[2] ?? 1;
            this.w *= value[3] ?? 1;
        }
        else {
            this.x *= value.x;
            this.y *= value.y;
            if (isThreeDimensional(value))
                this.z *= value.z;
            if (isFourDimensional(value))
                this.w *= value.w;
        }
        return this;
    }
    div(value) {
        if (typeof value === "number") {
            this.x /= value;
            this.y /= value;
            this.z /= value;
            this.w /= value;
        }
        else if (Array.isArray(value)) {
            this.x /= value[0];
            this.y /= value[1];
            this.z /= value[2] ?? 1;
            this.w /= value[3] ?? 1;
        }
        else {
            this.x /= value.x;
            this.y /= value.y;
            if (isThreeDimensional(value))
                this.z /= value.z;
            if (isFourDimensional(value))
                this.w /= value.w;
        }
        return this;
    }
    dot(value) {
        return this.x * value.x + this.y * value.y + this.z * value.z + this.w * value.w;
    }
    round(digit = 0) {
        const power = 10 ** digit;
        this.x = Math.round(this.x * power) / power;
        this.y = Math.round(this.y * power) / power;
        this.z = Math.round(this.z * power) / power;
        this.w = Math.round(this.w * power) / power;
        return this;
    }
    floor(digit = 0) {
        const power = 10 ** digit;
        this.x = Math.floor(this.x * power) / power;
        this.y = Math.floor(this.y * power) / power;
        this.z = Math.floor(this.z * power) / power;
        this.w = Math.floor(this.w * power) / power;
        return this;
    }
    ceil(digit = 0) {
        const power = 10 ** digit;
        this.x = Math.ceil(this.x * power) / power;
        this.y = Math.ceil(this.y * power) / power;
        this.z = Math.ceil(this.z * power) / power;
        this.w = Math.ceil(this.w * power) / power;
        return this;
    }
    abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        this.w = Math.abs(this.w);
        return this;
    }
    min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        this.w = Math.min(this.w, v.w);
        return this;
    }
    max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        this.w = Math.max(this.w, v.w);
        return this;
    }
    clamp(min, max) {
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        this.z = Math.max(min.z, Math.min(max.z, this.z));
        this.w = Math.max(min.w, Math.min(max.w, this.w));
        return this;
    }
    distanceSquared(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        const dz = this.z - v.z;
        const dw = this.w - v.w;
        return dx * dx + dy * dy + dz * dz + dw * dw;
    }
    distance(v) {
        return Math.sqrt(this.distanceSquared(v));
    }
    normalize() {
        const length = this.length;
        if (length === 0)
            return this;
        this.x /= length;
        this.y /= length;
        this.z /= length;
        this.w /= length;
        return this;
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
        return this;
    }
    lerp(v, t) {
        this.x += (v.x - this.x) * t;
        this.y += (v.y - this.y) * t;
        this.z += (v.z - this.z) * t;
        this.w += (v.w - this.w) * t;
        return this;
    }
    equals(v) {
        return this.x === v.x && this.y === v.y && this.z === v.z && this.w === v.w;
    }
    toString() {
        return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }
}
