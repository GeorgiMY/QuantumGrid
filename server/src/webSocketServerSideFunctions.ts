import { WebSocketServer, WebSocket } from "ws";
import { Server } from 'http';

// Track work connections only
const workConnections = new Set<WebSocket>();
const statsClients = new Set<WebSocket>();

export function setupWebSocket(server: Server) {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (ws: WebSocket, req: any) => {
        const path = req.url;
        console.log(`New connection attempt to path: ${path}`);

        if (path === '/work/distribute') {
            workConnections.add(ws);
            console.log(`Work client connected. Total work connections: ${workConnections.size}`);
            broadcastWorkCount();
        } else if (path === '/stats') {
            statsClients.add(ws);
            console.log(`Stats client connected. Total stats clients: ${statsClients.size}`);
            // Send initial work count to new stats client
            sendWorkCount(ws);
        } else {
            console.log(`Invalid path: ${path}`);
            ws.close();
            return;
        }

        // Handle disconnection
        ws.on("close", () => {
            if (path === '/work/distribute') {
                workConnections.delete(ws);
                console.log(`Work client disconnected. Total work connections: ${workConnections.size}`);
                broadcastWorkCount();
            } else if (path === '/stats') {
                statsClients.delete(ws);
            }
        });
    });
}

// Function to send work count to a specific stats client
const sendWorkCount = (client: WebSocket) => {
    const data = {
        type: "workCount",
        count: workConnections.size
    };
    client.send(JSON.stringify(data));
};

// Function to broadcast work count to all stats clients
const broadcastWorkCount = () => {
    statsClients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            sendWorkCount(client);
        }
    });
};
