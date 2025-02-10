// GET FROM URL
const info = document.getElementById("getInfo")
info.addEventListener("click", getInfo);

function getInfo() {
	const input = document.getElementById("connectURL")
	const url = input.value
	console.log(url);
	window.functionsBridge.getInfo(url);
}

async function sendPOSTRequest(url, data) {
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		});

		return await response.json();
	} catch (error) {
		console.error("Error:", error);
	}
}

async function getSpecs() {
	const osType = os.type();
	const cpu = os.cpus()[0]; // Get the first CPU info
	const totalRam = (os.totalmem() / (1024 ** 3)).toFixed(2) + ' GB';
	const totalFreeRam = (os.freemem() / (1024 ** 3)).toFixed(2) + ' GB';
	const cache = cpu.cache || {}; // Cache info, if available
	const disks = await si.fsSize(); // Disk information
	const gpu = await si.graphics(); // GPU information
	const netInterfaces = networkInterfaces();
	const ipAddress = Object.values(netInterfaces).flat().find((iface) => iface.family === 'IPv4' && !iface.internal)?.address || 'N/A';
	const localTime = new Date().toLocaleString();

	const specs = {
		osType,
		cpu: {
			model: cpu.model,
			speed: `${cpu.speed} MHz`,
			cores: os.cpus().length,
			cache: cache,
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

async function sendDeviceSpecs() {
	const response = fetch("./client-config.json");
	const data = await response.json();
	const urlToSend = data.url;

	const specs = await getSpecs();
	await sendPOSTRequest(urlToSend, specs);
}
