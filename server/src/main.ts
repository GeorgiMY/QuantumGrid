import { Request, Response } from "express";
import { readDataFromJson } from "./readData";
import express from 'express';
const app = express()

const PORT = 3000
app.locals.jsonUntill = 1
app.locals.jsonIncrementation = 100
app.locals.cronStarted = false

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
    // Recieve the work done by the
    // run checks to see if the distributed task is done correctly 
});

app.get('/work/distribute', async (req: Request, res: Response) => {
    // Check if the computer has joined
    // Get his params and distribute his portion
    try {
        const data = await readDataFromJson(app.locals.jsonUntill, app.locals.jsonUntill + app.locals.jsonIncrementation - 1);
        app.locals.jsonUntill += app.locals.jsonIncrementation;
        res.json(data);
    } catch (error) {
        console.log(error);
        res.send("All files have currently been distributed.");
    }
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
