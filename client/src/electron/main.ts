import { app, BrowserWindow } from "electron"
import { ipcMainHandle, isDev } from "./util.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        // Shouldn't add contextIsolate or nodeIntegration because of security vulnerabilities
        webPreferences: {
            preload: getPreloadPath(),
        }
    });

    if (isDev()) {
        // Open the DevTools.
        mainWindow.webContents.openDevTools()
        mainWindow.loadURL("http://localhost:3524")
    }
    else mainWindow.loadFile(getUIPath());
})
