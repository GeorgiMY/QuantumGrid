import { WebSocket } from "ws";

// Track work connections only
export const workConnections = new Set<{ socket: WebSocket, macId: string }>();
export const statsClients = new Set<WebSocket>();

// Function to send work count to a specific stats client
export const sendWorkCount = (client: WebSocket) => {
    const data = {
        type: "workCount",
        count: workConnections.size,
        // Optionally include MAC IDs if needed
        macIds: Array.from(workConnections).map(conn => conn.macId)

    };
    client.send(JSON.stringify(data));
};

// Function to broadcast work count to all stats clients
export const broadcastWorkCount = () => {
    statsClients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            sendWorkCount(client);
        }
    });
}; 
