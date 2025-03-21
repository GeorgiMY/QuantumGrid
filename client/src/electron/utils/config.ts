import { readFileSync } from 'fs';
import path from 'path';

export async function getClientConfig() {
    const configPath = path.resolve('./client-config.json');
    const file = readFileSync(configPath, 'utf-8');
    const config = await JSON.parse(file);

    return config;
}
