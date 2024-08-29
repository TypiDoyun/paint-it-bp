import { ChatSendBeforeEvent } from "@minecraft/server";
import { Command } from "../command";
import { sendMessage } from "../utils/player";

export const commandHandler = (eventData: ChatSendBeforeEvent) => {
    const { sender, message } = eventData;

    if (!message.startsWith(Command.PREFIX)) return;

    eventData.cancel = true;

    const commandName = message.substring(Command.PREFIX.length).split(" ")[0];
    const command = Command.find(commandName);

    if (!command) return sendMessage(sender, `존재하지 않는 명령어입니다.`, "c");

    command.onExecute(sender);
}