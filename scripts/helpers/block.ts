import { Block, Dimension } from "@minecraft/server";
import { Vector3Like } from "../utils/math/types/vector";
import { Vector3 } from "../utils/math/vector3";

export const tryGetBlock = (dimension: Dimension, location: Vector3Like) => {
    try {
        const block = dimension.getBlock(location);
        if (!block) return;
        return block;
    } catch (error) {
        return;
    }
}