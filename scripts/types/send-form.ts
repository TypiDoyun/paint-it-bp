import { Player } from "@minecraft/server";
import { Shape } from "../classes/shape";

export type SendForm = (player: Player) => Promise<any>;
export type SendShapeSettingForm = (player: Player, shape: Shape, backFunction?: SendForm) => Promise<Shape | undefined>;