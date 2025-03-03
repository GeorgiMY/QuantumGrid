import { createReadStream, readFileSync, writeFileSync, existsSync } from "fs";
import readline from "readline"
import { findDocuments } from "./mongoDBFunctions";
import path from "path";
import { getAllObjectIds } from "./queries";

// Gets a specific number of documents from a collection specified in the project-config.json
export async function readDataFromMongoDB() {
    const configPath = path.resolve(__dirname, '../server-config.json');
    const data = JSON.parse(readFileSync(configPath, 'utf-8'));
    const collectionName: string = data["mongodb-collection-name"];

    // To store unique docs - changed from Set to Array
    let uniqueDocs: any[] = [];
    let currentIndex = 0;
    const incrementingIndex = 10;

    const allSentOutIds = getAllObjectIds();

    // Repeat until we have 10 unique IDs
    while (uniqueDocs.length < 10) {
        const documents = await findDocuments(collectionName, currentIndex, incrementingIndex);

        // Break if no more documents are found
        if (documents.length === 0) break;

        for (const doc of documents) {
            // Check if this doc has already been sent
            if (!allSentOutIds.includes(doc._id.toString())) {
                uniqueDocs.push(doc);

                // Break once we reach 10 unique docs
                if (uniqueDocs.length >= 10) break;
            }
        }

        // Move to the next set of documents
        currentIndex += incrementingIndex;
    }

    console.log(`Found ${uniqueDocs.length} unique documents`);
    return uniqueDocs;
}

// export async function readDataFromMongoDB() {
//     const configPath = path.resolve(__dirname, '../server-config.json');
//     const data = JSON.parse(readFileSync(configPath, 'utf-8'));
//     const collectionName: string = data["mongodb-collection-name"];

//     const uniqueIds = new Set<string>();
//     const uniqueDocs: any[] = [];
//     const batchSize = 100; // Pull 100 documents at once
//     let currentIndex = 0; // Start from 0

//     while (uniqueDocs.length < 10) {
//         const allSentOutIds = getAllObjectIds();
//         const documents = await findDocuments(collectionName, currentIndex, batchSize);

//         for (const doc of documents) {
//             const docId = doc._id.toString();
//             if (!allSentOutIds.includes(docId) && !uniqueIds.has(docId)) {
//                 uniqueIds.add(docId);
//                 uniqueDocs.push(doc);
//             }
//             if (uniqueDocs.length === 10) break;
//         }

//         currentIndex += batchSize;
//         if (documents.length < batchSize) break; // No more documents
//     }

//     console.log(uniqueDocs);
//     return uniqueDocs;
// }

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
