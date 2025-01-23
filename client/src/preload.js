const { contextBridge, ipcRenderer } = require('electron');

let functionsBridge = {
    getInfo: async (value) => {
        let result = await ipcRenderer.invoke("getInfo", value);
    }
}

ipcRenderer.on("gotData", (event, json) => {
    console.log(json);
})

async function loadSystemInfo() {
    const info = await ipcRenderer.invoke('get-system-info');
    const output = `
    OS:
        ${info.osType}

    #####################################

    CPU:
        Model: ${info.cpu.model}
        Speed: ${info.cpu.speed}
        Cores: ${info.cpu.cores}
        Cache: ${JSON.stringify(info.cpu.cache, null, 2)}

    #####################################

    RAM:
        Total: ${info.ram.total}
        Free: ${info.ram.free}

    #####################################

    Disks: ${info.disks.map(disk => `
        Mount: ${disk.mount}
            Type: ${disk.type}
            Total: ${disk.total}
            Free: ${disk.free}
    `).join('\n')}

    #####################################

    GPU: ${info.gpu.map(gpu => `
        Model: ${gpu.model}
            Vendor: ${gpu.vendor}
            Memory: ${gpu.memory}
            Cores: ${gpu.cores}
    `).join('\n')}
    
    #####################################

    Network:
        IP Address: ${info.ipAddress}

    #####################################

    Time:
        Local Time: ${info.localTime}`;

    document.getElementById('info').innerHTML = `<pre>${output}</pre>`;
}

loadSystemInfo();


contextBridge.exposeInMainWorld("functionsBridge", functionsBridge);
