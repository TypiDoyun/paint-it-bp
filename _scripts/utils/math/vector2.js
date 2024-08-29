import { Vector3, Vector4, iterateVector, } from "./vector.js";
export class Vector2 {
    values = [0, 0];
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static from(value) {
        if (typeof value === "number") {
            return new Vector2(value, value);
        }
        else if (Array.isArray(value)) {
            return new Vector2(value[0], value[1]);
        }
        else {
            return new Vector2(value.x, value.y);
        }
    }
    static get zero() {
        return new Vector2(0, 0);
    }
    static get one() {
        return new Vector2(1, 1);
    }
    static get up() {
        return new Vector2(0, 1);
    }
    static get down() {
        return new Vector2(0, -1);
    }
    static get left() {
        return new Vector2(-1, 0);
    }
    static get right() {
        return new Vector2(1, 0);
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
    get lengthSquared() {
        return this.x * this.x + this.y * this.y;
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
    }
    get array() {
        return [...this.values];
    }
    get clone() {
        return new Vector2(this.x, this.y);
    }
    get normalized() {
        const length = this.length;
        if (length === 0)
            return Vector2.zero;
        return new Vector2(this.x / length, this.y / length);
    }
    get angle() {
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
            for (let i = 0; i < 2; i++) {
                const element = elements[i];
                if (element === "_")
                    continue;
                this[element] = value;
            }
        }
        else if (Array.isArray(value)) {
            for (let i = 0; i < 2; i++) {
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
                if (element === "_")
                    return;
                this[element] = v;
            });
        }
    }
    add(value) {
        if (typeof value === "number") {
            this.x = this.y = value;
        }
        else if (Array.isArray(value)) {
            this.x = value[0];
            this.y = value[1];
        }
        else {
            this.x = value.x;
            this.y = value.y;
        }
        return this;
    }
    sub(value) {
        if (typeof value === "number") {
            this.x -= value;
            this.y -= value;
        }
        else if (Array.isArray(value)) {
            this.x -= value[0];
            this.y -= value[1];
        }
        else {
            this.x -= value.x;
            this.y -= value.y;
        }
        return this;
    }
    mul(value) {
        if (typeof value === "number") {
            this.x *= value;
            this.y *= value;
        }
        else if (Array.isArray(value)) {
            this.x *= value[0];
            this.y *= value[1];
        }
        else {
            this.x *= value.x;
            this.y *= value.y;
        }
        return this;
    }
    div(value) {
        if (typeof value === "number") {
            this.x /= value;
            this.y /= value;
        }
        else if (Array.isArray(value)) {
            this.x /= value[0];
            this.y /= value[1];
        }
        else {
            this.x /= value.x;
            this.y /= value.y;
        }
        return this;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }
    rotate(radian) {
        const cos = Math.cos(radian);
        const sin = Math.sin(radian);
        const x = this.x;
        const y = this.y;
        this.x = x * cos - y * sin;
        this.y = x * sin + y * cos;
        return this;
    }
    round(digit = 0) {
        const pow = 10 ** digit;
        this.x = Math.round(this.x * pow) / pow;
        this.y = Math.round(this.y * pow) / pow;
        return this;
    }
    floor(digit = 0) {
        const pow = 10 ** digit;
        this.x = Math.floor(this.x * pow) / pow;
        this.y = Math.floor(this.y * pow) / pow;
        return this;
    }
    ceil(digit = 0) {
        const pow = 10 ** digit;
        this.x = Math.ceil(this.x * pow) / pow;
        this.y = Math.ceil(this.y * pow) / pow;
        return this;
    }
    abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }
    min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        return this;
    }
    max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        return this;
    }
    clamp(min, max) {
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        return this;
    }
    distanceSquared(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return dx * dx + dy * dy;
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
        return this;
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    lerp(v, t) {
        this.x += (v.x - this.x) * t;
        this.y += (v.y - this.y) * t;
        return this;
    }
    equals(v) {
        return this.x === v.x && this.y === v.y;
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
