import fs from 'fs';
import path from 'path';
import { insertNewDocument, insertNewDocuments } from './utils/mongoDBFunctions';
import { readFileSync } from 'fs';

// Saves a JSON object in a new file in /data/processed
export async function saveJSONFileLocally(data: object, filename: string) {
    const dir = path.resolve(__dirname, '../data/processed');

    // Ensure the directory exists
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, filename);

    // Write the JSON data to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`JSON data saved to ${filePath}`);
}

// Adds a JSON object to the specified file in /data/processed
export async function saveJSONToFileLocally(data: object, filename: string) {

}

// Saves a JSON object to MongoDB
export async function saveJSONToMongoDB(data: object) {
    const configPath = path.resolve(__dirname, '../server-config.json');
    const config = JSON.parse(readFileSync(configPath, 'utf-8'));
    const collectionName: string = config["mongodb-collection-name"];

    try {
        const result = await insertNewDocument(collectionName, data);
        console.log(`Data saved to MongoDB collection ${collectionName}:`, result);
    } catch (error) {
        console.error('Error saving data to MongoDB:', error);
    }
}

// Saves JSON objects to MongoDB
export async function saveJSONsToMongoDB(data: object[]) {
    const configPath = path.resolve(__dirname, '../server-config.json');
    const config = JSON.parse(readFileSync(configPath, 'utf-8'));
    const collectionName: string = config["mongodb-collection-name"];

    try {
        const result = await insertNewDocuments(collectionName, data);
        console.log(`Data saved to MongoDB collection ${collectionName}:`, result);
    } catch (error) {
        console.error('Error saving data to MongoDB:', error);
    }
}

export async function saveData(data: object[]) {
    const configPath = path.resolve(__dirname, '../server-config.json');
    const config = JSON.parse(readFileSync(configPath, 'utf-8'));
    const typeOfFileSaving: string = config["type-of-data-deposition"]

    switch (typeOfFileSaving) {
        case "MongoDB":
            await saveJSONsToMongoDB(data);
            break;
        case "Local-JSON":
            break;
        case "Local-Files":
            break;
        default:
            throw new Error("At sendDataDependingOnDataDistributed() all cases failed. Unknown typeOfDataDistributed was tried");
    }
}
