import {
    Dimension,
    LocationOutOfWorldBoundariesError,
    UnloadedChunksError,
} from "@minecraft/server";
import { Region } from "../types/region";
import {
    Vector2,
    Vector3,
} from "../utils/math/vector";
import { ShapeObject } from "../types/shapes";
import { Vector2Like, Vector3Like } from "../utils/math/types/vector";
import { Queue } from "../utils/queue";

export abstract class Shape {
    public abstract get region(): Region;
    public get rotatedRegion(): Region {
        const { from, to } = this.region;

        const newRegion = { from: Vector3.zero, to: Vector3.zero };
        const vertices: Vector3[] = [];
        vertices.push(new Vector3(from.x, from.y, from.z));
        vertices.push(new Vector3(from.x, to.y, from.z));
        vertices.push(new Vector3(to.x, from.y, from.z));
        vertices.push(new Vector3(to.x, to.y, from.z));
        vertices.push(new Vector3(from.x, from.y, to.z));
        vertices.push(new Vector3(from.x, to.y, to.z));
        vertices.push(new Vector3(to.x, from.y, to.z));
        vertices.push(new Vector3(to.x, to.y, to.z));

        for (const vertex of vertices) {
            if (!this._rotationLock.x) vertex.rotateX(this._rotation.x);
            if (!this._rotationLock.y) vertex.rotateY(this._rotation.y);
            vertex.x = Math.ceil(Math.abs(vertex.x)) * Math.sign(vertex.x);
            vertex.y = Math.ceil(Math.abs(vertex.y)) * Math.sign(vertex.y);
            vertex.z = Math.ceil(Math.abs(vertex.z)) * Math.sign(vertex.z);
        }

        newRegion.from.x = Math.min(...vertices.map(vertex => vertex.x));
        newRegion.from.y = Math.min(...vertices.map(vertex => vertex.y));
        newRegion.from.z = Math.min(...vertices.map(vertex => vertex.z));
        newRegion.to.x = Math.max(...vertices.map(vertex => vertex.x));
        newRegion.to.y = Math.max(...vertices.map(vertex => vertex.y));
        newRegion.to.z = Math.max(...vertices.map(vertex => vertex.z));


        return newRegion;
    }

    /**
     *
     * @param location
     * The location to check if it belongs within a shape
     * @param origin
     * The location to start
     */
    public abstract inShape(location: Vector3Like): boolean;
    public abstract fromObject(shapeJSON: ShapeObject): this;

    private readonly _rotation: Vector2 = Vector2.zero;
    private readonly _rotationLock: { x: boolean; y: boolean } = {
        x: false,
        y: false,
    };

    public get rotation(): Vector2 {
        return this._rotation;
    }

    public set rotationDegrees(value: Vector2Like) {
        this._rotation.x = (value.x * Math.PI) / 180;
        this._rotation.y = (value.y * Math.PI) / 180;
    }

    public set rotation(value: Vector2Like) {
        this._rotation.x = value.x;
        this._rotation.y = value.y;
    }

    public get rotationLock(): { x: boolean; y: boolean } {
        return this._rotationLock;
    }

    public set rotationLock({ x, y }: { x: boolean; y: boolean }) {
        this._rotationLock.x = x;
        this._rotationLock.y = y;
    }

    /**
     *
     * @param origin
     * The location to start
     * @throws
     * PositionInUnloadedChunkError: Exception thrown when trying
     * to interact with a Block object that isn't in a loaded and
     * ticking chunk anymore
     *
     * PositionOutOfWorldBoundariesError: Exception thrown when
     * trying to interact with a position outside of dimension
     * height range
     *
     * {@link UnloadedChunksError}
     *
     * {@link LocationOutOfWorldBoundariesError}
     */
    public *getBlocks(originVector: Vector3Like, dimension: Dimension) {
        // const { from, to } = this.rotatedRegion;
        // const origin = Vector3.from(originVector);
        // const calculated = new Set<string>();
        // const queue = new Queue<Vector3>();
        // const start = Vector3.zero;
        // queue.push(start);

        // while (queue.size > 0) {
        //     const vector = queue.pop()!;
            
        //     if (vector.x < from.x || vector.x > to.x) continue;
        //     if (vector.y < from.y || vector.y > to.y) continue;
        //     if (vector.z < from.z || vector.z > to.z) continue;

        //     const locationStr = vector.toString();
        //     if (calculated.has(locationStr)) continue;
        //     calculated.add(locationStr);

        //     const rotatedVector = vector.clone;
        //     if (!this._rotationLock.y)
        //         rotatedVector.rotateY(-this._rotation.y);
        //     if (!this._rotationLock.x)
        //         rotatedVector.rotateX(-this._rotation.x);
        //     rotatedVector.trunc();

        //     if (!this.inShape(rotatedVector)) continue;
        //     try {
        //         const block = dimension.getBlock(vector.clone.add(origin));

        //         if (block) {
        //             yield block;
        //         }

        //     } catch (error) {}
        //     queue.push(
        //         vector.clone.add([1, 0, 0]),
        //         vector.clone.add([0, 1, 0]),
        //         vector.clone.add([0, 0, 1]),
        //         vector.clone.add([-1, 0, 0]),
        //         vector.clone.add([0, -1, 0]),
        //         vector.clone.add([0, 0, -1])
        //     );
        // }

        const { from, to } = this.rotatedRegion;
        const origin = Vector3.from(originVector);
        const calculated = new Set<string>();
        for (let x = from.x; x <= to.x; x += 1) {
            for (let y = from.y; y <= to.y; y += 1) {
                for (let z = from.z; z <= to.z; z += 1) {
                    const vector = new Vector3(x, y, z);
                    const rotatedVector = vector.clone;

                    if (!this._rotationLock.y)
                        rotatedVector.rotateY(-this._rotation.y);
                    if (!this._rotationLock.x)
                        rotatedVector.rotateX(-this._rotation.x);
                    rotatedVector.trunc();

                    if (!this.inShape(rotatedVector)) continue;

                    const locationStr = vector.toString();
                    if (calculated.has(locationStr)) continue;
                    calculated.add(locationStr);

                    try {
                        vector.add(origin);
                        const block = dimension.getBlock(vector);

                        if (!block) continue;

                        yield block;
                    } catch (error) {
                        if (
                            !(
                                error instanceof
                                LocationOutOfWorldBoundariesError
                            )
                        )
                            throw error;
                        continue;
                    }
                }
            }
        }
    }

    public abstract toObject(): string;
}
