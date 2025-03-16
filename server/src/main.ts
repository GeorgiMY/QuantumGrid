import { Request, Response } from "express";
import express from 'express';
import { createServer } from 'http';
import { setupWebSocket } from './setupWebSocket';
import path from 'path';
import { startSendingDataPeriodically } from './sendData';
import dotenv from 'dotenv';
import { addToBlacklist, addToWhitelist, getBlacklistedDevices, getWhitelistedDevices, removeFromBlacklist, removeFromWhitelist } from "./queries";
dotenv.config();

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded());

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

/* app.post('/network/join', async (req: Request, res: Response) => {
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
}); */

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
    const allBlacklistedDevices = getBlacklistedDevices();

    res.render("blacklist", { title: "Blacklist", allBlacklistedDevices });
})

app.post('/blacklist/create', (req: Request, res: Response) => {
    const { mac }: { mac: string } = req.body;

    if (mac.length == 17) {
        addToBlacklist(mac);
        return res.redirect("/blacklist");
    }
    else res.render("blacklist", { "title": "BlackList", "status": "MAC address is not the right length", allBlacklistedDevices: [] })
});

app.post('/blacklist/remove', async (req: Request, res: Response) => {
    const { mac }: { mac: string } = req.body;

    if (mac.length === 17) {
        removeFromBlacklist(mac);
        return res.redirect("/blacklist");
    }
    else res.render("blacklist", { "title": "BlackList", "status": "MAC address is not the right length", allBlacklistedDevices: [] })
});

app.get('/whitelist', (req: Request, res: Response) => {
    const allWhitelistedDevices = getWhitelistedDevices();

    res.render("whitelist", { title: "Whitelist", allWhitelistedDevices });
})

app.post('/whitelist/create', (req: Request, res: Response) => {
    const { mac }: { mac: string } = req.body;

    console.log(mac)
    console.log(mac.length)
    if (mac.length == 17) {
        addToWhitelist(mac);
        return res.redirect("/whitelist");
    }
    else res.render("whitelist", { "title": "Whitelist", "status": "MAC address is not the right length", allWhitelistedDevices: [] })
});

app.post('/whitelist/remove', async (req: Request, res: Response) => {
    const { mac }: { mac: string } = req.body;

    if (mac.length === 17) {
        removeFromWhitelist(mac);
        return res.redirect("/whitelist");
    }
    else res.render("whitelist", { "title": "Whitelist", "status": "MAC address is not the right length", allWhitelistedDevices: [] })
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
