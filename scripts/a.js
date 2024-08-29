import { Vector3 } from "./utils/math/vector";
const sdBox = (p, b) => {
    const q = p.clone.abs().sub(b);
    return (q.clone.max(Vector3.zero).length +
        Math.min(Math.max(q.x, Math.max(q.y, q.z)), 0.0));
};
console.log(sdBox(new Vector3(-2, 0, -1), new Vector3(1, 1, 1)));
