import { WebSocketServer, WebSocket } from "ws";
import { Server } from 'http';
import { workConnections, statsClients, broadcastWorkCount, sendWorkCount } from './stats';
import { saveData } from './receiveData';

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

        // Handle incoming messages
        ws.on("message", async (message: string) => {
            try {
                const jsonData: object[] = JSON.parse(message); // Parse the incoming message as JSON
                await saveData(jsonData); // Save the JSON data to MongoDB
            } catch (error) {
                console.error('Error processing message:', error);
            }
        });

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
