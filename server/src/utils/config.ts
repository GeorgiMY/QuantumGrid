import { readFileSync } from 'fs';
import path from 'path';

export function getServerConfig() {
    const configPath = path.resolve(__dirname, '../../server-config.json');
    const config = JSON.parse(readFileSync(configPath, 'utf-8'));

    return config;
}
