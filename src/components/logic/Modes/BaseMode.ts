import LedCanvasCore from "../LedCanvasCore";

export default class BaseMode {
    protected _core: LedCanvasCore;
    constructor(core: LedCanvasCore) {
        this._core = core;
    }
    Select() { };
    Release() { };
}