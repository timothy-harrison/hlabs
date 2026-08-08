import { writable } from "svelte/store";

export type Window = {
    id: number;
    x: number,
    y: number,
    width: number,
    height: number,
}

class WindowManager {
    private windows = writable<Window[]>([]);
    constructor(windows: Window[] | undefined) {
        this.windows.set(windows ?? []);
    }

    closeWindow(winId: number) {
        this.windows.update(wins => wins.filter(win => win.id !== winId))
    }
}