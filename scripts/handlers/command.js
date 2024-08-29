import { Command } from "../classes/command";
import { sendWarning } from "../utils/player";
export const commandHandler = (eventData) => {
    const { message, sender } = eventData;
    if (!message.startsWith(Command.PREFIX))
        return;
    eventData.cancel = true;
    const commandName = message.substring(Command.PREFIX.length).split(" ")[0];
    const command = Command.find(commandName);
    if (!command)
        return sendWarning(sender, `존재하지 않는 명령어입니다.`);
    command.onExecute(sender);
};
