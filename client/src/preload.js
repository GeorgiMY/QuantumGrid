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
        <h1 class="text-3xl font-bold mb-6 text-center">System Information</h1>

        <!-- OS Section -->
        <div class="bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 class="text-xl font-semibold border-b pb-2 mb-4">Operating System</h2>
            <p><strong>OS:</strong> ${info.osType}</p>
        </div>

        <!-- CPU Section -->
        <div class="bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 class="text-xl font-semibold border-b pb-2 mb-4">CPU Information</h2>
            <p><strong>Model:</strong> ${info.cpu.model}</p>
            <p><strong>Speed:</strong> ${info.cpu.speed} GHz</p>
            <p><strong>Cores:</strong> ${info.cpu.cores}</p>
            <p><strong>Cache:</strong></p>
            <pre class="bg-gray-100 p-2 rounded">${JSON.stringify(info.cpu.cache, null, 2)}</pre>
        </div>

        <!-- RAM Section -->
        <div class="bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 class="text-xl font-semibold border-b pb-2 mb-4">RAM</h2>
            <p><strong>Total:</strong> ${info.ram.total} GB</p>
            <p><strong>Free:</strong> ${info.ram.free} GB</p>
        </div>

        <!-- Disks Section -->
        <div class="bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 class="text-xl font-semibold border-b pb-2 mb-4">Disks</h2>
            ${info.disks.map(disk => `
                <div class="mb-4">
                    <p><strong>Mount:</strong> ${disk.mount}</p>
                    <p><strong>Type:</strong> ${disk.type}</p>
                    <p><strong>Total:</strong> ${disk.total} GB</p>
                    <p><strong>Free:</strong> ${disk.free} GB</p>
                </div>
            `).join('')}
        </div>

        <!-- GPU Section -->
        <div class="bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 class="text-xl font-semibold border-b pb-2 mb-4">GPU Information</h2>
            ${info.gpu.map(gpu => `
                <div class="mb-4">
                    <p><strong>Model:</strong> ${gpu.model}</p>
                    <p><strong>Vendor:</strong> ${gpu.vendor}</p>
                    <p><strong>Memory:</strong> ${gpu.memory} GB</p>
                    <p><strong>Cores:</strong> ${gpu.cores}</p>
                </div>
            `).join('')}
        </div>

        <!-- Network Section -->
        <div class="bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 class="text-xl font-semibold border-b pb-2 mb-4">Network</h2>
            <p><strong>IP Address:</strong> ${info.ipAddress}</p>
        </div>

        <!-- Time Section -->
        <div class="bg-white shadow-md rounded-lg p-4">
            <h2 class="text-xl font-semibold border-b pb-2 mb-4">Time</h2>
            <p><strong>Local Time:</strong> ${info.localTime}</p>
        </div>
`;

    document.getElementById('info').innerHTML = `<pre>${output}</pre>`;
}

loadSystemInfo();


contextBridge.exposeInMainWorld("functionsBridge", functionsBridge);
