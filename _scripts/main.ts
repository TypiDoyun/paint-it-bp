import { world } from "@minecraft/server";
import "./commands/root";
import { commandHandler } from "./handlers/command";
import { SketcherSettingComponent } from "./components/sketcher-setting";
import { EraserComponent } from "./components/eraser";
import { EraserSettingComponent } from "./components/eraser-setting";
import { PainterComponent } from "./components/painter";
import { PainterSettingComponent } from "./components/painter-setting";
import { TeleporterComponent } from "./components/teleporter";
import { SketcherComponent } from "./components/sketcher";
import { Queue } from "./utils/queue";

world.beforeEvents.chatSend.subscribe(commandHandler);
world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('typidoyun:sketcher', new SketcherComponent());
    initEvent.itemComponentRegistry.registerCustomComponent('typidoyun:sketcher_setting', new SketcherSettingComponent());
    initEvent.itemComponentRegistry.registerCustomComponent('typidoyun:painter', new PainterComponent());
    initEvent.itemComponentRegistry.registerCustomComponent('typidoyun:painter_setting', new PainterSettingComponent());
    initEvent.itemComponentRegistry.registerCustomComponent('typidoyun:eraser', new EraserComponent());
    initEvent.itemComponentRegistry.registerCustomComponent('typidoyun:eraser_setting', new EraserSettingComponent());
    initEvent.itemComponentRegistry.registerCustomComponent('typidoyun:teleporter', new TeleporterComponent());
});