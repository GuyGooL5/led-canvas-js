
export type Letters = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | ":"

type NumbersArray = {
    [k in Letters]: number[]
};
const numbers5x7: NumbersArray = {
    "0": [14, 19, 21, 25, 17, 17, 14],
    "1": [2, 6, 10, 2,  2, 2, 15],
    "2": [14, 17, 1, 2, 4, 8, 31],
    "3": [14, 17, 1, 6,  1, 17, 14],
    "4": [2, 6, 10, 18, 31, 2, 2],
    "5": [31, 16, 30, 1, 1, 17, 14],
    "6": [14, 17, 16, 30, 17, 17, 14],
    "7": [31, 1, 2, 4, 8, 8, 8],
    "8": [14, 17, 17, 14, 17, 17, 14],
    "9": [14, 17, 17, 15, 1, 17, 14],
    ":": [0, 0, 4, 0, 0, 4, 0, 0]
};

type Letters2DArray = {
    [k in Letters]: number[][]
}


function createArray(width: number, height: number, numbers: NumbersArray): Letters2DArray {
    const arr: any = {};
    for (let [i, v] of Object.entries(numbers)) {
        arr[i] = new Array(height);
        for (let j = 0; j < height; j++) {
            arr[i][j] = new Array(width);
            let n: number = v[j];
            for (let k = 0; k < width; k++) {
                arr[i][j][width - k - 1] = (n & 0x1);
                n = n >> 1;
            }
        }
    }
    return arr;
}


const NUMBERS_5X7 = createArray(5, 7, numbers5x7);
console.log(NUMBERS_5X7);
export {
    NUMBERS_5X7
}