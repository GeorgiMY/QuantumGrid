import fs from 'fs';
import path from 'path';
import { log } from './logging.js';

// Saves a JSON object in a new file in /data/unprocessed
export function saveJSONFileLocally(data: any, filename: string): void {
    const dir = path.resolve('./data/unprocessed');

    // Ensure the directory exists
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, filename);

    // Write the JSON data to the file
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
    log(`JSON data saved to ${filePath}`);
}
