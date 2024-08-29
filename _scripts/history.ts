import { BlockPermutation, BlockType, Player } from "@minecraft/server";
import { Vector3Like } from "./utils/math/vector";

type BlockHistory = {
    location: Vector3Like;
    before: BlockPermutation;
    after: BlockType;
}

type History = BlockHistory[];

const historiesMap = new WeakMap<Player, History[]>()

const getHistories = (player: Player) => {
    return historiesMap.get(player) ?? historiesMap.set(player, []).get(player)!;
}

export const popHistory = (player: Player) => {
    const histories = getHistories(player);
    return histories.pop();
}

export const pushHistory = (player: Player, history: History) => {
    const histories = getHistories(player);
    histories.push(history);
}

export class HistoryRecorder {
    private _player: Player;
    private _history: History = [];

    constructor(player: Player) {
        this._player = player;
    }

    public record(blockHistory: BlockHistory) {
        this._history.push(blockHistory);
    }

    public save() {
        pushHistory(this._player, this._history);
        this._history = [];
    }
}

// type BehaviorHistory = Vector3[];

// const histories = new Map<string, BlockHistory[]>();
// const behaviors: Vector3[][] = [];

// export const getHistories = (vector: Vector3) => {
//     return histories.get(vector.toString()) ?? [];
// }

// export const addHistory = (vector: Vector3, history: BlockHistory) => {
//     const historyList = getHistories(vector);
//     historyList.push(history);

//     histories.set(vector.toString(), historyList);
// }

// export const saveBehavior = (callback: () => void) => {
//     const record: {
//         vector: Vector3;
//         history: BlockHistory;
//     }[] = [];
//     const addRecord = (vector: Vector3, history: BlockHistory) => {
//         record.push({ vector, history });
//     }
//     callback(addRecord);
// }