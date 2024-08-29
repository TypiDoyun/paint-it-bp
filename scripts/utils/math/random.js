export var Random;
(function (Random) {
    Random.randInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    Random.randFloat = (min, max) => {
        return Math.random() * (max - min) + min;
    };
    Random.randBool = () => {
        return Math.random() < 0.5;
    };
    Random.shuffle = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Random.randInt(0, i);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };
    Random.randArray = (length) => {
        const arr = Array.from({ length }, (_, index) => index);
        Random.shuffle(arr);
        return arr;
    };
    Random.randElement = (arr) => {
        return arr[Random.randInt(0, arr.length - 1)];
    };
    Random.randPicker = (arr) => {
        const indices = Random.randArray(arr.length);
        return (function* () {
            for (let i = 0; i < indices.length; i++) {
                yield arr[indices[i]];
            }
        })();
    };
})(Random || (Random = {}));
