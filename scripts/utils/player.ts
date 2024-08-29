import { Player } from "@minecraft/server";
import { Vector3 } from "./math/vector3";

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
    player.playSound(sound, {
        location: new Vector3(0, -1, 0).add(player.location),
        volume: 0.05 * volume,
        pitch
    });
}