"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const functions = require('./functions');
const PORT = 3000;
app.locals.jsonUntill = 1;
app.locals.jsonIncrementation = 100;
app.locals.cronStarted = false;
app.get('/', (req, res) => {
    res.send("This is a server");
});
app.post('/network/join', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
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
}));
app.get('/work', (req, res) => {
    res.send("Explain what to do");
});
app.post('/work/recieve', (req, res) => {
});
app.get('/work/distribute', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the computer has joined
    // Get his params and distribute his portion
    try {
        const data = yield functions.readDataFileLines(app.locals.jsonUntill, app.locals.jsonUntill + app.locals.jsonIncrementation - 1);
        app.locals.jsonUntill += app.locals.jsonIncrementation;
        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.send("All files have currently been distributed.");
    }
}));
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
