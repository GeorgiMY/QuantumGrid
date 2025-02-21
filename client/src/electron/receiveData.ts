import fs from 'fs';
import path from 'path';

// Saves a JSON object in a new file in /data/processed
export async function saveJSONFileLocally(data: object, filename: string): Promise<void> {
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
