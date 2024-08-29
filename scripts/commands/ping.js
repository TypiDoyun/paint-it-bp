import { Command } from "../classes/command";
import { sendMessage } from "../utils/player";
export default new Command()
    .setName("ping")
    .setDescription("Pong!")
    .setOnExecute(async (player) => {
    sendMessage(player, "Pong!");
});
