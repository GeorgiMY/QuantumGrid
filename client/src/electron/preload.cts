import electron, { ipcRenderer } from "electron";

electron.contextBridge.exposeInMainWorld("electron", {
    //frontend to backend
    saveJSON: (configData: string, filePath: string) => ipcRenderer.send("json-message", configData, filePath),
    openDialog: () => ipcRenderer.send("open-dialog"),
    startWebsocketConnection: (serverURL: string) => ipcRenderer.send("start-websocket-connection", serverURL),
    disconnectFromServer: () => ipcRenderer.send("disconnect-from-server"),
    setupServer: (serverLocation: string) => ipcRenderer.invoke("setup-server", serverLocation),
    isConnectedToWS: () => ipcRenderer.invoke("is-connected-to-ws"),
    openExternalLink: () => ipcRenderer.invoke("open-external-link", "https://github.com/GeorgiMY/QuantumGrid/releases"),
    getServerConfig: (serverPath: string) => ipcRenderer.invoke("get-server-config", serverPath),
    getEnvFile: (serverPath: string) => ipcRenderer.invoke("get-env-file", serverPath),
    //backend to frontend
    responseOpenDialog: (callback: any) => ipcRenderer.on("response-open-dialog", (event, { path, data }) => {
        callback({ path, data })
    }),

} satisfies Window['electron'])

function ipcInvoke<Key extends keyof EventPayloadMapping>(key: Key): Promise<EventPayloadMapping[Key]> {
    return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadMapping>(key: Key, callback: (payload: EventPayloadMapping[Key]) => void) {
    const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload)
    electron.ipcRenderer.on(key, cb);
    return () => electron.ipcRenderer.off(key, cb)
}
