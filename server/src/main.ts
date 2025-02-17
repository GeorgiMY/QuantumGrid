import { Request, Response } from "express";
import express from 'express';
import { createServer } from 'http';
import { setupWebSocket } from './webSocketServerSideFunctions';
import path from 'path';

const app = express();
const server = createServer(app);

const PORT = 3000;
app.locals.jsonUntill = 1;
app.locals.jsonIncrementation = 100;
app.locals.cronStarted = false;

// Setup WebSocket server
setupWebSocket(server);

app.get('/', (req: Request, res: Response) => {
    res.send("This is a server")
})

app.post('/network/join', async (req: Request, res: Response) => {
    const body = await req.body;

    // Creating an object that extends SystemInfo
    const info: systemInfo = {
        osType: body.osType,
        cpu: body.cpu,
        ram: body.ram,
        disks: body.disks,
        gpu: body.gpu,
        ipAddress: body.ipAddress,
        localTime: body.localTime
    };

    res.json(info);
});

app.get('/work', (req: Request, res: Response) => {
    res.send("Explain what to do")
});

app.post('/work/recieve', (req: Request, res: Response) => {
    // Recieve the work done by the device
    // run checks to see if the distributed task is done correctly 
});

// app.get('/work/distribute', async (req: Request, res: Response) => {
// 	try {
// 		const data = await readDataObjectsFromJson("./data/specs/cpu.json", app.locals.jsonUntill, app.locals.jsonUntill + app.locals.jsonIncrementation - 1);
// 		app.locals.jsonUntill += app.locals.jsonIncrementation;
// 		res.json(data);
// 	} catch (error) {
// 		console.log(error);
// 		res.send("All files have currently been distributed.");
// 	}
// });

app.get('/work/distribute', async (req: Request, res: Response) => {
    // Work page WebSocket
    // const ws = new WebSocket(`ws://${window.location.hostname}:${window.location.port}/work/distribute`);
    const ws = new WebSocket(`ws://localhost:3000/work/distribute`);

    ws.onopen = () => {
        console.log('Connected to work/distribute');
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };

    res.sendFile(path.join(__dirname, "../dist/webSocketClientSideFunctions.js"));
});

app.get('/stats', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../src/client.html"));
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
