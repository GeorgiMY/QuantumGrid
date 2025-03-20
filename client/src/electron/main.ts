import { app, BrowserWindow, ipcMain, shell } from "electron"
import { isDev } from "./util.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { getJSONFromFile, getServerPath, saveJSONToFile } from "./fileOperations.js";
import { connectToServer, disconnectFromServer, isWsConnected } from "./websocketFunctions.js";
import { getEnvFile } from "./configureServer.js";
import { log } from "./logging.js";

let mainWindow: BrowserWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        // Won't add contextIsolate or nodeIntegration because of security vulnerabilities
        webPreferences: {
            preload: getPreloadPath(),
        },
        autoHideMenuBar: true,
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

ipcMain.on("start-websocket-connection", async (event, serverURL) => {
    try {
        await connectToServer(`ws://${serverURL}`);
    } catch (error) {
        log(`[ERROR] starting WebSocket connection: ${error}`);
        console.error("Error starting WebSocket connection: ", error);
    }
})

ipcMain.on("disconnect-from-server", (event) => {
    disconnectFromServer();
})

ipcMain.handle("setup-server", async (event) => {
    try {
        const result = await getServerPath(mainWindow);
        return result.filePaths[0];
    } catch (error) {
        log(`[ERROR] opening file explorer: ${error}`);
        console.error("Error opening file explorer: ", error);
    }
})

ipcMain.handle("is-connected-to-ws", (event) => {
    try {
        const result = isWsConnected();
        return result;
    } catch (error) {
        log(`[ERROR] opening file explorer: ${error}`)
        console.error("Error opening file explorer: ", error)
    }
})

// Opens the link in the default browser
ipcMain.handle("open-external-link", async (event, url) => {
    shell.openExternal(url);
});

ipcMain.handle("get-server-config", async (event, serverPath: string) => {
    try {
        const jsonFile = await getJSONFromFile(`${serverPath}/server-config.json`)
        return jsonFile;
    } catch (error) {
        log(`[ERROR] in ipcMain.handle get-server-config: ${error}`)
        console.error("ERROR in ipcMain.handle get-server-config: ", error)
    }
})

ipcMain.handle("get-env-file", async (event, serverPath: string) => {
    try {
        const envContents = await getEnvFile(serverPath);
        return envContents;
    } catch (error) {
        log(`[ERROR] in ipcMain.handle get-server-config: ${error}`)
        console.error("Error in ipcMain.handle get-server-config: ", error)
    }
})

ipcMain.handle("fetch-client-config", async (event) => {
    try {
        const jsonFile = await getJSONFromFile(`./client-config.json`)
        return jsonFile;
    } catch (error) {
        log(`[ERROR] Error in ipcMain.handle fetch-client-config: ${error}`)
        console.error("[ERROR] Error in ipcMain.handle fetch-client-config: ", error)
    }
})

ipcMain.handle("save-client-config", async (event, data: object, filePath: string) => {
    try {
        saveJSONToFile(data, filePath);
    } catch (error) {
        log(`[ERROR] Error in ipcMain.handle save-client-config: ${error}`)
        console.error(`[ERROR] Error in ipcMain.handle save-client-config: ${error}`)
    }
})
