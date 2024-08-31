import { Vector2, Vector3, Vector4 } from "../vector";

export type Vector = Vector2 | Vector3 | Vector4;
export type Vector2Element = "x" | "y";
export type Vector3Element = Vector2Element | "z";
export type Vector4Element = Vector3Element | "w";
export type VectorElement = Vector4Element;

export type EmptySymbol = "_";
export type Vector2FactorElement = Vector2Element | EmptySymbol;
export type Vector3FactorElement = Vector3Element | EmptySymbol;
export type Vector4FactorElement = Vector4Element | EmptySymbol;
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
type Join<T extends string[]> = T extends [
    infer A extends string,
    ...infer B extends string[]
]
    ? `${A}${Join<B>}`
    : "";
type Emptyable<T extends string> = T | "";
type StringToUnion<T extends string> = T extends `${infer A}${infer B}` ? A | StringToUnion<B> : never;
type StringLength<
    S extends string,
    T extends any[] = []
> = S extends `${infer _}${infer Rest}`
    ? StringLength<Rest, [any, ...T]>
    : T["length"];
type GetVectorElement<V extends Vector> = V extends Vector2
    ? Vector2Element
    : V extends Vector3
    ? Vector3Element
    : V extends Vector4
    ? Vector4Element
    : never;
export type VectorFactor<
    V extends Vector,
    E extends Vector4FactorElement = GetVectorElement<V> | EmptySymbol,
    F extends string = Join<[E, Emptyable<E>, Emptyable<E>, Emptyable<E>]>
> = F extends F ? StringToUnion<F> extends EmptySymbol ? never : F : never;
type Factor<
    V extends Vector,
    Length extends number,
    F extends VectorFactor<V> = VectorFactor<V>
> = F extends F ? (StringLength<F> extends Length ? F : never) : never;

export type CreatedVector<
    T extends Vector,
    V extends VectorFactor<T>
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
