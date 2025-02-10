import { readdirSync, createReadStream } from "fs";
import readline from "readline"
import { findDocuments } from "./utils/mongoDBFunctions";

export async function readDataFromMongoDB() {
	const response = await fetch("../project-config.json");
	const data = await response.json();
	const collectionName: string = data.collectionName;

	const collections = findDocuments(collectionName, 0, 5)

	return collections;
}

// Read data from a JSON line by line
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

// Read data from a JSON by documents
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

// Gets all the paths from a folder
export function readDataFromPath(path: string): string[] {
	const filePathsList = readdirSync(path);

	return filePathsList;
}
