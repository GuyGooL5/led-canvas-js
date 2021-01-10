import BaseMode from "./BaseMode";


type Brush = "circle" | "square" | "diamond";

export default class PaintMode extends BaseMode {
    private _mPos: Coords = [0, 0];
    private _mDown: boolean = false;
    private _brush: Brush = "circle";
    private _radius: number = 1;
    private _add: boolean = true;

    Select() {
        this._core.Canvas.addEventListener('mousemove', this._MouseMoveFn, false);
        this._core.Canvas.addEventListener('mousedown', this._UpdateMouseDown, false);
        this._core.Canvas.addEventListener('mouseup', this._UpdateMouseUp, false);
        document.addEventListener('keypress', this._UpdateModeFn, false);
        console.log('selected paint');

    }
    private _MouseMoveFn = ((e: MouseEvent) => {
        e.preventDefault();
        this._mPos = [
            Math.floor((e.pageX - this._core.Canvas.offsetLeft) / (this._core.Radius * 2)),
            Math.floor((e.pageY - this._core.Canvas.offsetTop) / (this._core.Radius * 2))
        ];
        this.Update();
    });

    private _UpdateMouseDown = (() => { this._mDown = true; this.Update(); });
    private _UpdateMouseUp = (() => { this._mDown = false; });


    private Update() {
        let [x, y] = this._mPos;
        if (this._mDown)
            for (let i = 0; i < this._radius; i++)
                for (let j = 0; j < this._radius; j++)
                    if (this.BrushFunction(i, j, this._radius, this._brush)) {
                        if (x - i >= 0 && y - j >= 0) this._core.SetLed([x - i, y - j], this._add)
                        if (x + i < this._core.Width && y - j >= 0) this._core.SetLed([x + i, y - j], this._add);
                        if (x - i >= 0 && y + j < this._core.Height) this._core.SetLed([x - i, y + j], this._add);
                        if (x + i < this._core.Width && y + j < this._core.Height) this._core.SetLed([x + i, y + j], this._add);
                    }

    }



    private BrushFunction(i: number, j: number, r: number, fn: "circle" | "diamond" | "square"): boolean {
        switch (fn) {
            case "circle":
                return Math.ceil(Math.hypot(i, j)) < r;
            case "diamond":
                return i + j < r;
            case "square":
                return i < r || j < r;
        }
    }
    private _UpdateModeFn = () => ((e: KeyboardEvent) => {
        switch (e.key) {
            case '+':
                this._radius += 1;
                break;
            case '-':
                this._radius = this._radius > 1 ? this._radius - 1 : this._radius;
                break;
            case 'a':
                this._add = true;
                break;
            case 's':
                this._add = false;
                break;
            case 'b':
                switch (this._brush) {
                    case "circle": this._brush = "square"; break;
                    case "square": this._brush = "diamond"; break;
                    case "diamond": this._brush = "circle"; break;
                }
        }

    })

    Release() {
        this._core.Canvas.removeEventListener('mousemove', this._MouseMoveFn, false);
        this._core.Canvas.removeEventListener('mousedown', this._UpdateMouseDown, false);
        this._core.Canvas.removeEventListener('mouseup', this._UpdateMouseUp, false);
        document.removeEventListener('keypress', this._UpdateModeFn);
        console.log('released paint');

    }
}
