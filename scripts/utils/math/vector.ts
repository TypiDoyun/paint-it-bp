import { VectorLike, Vector4Like, Vector3Like, Vector2Like, VectorArray } from "./types/vector.js";

export const isFourDimensional = (
    vector: VectorLike
): vector is Vector4Like => {
    if ("w" in vector) {
        return isThreeDimensional(vector);
    }
    return false;
};

export const isThreeDimensional = (
    vector: VectorLike
): vector is Vector3Like => {
    if ("z" in vector) {
        return isTwoDimensional(vector);
    }
    return false;
};

export const isTwoDimensional = (vector: VectorLike): vector is Vector2Like => {
    return "x" in vector && "y" in vector;
};

export const iterateVector = (
    vector: VectorLike | VectorArray,
    callback: (value: number, index: number) => any
) => {
    if (Array.isArray(vector)) {
        vector.forEach(callback);
    } else {
        if (isTwoDimensional(vector)) {
            callback(vector.x, 0);
            callback(vector.y, 1);
        }
        if (isThreeDimensional(vector)) {
            callback(vector.z, 2);
        }
        if (isFourDimensional(vector)) {
            callback(vector.w, 3);
        }
    }
};

export * from "./vector2.js";
export * from "./vector3.js";
export * from "./vector4.js";
export * from "./quaternion.js";
