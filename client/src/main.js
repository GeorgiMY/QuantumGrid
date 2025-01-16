const { app, BrowserWindow, ipcMain, net } = require('electron')
const path = require('node:path')
require('dotenv').config();

let mainWindow;
const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	})

	// Load the index.html of the app.
	mainWindow.loadFile('src/index.html')

	// Open the DevTools.
	if (process.env.PROD === "DEV") mainWindow.webContents.openDevTools()
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

ipcMain.handle("getInfo", () => {
    const request = net.request("https://www.boredapi.com/api/activity/");

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