import { Letters } from "../structures/numbers";
import BaseMode from "./BaseMode";

export default class ClockMode extends BaseMode {
    private _offset: [number, number] = [0, 0];

    Select() {
        this.UpdateInterval();
    }

    UpdateInterval() {
        if (this._interval) clearInterval(this._interval);
        this._interval = setInterval(this.Loop, 500);
    }

    SetOffset(p: Coords) {
        this._offset = p;
        this.UpdateInterval();
    }

    private Loop = (() => {
        let d = new Date();
        let [h, m] = [d.getHours(), d.getMinutes()];
        //@ts-ignore
        let letters: Letters[] = [Math.floor(h / 10) % 10, h % 10, ":", Math.floor(m / 10) % 10, m % 10];
        let next = this._offset;
        for (let i of letters) {
            next = this._core.DrawLetter(i, [next[0], this._offset[1]]);
            next = [next[0] + 1, 0];
        }
    })

    private _interval: NodeJS.Timeout | undefined = undefined;

    Release() {
        if (this._interval) clearInterval(this._interval);
    }
}