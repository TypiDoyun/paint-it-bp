import { Vector2 } from "./vector2.js";
import { Vector3 } from "./vector3.js";
import { Vector4 } from "./vector4.js";

export type Vector = Vector2 | Vector3 | Vector4;

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

export type Vector2Element = "x" | "y";
export type Vector3Element = Vector2Element | "z";
export type Vector4Element = Vector3Element | "w";
export type VectorElement = Vector4Element;

export type EmptySymbol = "_";
export type Vector2FactorElement = "x" | "y" | EmptySymbol;
export type Vector3FactorElement = Vector2FactorElement | "z";
export type Vector4FactorElement = Vector3FactorElement | "w";
export type VectorFactorElement = Vector4FactorElement;

export type Vector2Array = [number, number];
export type Vector3Array = [number, number, number];
export type Vector4Array = [number, number, number, number];
export type VectorArray = Vector2Array | Vector3Array | Vector4Array;

export type Vector2Like = {
    [key in Vector2Element]: number;
};
export type Vector3Like = {
    [key in Vector3Element]: number;
};
export type Vector4Like = {
    [key in Vector4Element]: number;
};
export type VectorLike = Vector2Like | Vector3Like | Vector4Like;

type Permutation<T, K = T> = [T] extends [never]
    ? []
    : K extends K
    ? [K, ...Permutation<Exclude<T, K>>]
    : never;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;
// Converts union to overloaded function
type UnionToOvlds<U> = UnionToIntersection<
    U extends any ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;
type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
    ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
    : [T, ...A];
type UnionLength<T, A extends 0[] = []> = IsUnion<T> extends true
    ? UnionLength<Exclude<T, PopUnion<T>>, [...A, 0]>
    : A["length"];
type Join<T extends string[]> = T extends [
    infer A extends string,
    ...infer B extends string[]
]
    ? `${A}${Join<B>}`
    : "";

type PermutationWithSymbol<
    T,
    V,
    Length extends number,
    C extends 0[] = [],
    K = T
> = C["length"] extends Length
    ? []
    : K extends K
    ? K extends V
        ? [K, ...PermutationWithSymbol<T, V, Length, [...C, 0]>]
        : [K, ...PermutationWithSymbol<Exclude<T, K>, V, Length, [...C, 0]>]
    : never;

type StringLength<
    T extends string,
    Count extends 0[] = []
> = T extends `${string}${infer Rest}`
    ? StringLength<Rest, [...Count, 0]>
    : Count["length"];

type A = StringLength<"abc">;
type Emptyable<Element extends string> = Element | "";
export type VectorGetterRule<Element extends VectorFactorElement> = [
    Element,
    Emptyable<Element>,
    Emptyable<Element>,
    Emptyable<Element>
];
type StringToUnion<T extends string> =
    T extends `${infer A extends string}${infer B extends string}`
        ? A | Filter<B>
        : never;
type Filter<T extends string> = T extends T
    ? StringToUnion<T> extends EmptySymbol
        ? never
        : T
    : never;
export type VectorSetterFactor<V extends Vector> = Filter<
    Join<
        V extends Vector2
            ? PermutationWithSymbol<Vector2FactorElement, EmptySymbol, 2>
            : V extends Vector3
            ? PermutationWithSymbol<Vector3FactorElement, EmptySymbol, 3>
            : V extends Vector4
            ? PermutationWithSymbol<Vector4FactorElement, EmptySymbol, 4>
            : never
    >
>;
export type GetVectorElement<V extends Vector> = V extends Vector2
    ? Vector2FactorElement
    : V extends Vector3
    ? Vector3FactorElement
    : V extends Vector4
    ? Vector4FactorElement
    : never;
export type VectorGetterFactor<V extends Vector> = Filter<
    Join<VectorGetterRule<GetVectorElement<V>>>
>;
type BuildArray<
    Length extends number,
    T,
    Accumulated extends unknown[] = []
> = Accumulated["length"] extends Length
    ? Accumulated
    : BuildArray<Length, T, [...Accumulated, T]>;

export type Factor<V extends Vector, L extends number> = Join<
    BuildArray<L, GetVectorElement<V>>
>;

export type CreatedValue<
    T extends Vector,
    V extends VectorGetterFactor<T>
> = V extends V
    ? V extends Factor<T, 1>
        ? number
        : V extends Factor<T, 2>
        ? Vector2
        : V extends Factor<T, 3>
        ? Vector3
        : V extends Factor<T, 4>
        ? Vector4
        : never
    : never;

export * from "./vector2.js";
export * from "./vector3.js";
export * from "./vector4.js";
