import { readdirSync, createReadStream } from "fs";
import readline from "readline"
import { findDocuments } from "./utils/dbFunctions";

export async function readDataFromMongoDB() {
    const response = await fetch("../project-config.json");
    const data = await response.json();
    const collectionName: string = data.collectionName;

    const collections = findDocuments(collectionName, 0, 5)

    return collections;
}

export function readDataFromJson(startLine: number, endLine: number): Promise<string[]> {
    return new Promise((resolve, reject) => {
        // Input validation
        if (startLine < 1 || endLine < startLine) return reject(new Error('Invalid line range'))

        const fileStream = createReadStream('data/test.jsonl')
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

export function readDataFromPath(path: string): string[] {
    const fileList = readdirSync(path);

    return fileList;
}
