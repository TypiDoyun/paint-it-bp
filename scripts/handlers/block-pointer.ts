import { system, world } from "@minecraft/server";
import { Vector3 } from "../utils/math/vector";
import { getSketcherArmLength } from "../database/sketcher";
import { spawnBlockParticle } from "../helpers/player";
import { getEraserArmLength } from "../database/eraser";

export const blockPointerHandler = () => {
    
    system.runInterval(() => {
        const players = world.getAllPlayers();
        
        for (const player of players) {
            if (!player.isValid()) continue;
            const itemStack = player.getComponent("inventory")?.container?.getItem(player.selectedSlotIndex);
            
            if (!itemStack) continue;

            let armLength: number;
            const typeId = itemStack.typeId;

            if (typeId === "typidoyun:sketcher") {
                armLength = getSketcherArmLength(player);
            }
            else if (typeId === "typidoyun:painter") {
                armLength = 12;
            }
            else if (typeId === "typidoyun:eraser") {
                armLength = getEraserArmLength(player);
            }
            else continue;

            const viewDirection = Vector3.from(player.getViewDirection());
            viewDirection.length = armLength;
            const location = viewDirection.clone.add(player.getHeadLocation());
            
            spawnBlockParticle(player, location);
        }
    }, 1);
}