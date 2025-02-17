import os from "os";
import si from "systeminformation";
import fs from "fs";

// async function getSpecs() {
//     const osType = os.type();
//     const cpu = os.cpus()[0]; // Get the first CPU info
//     const totalRam = (os.totalmem() / (1024 ** 3)).toFixed(2) + ' GB';
//     const totalFreeRam = (os.freemem() / (1024 ** 3)).toFixed(2) + ' GB';
//     const disks = await si.fsSize(); // Disk information
//     const gpu = await si.graphics(); // GPU information
//     const ipAddress = await getPublicIP();
//     const localTime = new Date().toLocaleString();

//     const specs: Specs = {
//         osType,
//         cpu: {
//             model: cpu.model,
//             speed: `${cpu.speed} MHz`,
//             cores: os.cpus().length,
//         },
//         ram: {
//             total: totalRam,
//             free: totalFreeRam,
//         },
//         disks: disks.map((disk) => ({
//             mount: disk.mount,
//             type: disk.type,
//             total: (disk.size / (1024 ** 3)).toFixed(2) + ' GB',
//             free: (disk.available / (1024 ** 3)).toFixed(2) + ' GB',
//         })),
//         gpu: gpu.controllers.map((controller) => ({
//             model: controller.model,
//             vendor: controller.vendor,
//             memory: controller.vram ? `${controller.vram} MB` : 'N/A',
//             cores: controller.cores,
//         })),
//         ipAddress,
//         localTime,
//     };

//     return specs;
// }

async function getPublicIP(): Promise<string> {
    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Failed to fetch public IP:", error);
        return "N/A";
    }
}

export function generateServerJSONFile(volunteerProject: string, typeOfDistribution: string, typeOfData: string, collectionName: string, localJsonDistribution: string, JSONPath: string): void {
    const data = JSON.stringify(
        {
            "volunteer-project": volunteerProject,
            "type-of-distribution": typeOfDistribution,
            "type-of-data": typeOfData,
            "collection-name": collectionName,
            "local-json-distribution": localJsonDistribution,
            JSONPath: JSONPath,
        }
    );

    fs.writeFile("./server-config.json", data, (err) => {
        if (err) {
            console.error("Error writing JSON file:", err);
            throw err;
        }
        console.log("server-config.json has been successfully created.");
    });
}

export async function connectToServerUsingWS(): Promise<WebSocket> {
    const ws = new window.WebSocket('ws://localhost:3000/work/distribute');

    ws.onopen = () => {
        console.log('Connected to the server');
        ws.send('Hello server!');
    };

    ws.onmessage = (event: MessageEvent) => {
        console.log(`Received from server: ${event.data}`);
    };

    ws.onclose = () => {
        console.log('Disconnected from server');
    };

    return new Promise<WebSocket>((resolve, reject) => {
        ws.onopen = () => resolve(ws);
        ws.onerror = (error: Event) => reject(error);
    });
}

// async function loadSystemInfo() {
// 	console.log("loading system info")
// 	const info = await ipcRenderer.invoke('get-system-info');
// 	const output = `
//         <h1 class="text-3xl font-bold mb-6 text-center">System Information</h1>

//         <!-- OS Section -->
//         <div class="bg-white shadow-md rounded-lg p-4 mb-6">
//             <h2 class="text-xl font-semibold border-b pb-2 mb-4">Operating System</h2>
//             <p><strong>OS:</strong> ${info.osType}</p>
//         </div>

//         <!-- CPU Section -->
//         <div class="bg-white shadow-md rounded-lg p-4 mb-6">
//             <h2 class="text-xl font-semibold border-b pb-2 mb-4">CPU Information</h2>
//             <p><strong>Model:</strong> ${info.cpu.model}</p>
//             <p><strong>Speed:</strong> ${info.cpu.speed} GHz</p>
//             <p><strong>Cores:</strong> ${info.cpu.cores}</p>
//             <p><strong>Cache:</strong></p>
//             <pre class="bg-gray-100 p-2 rounded">${JSON.stringify(info.cpu.cache, null, 2)}</pre>
//         </div>

//         <!-- RAM Section -->
//         <div class="bg-white shadow-md rounded-lg p-4 mb-6">
//             <h2 class="text-xl font-semibold border-b pb-2 mb-4">RAM</h2>
//             <p><strong>Total:</strong> ${info.ram.total} GB</p>
//             <p><strong>Free:</strong> ${info.ram.free} GB</p>
//         </div>

//         <!-- Disks Section -->
//         <div class="bg-white shadow-md rounded-lg p-4 mb-6">
//             <h2 class="text-xl font-semibold border-b pb-2 mb-4">Disks</h2>
//             ${info.disks.map(disk => `
//                 <div class="mb-4">
//                     <p><strong>Mount:</strong> ${disk.mount}</p>
//                     <p><strong>Type:</strong> ${disk.type}</p>
//                     <p><strong>Total:</strong> ${disk.total} GB</p>
//                     <p><strong>Free:</strong> ${disk.free} GB</p>
//                 </div>
//             `).join('')}
//         </div>

//         <!-- GPU Section -->
//         <div class="bg-white shadow-md rounded-lg p-4 mb-6">
//             <h2 class="text-xl font-semibold border-b pb-2 mb-4">GPU Information</h2>
//             ${info.gpu.map(gpu => `
//                 <div class="mb-4">
//                     <p><strong>Model:</strong> ${gpu.model}</p>
//                     <p><strong>Vendor:</strong> ${gpu.vendor}</p>
//                     <p><strong>Memory:</strong> ${gpu.memory} GB</p>
//                     <p><strong>Cores:</strong> ${gpu.cores}</p>
//                 </div>
//             `).join('')}
//         </div>

//         <!-- Network Section -->
//         <div class="bg-white shadow-md rounded-lg p-4 mb-6">
//             <h2 class="text-xl font-semibold border-b pb-2 mb-4">Network</h2>
//             <p><strong>IP Address:</strong> ${info.ipAddress}</p>
//         </div>

//         <!-- Time Section -->
//         <div class="bg-white shadow-md rounded-lg p-4">
//             <h2 class="text-xl font-semibold border-b pb-2 mb-4">Time</h2>
//             <p><strong>Local Time:</strong> ${info.localTime}</p>
//         </div>`;

// 	// document.getElementById('info').innerHTML = `<pre>${output}</pre>`;
// }
