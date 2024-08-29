import { LocationOutOfWorldBoundariesError, system } from "@minecraft/server";
import { Command } from "../command";
import { popHistory } from "../history";
export default new Command()
    .setName("undo")
    .setDescription("실행을 되돌립니다.")
    .setOnExecute(async (player) => {
    system.run(() => {
        const history = popHistory(player);
        const dimension = player.dimension;
        if (!history)
            return;
        system.runJob(function* () {
            for (const blockHistory of history) {
                const { location, before } = blockHistory;
                try {
                    const block = dimension.getBlock(location);
                    if (!block)
                        continue;
                    block.setPermutation(before);
                    yield;
                }
                catch (error) {
                    if (!(error instanceof LocationOutOfWorldBoundariesError))
                        throw error;
                    continue;
                }
            }
        }());
    });
});
