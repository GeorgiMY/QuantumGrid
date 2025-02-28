import { app, BrowserWindow, ipcMain } from "electron"
import { isDev } from "./util.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { openDialog, saveJSONToFile } from "./fileOperations.js";
import { connectToServer, disconnectFromServer } from "./websocketFunctions.js";

let mainWindow: BrowserWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
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

ipcMain.on("json-message", (event, configData, filePath) => {
    saveJSONToFile(configData, filePath);
})

ipcMain.on("open-dialog", async (event) => {
    try {
        const { path, data } = await openDialog(mainWindow);
        mainWindow.webContents.send("response-open-dialog", { path, data });
    } catch (error) {
        console.error("Error opening dialog: ", error)
    }
})

ipcMain.on("start-websocket-connection", async (event, serverURL) => {
    try {
        await connectToServer(`ws://${serverURL}`);
    } catch (error) {
        console.error("Error starting WebSocket connection: ", error);
    }
})

ipcMain.on("disconnect-from-server", (event) => {
    disconnectFromServer();
})
