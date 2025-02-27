import electron, { ipcRenderer } from "electron";

electron.contextBridge.exposeInMainWorld("electron", {
    saveJSON: (configData: string, filePath: string) => ipcRenderer.send("json-message", configData, filePath),
    openDialog: () => ipcRenderer.send("open-dialog"),
    responseOpenDialog: (callback: any) => ipcRenderer.on("response-open-dialog", (event, { path, data }) => {
        callback({ path, data })
    })
} satisfies Window['electron'])

function ipcInvoke<Key extends keyof EventPayloadMapping>(key: Key): Promise<EventPayloadMapping[Key]> {
    return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadMapping>(key: Key, callback: (payload: EventPayloadMapping[Key]) => void) {
    const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload)
    electron.ipcRenderer.on(key, cb);
    return () => electron.ipcRenderer.off(key, cb)
}
