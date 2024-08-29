import { Vector3 } from "./math/vector3";
const beforeMessages = new Map();
export const sendMessage = (player, message, color = "a") => {
    const text = `§l§${color} > §r§f${message}`;
    if (beforeMessages.get(player) === text)
        return;
    player.sendMessage(text);
    beforeMessages.set(player, text);
};
export const sendWarning = (player, message) => {
    sendMessage(player, message, "c");
    playSound(player, "random.orb");
};
export const playSound = (player, sound, pitch = 1, volume = 1) => {
    player.playSound(sound, {
        location: new Vector3(0, -1, 0).add(player.location),
        volume: 0.05 * volume,
        pitch
    });
};
