import {
    Dimension,
    LocationOutOfWorldBoundariesError,
    UnloadedChunksError,
} from "@minecraft/server";
import { Region } from "../types/region";
import {
    Vector2,
    Vector2Like,
    Vector3,
    Vector3Array,
    Vector3Like,
} from "../utils/math/vector";

export abstract class Shape {
    public abstract get region(): Region;
    public get rotatedRegion(): Region {
        const { from, to } = this.region;

        if (!this._rotationLock.x) {
            from.rotateX(this._rotation.x);
            to.rotateX(this._rotation.x);
        }
        if (!this._rotationLock.y) {
            from.rotateY(this._rotation.y);
            to.rotateY(this._rotation.y);
        }

        const newRegion = { from: Vector3.zero, to: Vector3.zero };
        newRegion.from.x = Math.min(from.x, to.x);
        newRegion.from.y = Math.min(from.y, to.y);
        newRegion.from.z = Math.min(from.z, to.z);
        newRegion.to.x = Math.max(from.x, to.x);
        newRegion.to.y = Math.max(from.y, to.y);
        newRegion.to.z = Math.max(from.z, to.z);
        // vertices.push(new Vector3(from.x, from.y, from.z));
        // vertices.push(new Vector3(from.x, to.y, from.z));
        // vertices.push(new Vector3(to.x, from.y, from.z));
        // vertices.push(new Vector3(to.x, to.y, from.z));
        // vertices.push(new Vector3(from.x, from.y, to.z));
        // vertices.push(new Vector3(from.x, to.y, to.z));
        // vertices.push(new Vector3(to.x, from.y, to.z));
        // vertices.push(new Vector3(to.x, to.y, to.z));


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
        const { from, to } = this.rotatedRegion;
        const origin = Vector3.from(originVector);
        const calculated = new Set<string>();

        for (let x = from.x; x <= to.x; x += 1) {
            for (let y = from.y; y <= to.y; y += 1) {
                for (let z = from.z; z <= to.z; z += 1) {
                    const vector = new Vector3(x, y, z);

                    if (!this.inShape(vector)) continue;
                    if (!this._rotationLock.x)
                        vector.rotateX(this._rotation.x);
                    if (!this._rotationLock.y)
                        vector.rotateY(this._rotation.y);
                    vector.trunc();

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
}
