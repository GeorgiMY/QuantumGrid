import { WebSocketServer, WebSocket } from "ws";
import { Server } from 'http';
import { workConnections, statsClients, broadcastWorkCount, sendWorkCount } from './stats';
import { saveData } from './receiveData';
import { log } from "./logging";

export function setupWebSocket(server: Server) {
    const wss = new WebSocketServer({ server });

    wss.on("connection", async (ws: WebSocket, req: Request) => {
        const path = req.url;

        // Extract the MAC ID from the query parameters
        const macId = path.split('=')[1];

        console.log(`New connection attempt to path: ${path} from device with MAC id: ${macId}`);

        const connectionPath = path.split('?')[0];

        if (connectionPath === '/work/distribute') {
            if (macId) {
                workConnections.add({ socket: ws, macId });
                log(`Client from device with MAC id: ${macId} connected. Total work connections: ${workConnections.size}`);
                broadcastWorkCount();
            } else {
                console.error("MAC ID not provided.");
                ws.close();
                return;
            }
        } else if (connectionPath === '/stats') {
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
                // Find and delete the connection with the same socket
                workConnections.forEach((connection) => {
                    if (connection.socket === ws) {
                        workConnections.delete(connection);
                        console.log(`Work client disconnected. Total work connections: ${workConnections.size}`);
                        broadcastWorkCount();
                    }
                });
            } else if (path === '/stats') {
                statsClients.delete(ws);
            }
        });
    });
}
