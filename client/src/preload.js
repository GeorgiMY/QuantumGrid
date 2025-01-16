const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	for (const dependency of ['chrome', 'node', 'electron']) {
		replaceText(`${dependency}-version`, process.versions[dependency])
	}
})

let functionsBridge = {
    getInfo: async () => {
        let result = await ipcRenderer.invoke("getInfo");
    }
}

ipcRenderer.on("gotData", (event, json) => {
    console.log(json);
})
contextBridge.exposeInMainWorld("functionsBridge", functionsBridge);
