import { app, BrowserView, BrowserWindow, Menu, MenuItem, WebContentsView } from 'electron';
import { createAppWindow } from './config/windowManager';
import DashboardEntry from "./views/Dashboard/entry"
import StyleEntry from "./views/Style/entry"
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const DASHBOARD_WEBPACK_ENTRY: string;
declare const DASHBOARD_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}
let mainWindow: BrowserWindow | null = null 
const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: DASHBOARD_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(DASHBOARD_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
  const wins = createAppWindow(DashboardEntry);
  const menu = Menu.getApplicationMenu();
  menu.append(new MenuItem({
    label: "Dev",
    submenu: [
          {
              label: "Open Styles",
              click: () => createAppWindow(StyleEntry, wins["dashboard"]),
          },
      ]
  }))
  Menu.setApplicationMenu(menu)

  // const menuTemplate = existingMenu
  //     ? existingMenu.items.map((item) => item.toJSON())
  //     : Menu.buildFromTemplate([]).items.map((item) => item.toJSON());
  // menuTemplate.push({
  //     label: "Dev",
  //     submenu: [
  //         {
  //             label: "Open Styles",
  //             click: () => createAppWindow(StyleEntry, wins["dashboard"]),
  //         },
  //     ],
  // });

  // // Rebuild and set the menu
  // const updatedMenu = Menu.buildFromTemplate(
  //     menuTemplate as Electron.MenuItemConstructorOptions[]
  // );
  // Menu.setApplicationMenu(updatedMenu);
})

// app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// app.on('activate', () => {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

