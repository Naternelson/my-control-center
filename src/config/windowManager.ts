/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BrowserWindow } from "electron";

// type ViewName = "dashboard" | "styles"; // Extend this with your views

const windows: Record<string, BrowserWindow | null> = {
    dashboard: null,
    styles: null,
};

export const createAppWindow = (entry: {view: string, url: string, preload: string}, parent?: BrowserWindow) => {
    // If the window already exists, focus it
    const {view, url, preload} = entry
    if (windows[view]) {
        windows[view]!.show();
        windows[view]!.focus();
        return;
    }

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        title: `${view.charAt(0).toUpperCase()}${view.slice(1)}`,
        parent,
        webPreferences: {
            preload,
        },
    });

    win.loadURL(url);

    win.on("closed", () => {
        windows[view] = null;
    });

    windows[view] = win;
    return windows
};
