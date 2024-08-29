export const isFourDimensional = (vector) => {
    if ("w" in vector) {
        return isThreeDimensional(vector);
    }
    return false;
};
export const isThreeDimensional = (vector) => {
    if ("z" in vector) {
        return isTwoDimensional(vector);
    }
    return false;
};
export const isTwoDimensional = (vector) => {
    return "x" in vector && "y" in vector;
};
export const iterateVector = (vector, callback) => {
    if (Array.isArray(vector)) {
        vector.forEach(callback);
    }
    else {
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
