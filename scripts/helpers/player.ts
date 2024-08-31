import { MolangVariableMap, Player, system } from "@minecraft/server";
import { Vector3Like } from "../utils/math/types/vector";
import { Vector3 } from "../utils/math/vector3";

const beforeMessages = new Map<Player, string>();

export const sendMessage = (player: Player, message: string | number | boolean | object, color: string = "a") => {
    const text = `§l§${color} > §r§f${message}`;

    if (beforeMessages.get(player) === text) return;

    player.sendMessage(text);
    beforeMessages.set(player, text);
}

export const sendWarning = (player: Player, message: string) => {
    sendMessage(player, message, "c");


    
    playSound(player, "random.orb");
}

export const playSound = (player: Player, sound: string, pitch: number = 1, volume: number = 1) => {
    system.run(() => {
        player.playSound(sound, {
            location: new Vector3(0, -1, 0).add(player.location),
            volume: 0.05 * volume,
            pitch
        });
    })
}
const blockPadding = 0.01;
export const spawnBlockParticle = (player: Player, location: Vector3Like, age: number = 0.1) => {
    const vector = Vector3.from(location).floor();
    const molang = new MolangVariableMap();
    molang.setFloat("variable.age", age);
    system.run(() => {
        player.spawnParticle("typidoyun:block_x", vector.clone.add([ -blockPadding, 0, 0 ]), molang);
        player.spawnParticle("typidoyun:block_y", vector.clone.add([ 0, -blockPadding, 0 ]), molang);
        player.spawnParticle("typidoyun:block_z", vector.clone.add([ 0, 0, -blockPadding ]), molang);
        player.spawnParticle("typidoyun:block_x", vector.clone.add([ 1 + blockPadding, 0, 0 ]), molang);
        player.spawnParticle("typidoyun:block_y", vector.clone.add([ 0, 1 + blockPadding, 0 ]), molang);
        player.spawnParticle("typidoyun:block_z", vector.clone.add([ 0, 0, 1 + blockPadding ]), molang);
    })
}
export const spawnBlockSideParticle = (player: Player, location: Vector3Like, side: "x" | "y" | "z" | "-x" | "-y" | "-z", age: number = 0.1) => {
    const vector = Vector3.from(location).floor();

    const molang = new MolangVariableMap();
    molang.setFloat("variable.age", age);

    system.run(() => {
        switch (side) {
            case "x":
                player.spawnParticle("typidoyun:block_x", vector.clone.add([ 1 + blockPadding, 0, 0 ]), molang);
                break;
            case "y":
                player.spawnParticle("typidoyun:block_y", vector.clone.add([ 0, 1 + blockPadding, 0 ]), molang);
                break;
            case "z":
                player.spawnParticle("typidoyun:block_z", vector.clone.add([ 0, 0, 1 + blockPadding ]), molang);
                break;
            case "-x":
                player.spawnParticle("typidoyun:block_x", vector.clone.add([ -blockPadding, 0, 0 ]), molang);
                break;
            case "-y":
                player.spawnParticle("typidoyun:block_y", vector.clone.add([ 0, -blockPadding, 0 ]), molang);
                break;
            case "-z":
                player.spawnParticle("typidoyun:block_z", vector.clone.add([ 0, 0, -blockPadding ]), molang);
                break;
        }
    })
    
}