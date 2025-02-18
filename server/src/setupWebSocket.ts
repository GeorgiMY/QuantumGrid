import { WebSocketServer, WebSocket } from "ws";
import { Server } from 'http';
import { workConnections, statsClients, broadcastWorkCount, sendWorkCount } from './stats'; // Import from stats

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
