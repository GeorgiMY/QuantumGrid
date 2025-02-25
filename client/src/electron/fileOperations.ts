import { ipcRenderer } from 'electron';

/**
 * Saves a JSON object to a specified file path.
 * @param data - The JSON data to save.
 * @param filename - The name of the file to save the data to.
 * @param directory - The directory where the file will be saved.
 */
export async function saveJSONToFile(data: object, filename: string, directory: string): Promise<void> {
    return ipcRenderer.invoke('save-json-file', data, filename, directory);
} 
