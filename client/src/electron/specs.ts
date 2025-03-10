import os from "os";
import si from "systeminformation";
import { networkInterfaces } from 'os';

async function getSpecs() {
    const osType = os.type();
    const cpu = os.cpus()[0];
    const totalRam = (os.totalmem() / (1024 ** 3)).toFixed(2) + ' GB';
    const totalFreeRam = (os.freemem() / (1024 ** 3)).toFixed(2) + ' GB';
    const disks = await si.fsSize();
    const gpu = await si.graphics();
    const ipAddress = await getPublicIP();
    const localTime = new Date().toLocaleString();

    const specs: Specs = {
        osType,
        cpu: {
            model: cpu.model,
            speed: `${cpu.speed} MHz`,
            cores: os.cpus().length,
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

    return specs;
}

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

// Function to get the MAC address of the first network interface
export async function getMacAddress(): Promise<string | null> {
    const nets = networkInterfaces();
    for (const net of Object.values(nets)) {
        if (!net) break;

        // Return the MAC address of the first non-internal IPv4 interface
        for (const netInfo of net) {
            if (netInfo.family === 'IPv4' && !netInfo.internal) return netInfo.mac;
        }
    }

    // Return null if no MAC address is found
    return null;
}
