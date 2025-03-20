import { BrowserWindow, dialog, OpenDialogReturnValue } from "electron/main";
import { log } from "./logging.js";
import fs from 'fs';
import fsPromises from 'fs/promises';

export function saveJSONToFile(data: object, filePath: string): void {
    // Ensure the filePath exists
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
    }

    // Write the JSON data to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    log(`New JSON data saved to ${filePath}`);
}

// Get the JSON data from a specific file
export async function getJSONFromFile(filePath: string): Promise<any> {
    const fileContent = await fsPromises.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent); // Parse the JSON data

    return jsonData;
}

// Checks if the server contains .quantumgrid file
export async function containsQuantumGridFile(serverPath: string): Promise<boolean> {
    try {
        // Construct the full path to the .quantumgrid file
        const quantumGridFilePath = `${serverPath}/.quantumgrid`;

        // Check if the .quantumgrid file exists
        await fsPromises.access(quantumGridFilePath);

        // If no error was thrown, the file exists
        console.log(`Found .quantumgrid file at ${quantumGridFilePath}`);
        return true;
    } catch (error) {
        // If the file does not exist, access() will throw an error
        throw new Error("Folder doesn't contain a Quantum Grid server")
    }
}

// Gets a folder provided by the user
export async function getServerPath(mainWindow: BrowserWindow): Promise<OpenDialogReturnValue> {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    });

    // Return null if dialog is canceled
    if (result.canceled) return { canceled: true, filePaths: [] };

    await containsQuantumGridFile(result.filePaths[0]);

    return result;
}

// Saves the environment file to a specific path
export async function saveENVFile(data: object, filePath: string) {
    try {
        // Ensure the filePath exists
        const dirPath = filePath.substring(0, filePath.lastIndexOf('/'));
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Convert the data object to a .env file format
        const envData = Object.entries(data)
            .map(([key, value]) => `${key}=${value}`)
            .join('\n');

        // Write the .env data to the file
        await fsPromises.writeFile(filePath, envData, 'utf-8');
        log(`Environment data saved to ${filePath}`);
    } catch (error) {
        log(`Failed to save environment data to ${filePath}: ${error}`);
        throw error;
    }
}
