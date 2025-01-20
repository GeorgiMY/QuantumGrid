const { contextBridge, ipcRenderer } = require('electron');

let functionsBridge = {
	getInfo: async (value) => {
		let result = await ipcRenderer.invoke("getInfo", value);
	}
}

ipcRenderer.on("gotData", (event, json) => {
	console.log(json);
})

contextBridge.exposeInMainWorld("functionsBridge", functionsBridge);
