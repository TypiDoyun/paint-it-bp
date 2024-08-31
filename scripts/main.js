import { world } from "@minecraft/server";
import "./classes/shape";
import "./commands/index";
import { EraserComponent } from "./components/eraser";
import { PainterComponent } from "./components/painter";
import { SketcherComponent } from "./components/sketcher";
import { commandHandler } from "./handlers/command";
import { SketcherSettingComponent } from "./components/sketcher-setting";
import { PainterSettingComponent } from "./components/painter-setting";
import { EraserSettingComponent } from "./components/eraser-setting";
import { blockPointerHandler } from "./handlers/block-pointer";
// Register the command handler
world.beforeEvents.chatSend.subscribe(commandHandler);
// Register the custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register the item custom components
    console.error("Registering custom components...");
    eventData.itemComponentRegistry.registerCustomComponent("typidoyun:sketcher", new SketcherComponent());
    eventData.itemComponentRegistry.registerCustomComponent("typidoyun:painter", new PainterComponent());
    eventData.itemComponentRegistry.registerCustomComponent("typidoyun:eraser", new EraserComponent());
    eventData.itemComponentRegistry.registerCustomComponent("typidoyun:sketcher_setting", new SketcherSettingComponent());
    eventData.itemComponentRegistry.registerCustomComponent("typidoyun:painter_setting", new PainterSettingComponent());
    eventData.itemComponentRegistry.registerCustomComponent("typidoyun:eraser_setting", new EraserSettingComponent());
});
// Register the block pointer handler
world.afterEvents.worldInitialize.subscribe(blockPointerHandler);
