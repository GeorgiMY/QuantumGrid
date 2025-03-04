import { Request, Response } from "express";
import express from 'express';
import { createServer } from 'http';
import { setupWebSocket } from './setupWebSocket';
import path from 'path';
import { startSendingDataPeriodically } from './sendData';
import dotenv from 'dotenv';
import { log } from "./logging";
dotenv.config();

const app = express();
const server = createServer(app);

const PORT = 3000;

// Setup WebSocket server
setupWebSocket(server);

// Start sending data periodically (e.g., every 5 seconds)
startSendingDataPeriodically(5);

app.use(express.json());

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

app.post('/work/recieve', (req: Request, res: Response) => {
    // Recieve the work done by the device
    // run checks to see if the distributed task is done correctly 
});

/*app.locals.jsonUntill = 1;
app.locals.jsonIncrementation = 100;
app.get('/work/distribute', async (req: Request, res: Response) => {
    try {
        const data = await readDataObjectsFromJson("./data/specs/cpu.json", app.locals.jsonUntill, app.locals.jsonUntill + app.locals.jsonIncrementation - 1);
        app.locals.jsonUntill += app.locals.jsonIncrementation;
        res.json(data);
    } catch (error) {
        console.log(error);
        res.send("All files have currently been distributed.");
    }
}); */

// When a device visits this page a websocket connection will try to be established
// If it is successfully established the device will automatically start receiving work
app.get('/work', async (req: Request, res: Response) => {
    res.status(200);
});

// When a user visits /stats they get the amount of device connected and currently working
app.get('/stats', async (req: Request, res: Response) => {
    log("Visited stats page")
    res.sendFile(path.join(__dirname, "../src/stats.html"));
});

// When the client visits this page the software will automatically be downloaded
app.get('/download', async (req: Request, res: Response) => {
    res.download("./data/software/software.exe");
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
