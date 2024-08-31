import { PaintPositionedSnippet, PaintSnippet } from "./paint-snippet";

export type PaintObject = {
    name: string;
    base: PaintSnippet[];
    positioned: PaintPositionedSnippet[];
}