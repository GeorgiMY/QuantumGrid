import cron from "node-cron";
import fs from 'fs/promises';
import path from 'path';
import { saveJSONFileLocally } from "./receiveData.js";

// Declare a variable to hold the WebSocket instance
let ws: WebSocket | null = null;

// Connect to the websocket server
export async function connectToServer(serverURL: string) {
    ws = new window.WebSocket(serverURL);
    let cronJob: cron.ScheduledTask;

    ws.onopen = async () => {
        console.log('Connected to the server');
        cronJob = await startSendingDataPeriodically(5);
        ws?.send('Hello server!');
    };

    ws.onmessage = async (event: MessageEvent) => {
        const receivedData = JSON.parse(event.data);
        console.log(`Received data from server: ${receivedData}`);
        await saveJSONFileLocally(receivedData, Date.now.toString())
        console.log("Data is saved");
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
        console.log('Disconnected from server');
        cronJob.stop();
        ws = null; // Clear the WebSocket instance on close
    };
}

// Disconnect from the websocket server
export function disconnectFromServer() {
    console.log('Disconnecting from server');
    // Close the WebSocket connection
    ws?.close();
    console.log('Disconnected from server');
}

// Send the data through the server using the websocket connection
export function sendDataToServer(data: object) {
    if (ws) {
        ws.send(JSON.stringify(data));
        console.log("Data sent to server:", data);
    } else {
        console.error("WebSocket is not connected.");
    }
}

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
// To counter files that are not ready because of streaming, before the data is sent
// there is a check if the files have changed from the previous time there was 
export async function startSendingDataPeriodically(period: number): Promise<cron.ScheduledTask> {
    console.log(`Starting data sending every ${period} seconds`);
    const cronJob = cron.schedule(`*/${period} * * * * *`, async () => {
        console.log("Cron job triggered");

        await checkProcessedData();

        if (currentFileData == previousFileData) previousFileData = currentFileData;
        else {
            if (ws) {
                ws.send(JSON.stringify(currentFileData));
                console.log("Data was sent to the server");
            } else {
                console.error("WebSocket is not connected.");
            }
        }
    });
    cronJob.start();
    return cronJob;
}
