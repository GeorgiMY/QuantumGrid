import { app, BrowserWindow, ipcMain, dialog } from "electron"
import { ipcMainHandle, isDev } from "./util.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import fs from 'fs';
import path from 'path';
// import { log } from "./logging.js";

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        // Shouldn't add contextIsolate or nodeIntegration because of security vulnerabilities
        webPreferences: {
            preload: getPreloadPath(),
        }
    });

    // IPC handler for saving JSON files
    ipcMain.handle('save-json-file', async (event, data, filename, directory) => {
        const filePath = path.join(directory, filename);

        // Ensure the directory exists
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        // Write the JSON data to the file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        // log(`New JSON data saved to ${filePath}`);
    });

    // New IPC handler to open a file dialog and return the selected file path
    ipcMain.handle('select-file', async () => {
        const result = await dialog.showOpenDialog(mainWindow, {
            properties: ['openFile'],
            filters: [{ name: 'JSON Files', extensions: ['json'] }]
        });
        return result.filePaths[0]; // Return the first selected file path
    });

    if (isDev()) {
        // Open the DevTools.
        mainWindow.webContents.openDevTools()
        mainWindow.loadURL("http://localhost:3524")
    }
    else mainWindow.loadFile(getUIPath());
})
