// Declare a variable to hold the WebSocket instance
let ws: WebSocket | null = null;

// Connect to the websocket server
export async function connectToServer(serverURL: string) {
    ws = new window.WebSocket(serverURL);

    ws.onopen = () => {
        // Check if ws is not null
        console.log('Connected to the server');
        ws?.send('Hello server!');
    };

    ws.onmessage = (event: MessageEvent) => {
        const receivedData = JSON.parse(event.data);
        console.log(`Received from server: ${JSON.stringify(receivedData)}`);
        console.log(`Received message: ${receivedData.message}`);
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
        console.log('Disconnected from server');
        ws = null; // Clear the WebSocket instance on close
    };
}

// Disconnect from the websocket server
export function disconnectFromServer() {
    ws?.close(); // Close the WebSocket connection
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
