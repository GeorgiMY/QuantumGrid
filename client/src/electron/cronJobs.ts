import cron from "node-cron";
import fs from 'fs/promises';
import path from 'path';

// Declare global variables to hold file pathss and sizes
let currentFileData: { path: string; size: number }[] = [];
let previousFileData: { path: string; size: number }[] = [];

// Function to check for existing data in the /data/processed folder
async function checkProcessedData() {
    const directoryPath = path.join(__dirname, '/data/processed');

    try {
        const files = await fs.readdir(directoryPath);

        currentFileData = await Promise.all(files.map(async (file: string) => {
            const filePath = path.join(directoryPath, file);
            const stats = await fs.stat(filePath);
            return { path: filePath, size: stats.size };
        }));
    } catch (error) {
        console.error('Error reading processed data:', error);
    }
}

// Create a cron job that periodically sends information to the server
// To counter files that are not ready because they are being streaming, before the data is sent
// there is a check if the files have changed from the previous time they were checked
export function startSendingDataPeriodically(period: number, ws: WebSocket): cron.ScheduledTask {
    console.log(`Starting data sending every ${period} seconds`);
    const cronJob = cron.schedule(`*/${period} * * * * *`, async () => {
        console.log("Cron job triggered");

        await checkProcessedData();

        if (currentFileData == previousFileData) previousFileData = currentFileData;
        else {
            ws.send(JSON.stringify(currentFileData));
            console.log("Data was sent to the server");
        }
    });

    cronJob.start();
    return cronJob;
}
