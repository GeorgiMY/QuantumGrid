"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readData_1 = require("./readData");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.locals.jsonUntill = 1;
app.locals.jsonIncrementation = 100;
app.locals.cronStarted = false;
app.get('/', (req, res) => {
    res.send("This is a server");
});
app.post('/network/join', async (req, res) => {
    const body = await req.body;
    // Creating an object that extends SystemInfo
    const info = {
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
app.get('/work', (req, res) => {
    res.send("Explain what to do");
});
app.post('/work/recieve', (req, res) => {
    // Recieve the work done by the device
    // run checks to see if the distributed task is done correctly 
});
app.get('/work/distribute', async (req, res) => {
    try {
        const data = await (0, readData_1.readDataObjectsFromJson)("./data/specs/cpu.json", app.locals.jsonUntill, app.locals.jsonUntill + app.locals.jsonIncrementation - 1);
        app.locals.jsonUntill += app.locals.jsonIncrementation;
        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.send("All files have currently been distributed.");
    }
});
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
