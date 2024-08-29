import { LocationOutOfWorldBoundariesError } from "@minecraft/server";
import { Vector2, Vector3 } from "../utils/math/vector";
export class Shape {
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
     * {@link UnloadedChunkError}
     *
     * {@link LocationOutOfWorldBoundariesError}
     */
    *getBlocks(originVector, dimension, rotation = Vector2.zero, step = 1) {
        const { from, to } = this.region;
        const origin = Vector3.from(originVector);
        const calculated = new Set();
        for (let x = from.x; x <= to.x; x += step) {
            for (let y = from.y; y <= to.y; y += step) {
                for (let z = from.z; z <= to.z; z += step) {
                    const vector = new Vector3(x, y, z);
                    if (!this.inShape(vector))
                        continue;
                    if (rotation.x !== 0)
                        vector.rotateX(rotation.x);
                    if (rotation.y !== 0)
                        vector.rotateY(rotation.y);
                    vector.trunc();
                    const locationStr = vector.toString();
                    if (calculated.has(locationStr))
                        continue;
                    calculated.add(locationStr);
                    try {
                        vector.add(origin);
                        const block = dimension.getBlock(vector);
                        if (!block)
                            throw new Error("Block is not found");
                        yield block;
                    }
                    catch (error) {
                        if (!(error instanceof LocationOutOfWorldBoundariesError))
                            throw error;
                        continue;
                    }
                }
            }
        }
    }
}
