import { Player } from "@minecraft/server";

export type SendForm = (player: Player) => Promise<any>;