import { BrowserWindow, dialog, OpenDialogReturnValue } from "electron/main";
import { log } from "./logging.js";
import fs from 'fs';
import fsPromises from 'fs/promises';

/**
 * Saves a JSON object to a specified file path.
 * @param data - The JSON data to save.
 * @param filePath - The path to the file where the file will be saved.
 */
export function saveJSONToFile(data: object, filePath: string): void {
    // Ensure the filePath exists
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
    }

    // Write the JSON data to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    log(`New JSON data saved to ${filePath}`);
}

export async function openDialog(mainWindow: BrowserWindow) {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [{ name: 'JSON Files', extensions: ['json'] }]
    });

    if (result.canceled) {
        return { path: null, data: null }; // Return null if dialog is canceled
    }

    const filePath = result.filePaths[0];
    const fileContent = await fsPromises.readFile(filePath, 'utf-8'); // Use fs.promises.readFile
    const jsonData = JSON.parse(fileContent); // Parse the JSON data

    return { path: filePath, data: jsonData }; // Return both path and data
}


export async function getServerPath(mainWindow: BrowserWindow): Promise<OpenDialogReturnValue> {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    });

    if (result.canceled) {
        return { canceled: true, filePaths: [] }; // Return null if dialog is canceled
    }

    return result;
}
