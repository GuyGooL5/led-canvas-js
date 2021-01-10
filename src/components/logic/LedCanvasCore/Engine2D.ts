import { Letters, NUMBERS_5X7 } from "../structures/numbers";
import { LedCanvasConfig } from "./index";


export default class Engine2D {
    private _height: number = 0;
    private _width: number = 0;
    private _radius: number;

    private _cvs: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _template: { active: ImageData; inactive: ImageData; };

    private _board: boolean[][] = [];

    constructor(canvas: HTMLCanvasElement, width: number, height: number, config?: Partial<LedCanvasConfig>) {
        this._cvs = canvas;
        this._ctx = this._cvs.getContext('2d') as CanvasRenderingContext2D;
        this._radius = config?.radius ?? 8;
        const colorStops = config?.template ?? {
            inactive: [[0, '#1a175b'], [0.65, '#080393'], [0.80, '#2a289a'], [0.9, '#5c48ff'], [.95, '#000']],
            active: [[0, '#e5e3ff'], [0.65, '#a8a5ff'], [0.80, '#8a88ff'], [0.9, '#5c46ff'], [.95, '#000']]
        }
        this._template = {
            inactive: this.CreateLedTemplate(this.CreateGradientPattern(...colorStops.inactive)),
            active: this.CreateLedTemplate(this.CreateGradientPattern(...colorStops.active))
        };

        this.SetBoardSize(width, height);
        this.UpdateCanvas();
    }

    get Canvas() { return this._cvs; }
    get Context() { return this._ctx; }
    get Radius() { return this._radius; }
    get Width() { return this._width; }
    get Height() { return this._height; }
    SetBoardSize(width: number, height: number) {
        this._width = width;
        this._height = height;
        this._cvs.width = this._width * this._radius * 2;
        this._cvs.height = this._height * this._radius * 2;
        this._board = new Array(this._width).fill(new Array(this._height).fill(false));
        console.log(this);
    }

    DrawLed(p: Coords) {
        let [x, y] = p; this._ctx.putImageData(this._template[this._board[x][y] ? 'active' : 'inactive'], x * this._radius * 2, y * this._radius * 2);
    }


    DrawLetter(letter: Letters, p: Coords): Coords {
        let [x, y] = p;
        let numArr = NUMBERS_5X7[letter];
        for (var _j in numArr) {
            let j = Number(_j);
            for (var _i in numArr[_j]) {
                let i = Number(_i);
                if (x + i >= 0 && x + i <= this._width && y + j >= 0 && y + j <= this._height) this.SetLed([x + i, y + j], !!numArr[j][i]);
            }
        }
        return [5 + x, 7 + y];
    }

    IsAcative(p: Coords) { let [x, y] = p; return this._board[x][y] }

    SetLed(p: Coords, active?: boolean) {
        let [x, y] = p;
        this._board[x][y] = active ?? true;
        this.DrawLed(p);
    }

    UpdateCanvas() {
        for (let i in this._board) {
            for (let j in this._board[i]) {
                this.DrawLed([Number(i), Number(j)]);
            }
        }
    }

    CreateGradientPattern(...colstop: ColorStop[]): CanvasGradient {
        let grd = this._ctx.createRadialGradient(this._radius, this._radius, 0, this._radius, this._radius, this._radius);
        for (let c of colstop)
            grd.addColorStop(...c);
        return grd;
    }
    CreateLedTemplate(grd: CanvasGradient): ImageData {
        this._ctx.fillStyle = grd;
        this._ctx.beginPath();
        this._ctx.fillRect(0, 0, this._radius * 2, this._radius * 2);
        let imageData = this._ctx.getImageData(0, 0, this._radius * 2, this._radius * 2);
        this._ctx.clearRect(0, 0, this._cvs.width, this._cvs.height);
        return imageData;
    }
}