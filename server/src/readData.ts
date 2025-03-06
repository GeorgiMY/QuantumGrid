import { createReadStream, readFileSync } from "fs";
import readline from "readline"
import { findDocuments } from "./mongoDBFunctions";
import path from "path";
import { getAllObjectIds, getCurrentIndex, updateCurrentIndex } from "./queries";

// Gets a specific number of documents from a collection specified in the project-config.json
export async function readDataFromMongoDB() {
    const configPath = path.resolve(__dirname, '../server-config.json');
    const data = JSON.parse(readFileSync(configPath, 'utf-8'));
    const collectionName: string = data["mongodb-collection-name"];

    let uniqueDocs: any[] = [];
    const batchSize = 50;
    let currentIndex = getCurrentIndex();

    const allSentOutIds = getAllObjectIds();
    const allSentOutIdsSet = new Set(allSentOutIds);

    while (uniqueDocs.length < batchSize) {
        const documents = await findDocuments(collectionName, currentIndex, batchSize);

        if (documents.length === 0) break;

        for (const doc of documents) {
            if (!allSentOutIdsSet.has(doc._id.toString())) {
                uniqueDocs.push(doc);
            }

            currentIndex++;
            updateCurrentIndex(currentIndex);
            if (uniqueDocs.length >= batchSize) break;
        }
    }

    return uniqueDocs;
}

// Read data from a local JSON file line by line (depricated)
export async function readDataLinesFromJson(pathToJSON: string, startLine: number, endLine: number): Promise<string[]> {
    return new Promise((resolve, reject) => {
        // Input validation
        if (startLine < 1 || endLine < startLine) return reject(new Error('Invalid line range'));

        const fileStream = createReadStream(pathToJSON)
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        })

        let currentLine = 0
        const results: string[] = []

        rl.on('line', (line: string) => {
            currentLine++

            // Skip lines before start
            if (currentLine < startLine) return

            // Stop reading after end line
            if (currentLine > endLine) {
                rl.close()
                return
            }

            try {
                // Parse each line as JSON
                const parsedLine = JSON.parse(`{"${currentLine}": ${line}}`)
                results.push(parsedLine)
            } catch (err: any) {
                rl.close()
                reject(new Error(`Invalid JSON at line ${currentLine}: ${err.message}`))
            }
        });

        rl.on('close', () => {
            // Check if we found any lines in the specified range
            if (currentLine < startLine) reject(new Error('Start line is beyond file length'))
            else resolve(results)
        })

        rl.on('error', (err: any) => {
            reject(err)
        });
    });
}

// Read data from a local JSON file by streaming a document
export async function readDataObjectsFromJson(pathToJSON: string, startIndex: number, endIndex: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
        // Input validation
        if (startIndex < 0 || endIndex < startIndex) return reject(new Error('Invalid object range'));

        const fileStream = createReadStream(pathToJSON);
        let jsonString = '';

        fileStream.on('data', (chunk) => {
            jsonString += chunk.toString();
        });

        fileStream.on('end', () => {
            try {
                const jsonData = JSON.parse(jsonString); // Parse full JSON
                if (!Array.isArray(jsonData)) return reject(new Error('JSON data is not an array'));

                const selectedObjects = jsonData.slice(startIndex, endIndex + 1); // Extract objects in range
                resolve(selectedObjects);
            } catch (error) {
                reject(new Error(`Error parsing JSON: ${error}`));
            }
        });

        fileStream.on('error', (error) => {
            reject(error);
        });
    });
}
