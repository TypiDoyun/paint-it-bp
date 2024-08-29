import { isThreeDimensional, Vector2, Vector4, iterateVector, } from "./vector.js";
import { Quaternion } from "./quaternion.js";
export class Vector3 {
    values = [0, 0, 0];
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static from(value) {
        if (typeof value === "number") {
            return new Vector3(value, value, value);
        }
        else if (Array.isArray(value)) {
            return new Vector3(value[0], value[1], value[2] ?? 0);
        }
        else {
            if (isThreeDimensional(value)) {
                return new Vector3(value.x, value.y, value.z);
            }
            else {
                return new Vector3(value.x, value.y, 0);
            }
        }
    }
    static get zero() {
        return new Vector3(0, 0, 0);
    }
    static get one() {
        return new Vector3(1, 1, 1);
    }
    static get up() {
        return new Vector3(0, 1, 0);
    }
    static get down() {
        return new Vector3(0, -1, 0);
    }
    static get left() {
        return new Vector3(-1, 0, 0);
    }
    static get right() {
        return new Vector3(1, 0, 0);
    }
    static get forward() {
        return new Vector3(0, 0, 1);
    }
    static get back() {
        return new Vector3(0, 0, -1);
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
    get lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
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
    }
    get array() {
        return [...this.values];
    }
    get clone() {
        return new Vector3(this.x, this.y, this.z);
    }
    get normalized() {
        const length = this.length;
        if (length === 0)
            return Vector3.zero;
        return new Vector3(this.x / length, this.y / length, this.z / length);
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
            for (let i = 0; i < 3; i++) {
                const element = elements[i];
                if (element === "_")
                    continue;
                this[element] = value;
            }
        }
        else if (Array.isArray(value)) {
            for (let i = 0; i < 3; i++) {
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
        }
        else if (Array.isArray(value)) {
            this.x += value[0];
            this.y += value[1];
            this.z += value[2] ?? 0;
        }
        else {
            this.x += value.x;
            this.y += value.y;
            if (isThreeDimensional(value))
                this.z += value.z;
        }
        return this;
    }
    sub(value) {
        if (typeof value === "number") {
            this.x -= value;
            this.y -= value;
            this.z -= value;
        }
        else if (Array.isArray(value)) {
            this.x -= value[0];
            this.y -= value[1];
            this.z -= value[2] ?? 0;
        }
        else {
            this.x -= value.x;
            this.y -= value.y;
            if (isThreeDimensional(value))
                this.z -= value.z;
        }
        return this;
    }
    mul(value) {
        if (typeof value === "number") {
            this.x *= value;
            this.y *= value;
            this.z *= value;
        }
        else if (Array.isArray(value)) {
            this.x *= value[0];
            this.y *= value[1];
            this.z *= value[2] ?? 1;
        }
        else {
            this.x *= value.x;
            this.y *= value.y;
            if (isThreeDimensional(value))
                this.z *= value.z;
        }
        return this;
    }
    div(value) {
        if (typeof value === "number") {
            this.x /= value;
            this.y /= value;
            this.z /= value;
        }
        else if (Array.isArray(value)) {
            this.x /= value[0];
            this.y /= value[1];
            this.z /= value[2] ?? 1;
        }
        else {
            this.x /= value.x;
            this.y /= value.y;
            if (isThreeDimensional(value))
                this.z /= value.z;
        }
        return this;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    cross(v) {
        const { x, y, z } = this;
        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;
        return this;
    }
    rotationFromQuaternion(u, theta) {
        const v = new Quaternion(0, this.clone);
        const q = new Quaternion(Math.cos(theta / 2), u.clone.mul(Math.sin(theta / 2))).normalized;
        const qConjugate = q.conjugate;
        const rotated = q.mul(v).mul(qConjugate);
        // console.log(rotated.toString());
        return rotated.vector;
    }
    rotationFromEuler(euler) {
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
    rotateX(theta) {
        const y = this.y;
        const z = this.z;
        this.y = y * Math.cos(theta) - z * Math.sin(theta);
        this.z = y * Math.sin(theta) + z * Math.cos(theta);
        return this;
    }
    rotateY(theta) {
        const x = this.x;
        const z = this.z;
        this.x = x * Math.cos(theta) + z * Math.sin(theta);
        this.z = -x * Math.sin(theta) + z * Math.cos(theta);
        return this;
    }
    rotateZ(theta) {
        const x = this.x;
        const y = this.y;
        this.x = x * Math.cos(theta) - y * Math.sin(theta);
        this.y = x * Math.sin(theta) + y * Math.cos(theta);
        return this;
    }
    round(digit = 0) {
        const pow = 10 ** digit;
        this.x = Math.round(this.x * pow) / pow;
        this.y = Math.round(this.y * pow) / pow;
        this.z = Math.round(this.z * pow) / pow;
        return this;
    }
    floor(digit = 0) {
        const pow = 10 ** digit;
        this.x = Math.floor(this.x * pow) / pow;
        this.y = Math.floor(this.y * pow) / pow;
        this.z = Math.floor(this.z * pow) / pow;
        return this;
    }
    ceil(digit = 0) {
        const pow = 10 ** digit;
        this.x = Math.ceil(this.x * pow) / pow;
        this.y = Math.ceil(this.y * pow) / pow;
        this.z = Math.ceil(this.z * pow) / pow;
        return this;
    }
    trunc(digit = 0) {
        const pow = 10 ** digit;
        this.x = Math.trunc(this.x * pow) / pow;
        this.y = Math.trunc(this.y * pow) / pow;
        this.z = Math.trunc(this.z * pow) / pow;
        return this;
    }
    abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        return this;
    }
    min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        return this;
    }
    max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        return this;
    }
    clamp(min, max) {
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        this.z = Math.max(min.z, Math.min(max.z, this.z));
        return this;
    }
    distanceSquared(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        const dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz;
    }
    distance(v) {
        return Math.sqrt(this.distanceSquared(v));
    }
    normalize() {
        const length = this.length;
        if (length === 0)
            throw this;
        this.x /= length;
        this.y /= length;
        this.z /= length;
        return this;
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }
    lerp(v, t) {
        this.x += (v.x - this.x) * t;
        this.y += (v.y - this.y) * t;
        this.z += (v.z - this.z) * t;
        return this;
    }
    slerp(v, t) {
        const vector = new Vector3(v.x, v.y, v.z);
        const dot = this.normalized.dot(vector.normalized);
        const theta = Math.acos(dot) * t;
        const surface = this.clone.cross(v).normalized;
        this.set("xyz", this.rotationFromQuaternion(surface, theta));
        return this;
    }
    equals(v) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }
    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
}
