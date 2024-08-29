export class Command {
    static PREFIX = ".";
    static commands = [];
    _name;
    _description = "";
    _onExecute;
    constructor() {
        Command.commands.push(this);
    }
    static find(commandName) {
        return Command.commands.find(command => command._name === commandName);
    }
    setName(name) {
        this._name = name;
        return this;
    }
    get name() {
        return this._name;
    }
    setDescription(description) {
        this._description = description;
        return this;
    }
    get description() {
        return this._description;
    }
    setOnExecute(onExecute) {
        this._onExecute = onExecute;
        return this;
    }
    onExecute(player) {
        this._onExecute(player);
    }
}
