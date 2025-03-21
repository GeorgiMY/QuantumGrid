import cron from "node-cron";
import fs from 'fs/promises';
import path from 'path';
import WebSocket from "ws";
import { getClientConfig } from "./utils/config.js";

type fileData = {
    name: string;
    content: string;
}

// Declare global variables to hold file pathss and sizes
let currentFileData: fileData[] = [];
let previousFileData: fileData[] = [];
let directoryPath: string;

// Function to check for existing data in the folder specified in the config
async function checkProcessedData() {
    try {
        const clientConfig = await getClientConfig();

        if (!clientConfig["data-for-depositing"]) {
            throw new Error("Missing data-for-depositing configuration");
        }

        directoryPath = clientConfig["data-for-depositing"];

        const files = await fs.readdir(directoryPath);

        currentFileData = await Promise.all(files.map(async (file: string) => {
            const filePath = path.join(directoryPath, file);
            const content = await fs.readFile(filePath, 'utf-8');
            return {
                name: file,
                content: content
            } as fileData;
        }));
    } catch (error) {
        console.error('Error reading processed data:', error);
        // Reset current data if there's an error
        currentFileData = [];
    }
}

// Create a cron job that periodically sends information to the server
// To counter files that are not ready because they are being streaming, before the data is sent
// there is a check if the files have changed from the previous time they were checked
export function startSendingDataPeriodically(period: number, ws: WebSocket): cron.ScheduledTask {
    console.log(`Starting data sending every ${period} seconds`);
    const cronJob = cron.schedule(`*/${period} * * * * *`, async () => {
        console.log("Cron job triggered");

        try {
            await checkProcessedData();

            const currentDataString = JSON.stringify(currentFileData);
            const previousDataString = JSON.stringify(previousFileData);

            if (currentDataString === previousDataString && currentFileData.length > 0) {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(currentDataString);
                    console.log("Data was sent to the server");

                    // Only delete files after successful send
                    const files = await fs.readdir(directoryPath);
                    await Promise.all(files.map(file =>
                        fs.unlink(path.join(directoryPath, file))
                    ));
                    console.log("Files deleted after successful send");
                } else {
                    console.warn("WebSocket is not open, skipping send");
                }
            }

            previousFileData = JSON.parse(JSON.stringify(currentFileData));

        } catch (error) {
            console.error('Error in cron job:', error);
        }
    });

    cronJob.start();
    return cronJob;
}
