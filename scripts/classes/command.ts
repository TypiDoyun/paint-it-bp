import { Player } from "@minecraft/server";

export class Command {
    public static PREFIX = ".";
    private static commands: Command[] = [];

    private _name!: string;
    private _description: string = "";
    private _onExecute!: (player: Player) => void;

    public constructor() {
        Command.commands.push(this);
    }

    public static find(commandName: string): Command | undefined {
        return Command.commands.find(command => command._name === commandName);
    }

    public setName(name: string) {
        this._name = name;

        return this;
    }

    public get name() {
        return this._name;
    }

    public setDescription(description: string) {
        this._description = description;

        return this;
    }

    public get description() {
        return this._description;
    }

    public setOnExecute(onExecute: (player: Player) => void) {
        this._onExecute = onExecute;

        return this;
    }

    public onExecute(player: Player) {
        this._onExecute(player);
    }
}