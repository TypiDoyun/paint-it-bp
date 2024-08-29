const historiesMap = new WeakMap();
const getHistories = (player) => {
    return historiesMap.get(player) ?? historiesMap.set(player, []).get(player);
};
export const popHistory = (player) => {
    const histories = getHistories(player);
    return histories.pop();
};
export const pushHistory = (player, history) => {
    const histories = getHistories(player);
    histories.push(history);
};
export class HistoryRecorder {
    _player;
    _history = [];
    constructor(player) {
        this._player = player;
    }
    record(blockHistory) {
        this._history.push(blockHistory);
    }
    save() {
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
