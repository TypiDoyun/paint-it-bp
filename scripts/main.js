import { world } from "@minecraft/server";
import { commandHandler } from "./handlers/command";
world.beforeEvents.chatSend.subscribe(commandHandler);
