import { useEffect, useMemo, useRef } from "react";
import LedCanvasCore from "./logic/LedCanvasCore";
import ClockMode from "./logic/Modes/ClockMode";
import PaintMode from "./logic/Modes/PaintMode";


interface LedCanvasProps {
    width: number;
    height: number;
    mode: "clock" | "paint";
    config?: {
        radius?: number;
        template?: {
            active: ColorStop[];
            inactive: ColorStop[];
        }
    }
}

const LedClock = ({ width, height, mode, config }: LedCanvasProps) => {

    const LedClock = useMemo(() => new LedCanvasCore(width, height, config), [width, height, config]);
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let divRefCurrent = divRef?.current;
        if (divRefCurrent) divRefCurrent.appendChild(LedClock.Canvas);
        return () => {
            divRefCurrent?.removeChild(LedClock.Canvas);
        }
    }, [LedClock.Canvas])

    useEffect(() => {
        const activeMode = (() => {
            switch (mode) {
                case "clock": return new ClockMode(LedClock);
                case "paint": return new PaintMode(LedClock);
            }
        })();
        activeMode.Select();
        return () => {
            activeMode.Release();
        }
    }, [mode, LedClock])
    return <div ref={divRef} />;
}

export default LedClock;