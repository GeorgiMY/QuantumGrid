import { saveJSONFileLocally } from "./receiveData.js";
// import { startSendingDataPeriodically } from "./cronJobs.js";

// Declare a variable to hold the WebSocket instance
let ws: WebSocket | null = null;

// Connect to the websocket server
export async function connectToServer(serverURL: string) {
    ws = new window.WebSocket(serverURL);
    // let cronJob: ReturnType<typeof startSendingDataPeriodically>;

    ws.onopen = () => {
        console.log('Connected to the server');
        if (ws) {
            // cronJob = startSendingDataPeriodically(5, ws);
            ws.send('Hello server!');
        } else {
            console.error("WebSocket is not connected.");
        }
    };

    ws.onmessage = async (event: MessageEvent) => {
        const receivedData = JSON.parse(event.data);
        console.log(`Received data from server: ${receivedData}`);
        await saveJSONFileLocally(receivedData, Date.now().toString());
        console.log("Data is saved");
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
        console.log('Disconnected from server');
        // cronJob.stop();
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
