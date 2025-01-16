const { contextBridge, ipcRenderer } = require('electron');

let functionsBridge = {
    getInfo: async () => {
        let result = await ipcRenderer.invoke("getInfo");
    }
}

contextBridge.exposeInMainWorld("functionsBridge", functionsBridge);
