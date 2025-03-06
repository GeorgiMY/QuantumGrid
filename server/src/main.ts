import { Request, Response } from "express";
import express from 'express';
import { createServer } from 'http';
import { setupWebSocket } from './setupWebSocket';
import path from 'path';
import { startSendingDataPeriodically } from './sendData';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'));

const PORT = 3000;

// Setup WebSocket server
setupWebSocket(server);

// Start sending data periodically (every 5 seconds)
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

// When a device visits this page a websocket connection will try to be established
// If it is successfully established the device will automatically start receiving work
app.get('/work', async (req: Request, res: Response) => {
    res.status(200);
});

// When a user visits /stats they get the amount of device connected and currently working
app.get('/stats', async (req: Request, res: Response) => {
    res.render("stats", { title: "Stats" });
});

// When the client visits this page the software will automatically be downloaded
app.get('/download', async (req: Request, res: Response) => {
    res.download("./data/software/software.exe");
})

app.get('/blacklist', (req: Request, res: Response) => {
    res.render("blacklist", { title: "Blacklist" });
})

app.post('/blacklist', (req: Request, res: Response) => {

})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
