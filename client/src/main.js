const { app, BrowserWindow, ipcMain, net } = require('electron')
const path = require('node:path')
const os = require('os');
const { networkInterfaces } = os;
const si = require('systeminformation');
require('dotenv').config();

let mainWindow;
const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			contextIsolation: true,
			enableRemoteModule: false, // Disable remote module if not needed
			nodeIntegration: false, // Avoid Node.js integration in renderer
		}
	})

	// Load the index.html of the app.
	mainWindow.loadFile('src/index.html')

	// Open the DevTools.
	if (process.env.ENV === "DEV") mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle("getInfo", (event, value) => {
	console.log(value)
	const request = net.request(value);

	request.on("response", (response) => {
		const data = []

		response.on("data", (chunk) => {
			data.push(chunk)
			console.log(chunk)
		})

		response.on("end", () => {
			const json = Buffer.concat(data).toString();
			console.log(json)
			mainWindow.webContents.send("gotData", json)
		})

	});

	request.end();
})

ipcMain.handle('get-system-info', async () => {
	const osType = os.type();
	const cpu = os.cpus()[0]; // Get the first CPU info
	const totalRam = (os.totalmem() / (1024 ** 3)).toFixed(2) + ' GB';
	const totalFreeRam = (os.freemem() / (1024 ** 3)).toFixed(2) + ' GB';
	const cache = cpu.cache || {}; // Cache info, if available
	const disks = await si.fsSize(); // Disk information
	const gpu = await si.graphics(); // GPU information
	const netInterfaces = networkInterfaces();
	const ipAddress = Object.values(netInterfaces).flat().find((iface) => iface.family === 'IPv4' && !iface.internal)?.address || 'N/A';
	const localTime = new Date().toLocaleString();

	return {
		osType,
		cpu: {
			model: cpu.model,
			speed: `${cpu.speed} MHz`,
			cores: os.cpus().length,
			cache: cache,
		},
		ram: {
			total: totalRam,
			free: totalFreeRam,
		},
		disks: disks.map((disk) => ({
			mount: disk.mount,
			type: disk.type,
			total: (disk.size / (1024 ** 3)).toFixed(2) + ' GB',
			free: (disk.available / (1024 ** 3)).toFixed(2) + ' GB',
		})),
		gpu: gpu.controllers.map((controller) => ({
			model: controller.model,
			vendor: controller.vendor,
			memory: controller.vram ? `${controller.vram} MB` : 'N/A',
			cores: controller.cores,
		})),
		ipAddress,
		localTime,
	};
});
