export namespace Random {
    export const randInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    export const randFloat = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
    };

    export const randBool = () => {
        return Math.random() < 0.5;
    };

    export const randSign = () => {
        return Math.random() < 0.5 ? -1 : 1;
    }

    export const shuffle = <T>(arr: T[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = randInt(0, i);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    export const randArray = (length: number) => {
        const arr = Array.from({ length }, (_, index) => index);
        shuffle(arr);
        return arr;
    };

    export const randElement = <T>(arr: T[]) => {
        return arr[randInt(0, arr.length - 1)];
    };

    export const randPicker = <T>(arr: T[]) => {
        const indices = randArray(arr.length);
        return (function* () {
            for (let i = 0; i < indices.length; i++) {
                yield arr[indices[i]];
            }
        })();
    };
}