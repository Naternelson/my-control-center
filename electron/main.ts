import { app, BrowserWindow } from "electron";

if (require("electron-squirrel-startup")) {
    app.quit();
}
declare const MAIN_WEBPACK_ENTRY: string;
declare const MAIN_PRELOAD_WEBPACK_ENTRY: string;
let mainWindow: BrowserWindow | null = null;
const createWindow = (): void => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            preload: MAIN_PRELOAD_WEBPACK_ENTRY,
        },
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WEBPACK_ENTRY);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    mainWindow.maximize();
    mainWindow.show();
};

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
