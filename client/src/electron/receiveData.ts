import fs from 'fs';
import path from 'path';

// Saves a JSON object in a new file in /data/processed
export async function saveJSONFileLocally(data: any, filename: string): Promise<void> {
    const dir = path.resolve('./data/processed');

    // Ensure the directory exists
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, filename);
    console.log(filePath);

    // Write the JSON data to the file
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
    console.log(`JSON data saved to ${filePath}`);
}
