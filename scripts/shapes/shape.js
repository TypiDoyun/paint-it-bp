import { LocationOutOfWorldBoundariesError, } from "@minecraft/server";
import { Vector2, Vector3, } from "../utils/math/vector";
export class Shape {
    get rotatedRegion() {
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
    _rotation = Vector2.zero;
    _rotationLock = {
        x: false,
        y: false,
    };
    get rotation() {
        return this._rotation;
    }
    set rotationDegrees(value) {
        this._rotation.x = (value.x * Math.PI) / 180;
        this._rotation.y = (value.y * Math.PI) / 180;
    }
    set rotation(value) {
        this._rotation.x = value.x;
        this._rotation.y = value.y;
    }
    get rotationLock() {
        return this._rotationLock;
    }
    set rotationLock({ x, y }) {
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
    *getBlocks(originVector, dimension) {
        const { from, to } = this.rotatedRegion;
        const origin = Vector3.from(originVector);
        const calculated = new Set();
        for (let x = from.x; x <= to.x; x += 1) {
            for (let y = from.y; y <= to.y; y += 1) {
                for (let z = from.z; z <= to.z; z += 1) {
                    const vector = new Vector3(x, y, z);
                    if (!this.inShape(vector))
                        continue;
                    if (!this._rotationLock.x)
                        vector.rotateX(this._rotation.x);
                    if (!this._rotationLock.y)
                        vector.rotateY(this._rotation.y);
                    vector.trunc();
                    const locationStr = vector.toString();
                    if (calculated.has(locationStr))
                        continue;
                    calculated.add(locationStr);
                    try {
                        vector.add(origin);
                        const block = dimension.getBlock(vector);
                        if (!block)
                            continue;
                        yield block;
                    }
                    catch (error) {
                        if (!(error instanceof
                            LocationOutOfWorldBoundariesError))
                            throw error;
                        continue;
                    }
                }
            }
        }
    }
}
