import { saveJSONFileLocally } from "./receiveData.js";
import { startSendingDataPeriodically } from "./cronJobs.js";
import { getMacAddress } from "./specs.js";
import WebSocket from "ws";
import { ScheduledTask } from "node-cron";

// Declare a variable to hold the WebSocket instance
let ws: WebSocket | null = null;

// Connect to the websocket server
export async function connectToServer(serverURL: string) {
    const macId = await getMacAddress();

    ws = new WebSocket(`${serverURL}?macid=${macId}`);
    let cronJob: ScheduledTask;

    ws.onopen = () => {
        console.log('Connected to the server');
        if (ws) {
            cronJob = startSendingDataPeriodically(5, ws);
        } else {
            throw new Error("WebSocket is not connected.");
        }
    };

    ws.onmessage = async (event: WebSocket.MessageEvent) => {
        const receivedData = JSON.parse(event.data.toString());
        saveJSONFileLocally(receivedData, `${Date.now().toString()}.json`);
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        throw new Error(`This server doesn't exist`)
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
    if (ws) ws.close();
    else throw new Error("Error disconnecting from server, the websocket doesn't exist");
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
