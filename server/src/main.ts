import { Request, Response } from "express";

const express = require('express')
const app = express()
const functions = require('./functions');

interface systemInfo {
	osType: string;
	cpu: {
		model: string;
		speed: string; // in MHz
		cores: number;
		cache: Record<string, number>; // Assuming cache is an object with numeric values
	};
	ram: {
		total: number;
		free: number;
	};
	disks: {
		mount: string;
		type: string;
		total: string; // in GB
		free: string; // in GB
	}[];
	gpu: {
		model: string;
		vendor: string;
		memory: string; // in MB or 'N/A'
		cores?: number; // Optional, in case it's not always available
	}[];
	ipAddress: string;
	localTime: string;
}

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

});

app.get('/work/distribute', async (req: Request, res: Response) => {
	// Check if the computer has joined
	// Get his params and distribute his portion
	try {
		const data = await functions.readDataFileLines(app.locals.jsonUntill, app.locals.jsonUntill + app.locals.jsonIncrementation - 1);
		app.locals.jsonUntill += app.locals.jsonIncrementation;
		res.json(data);
	} catch (error) {
		console.log(error);
		res.send("All files have currently been distributed.");
	}
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`)
})
