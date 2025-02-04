interface systemInfo {
	osType: string;
	cpu: {
		model: string;
		speed: string; // in MHz
		cores: number;
		cache: Record<string, number>; // Assuming cache is an object with numeric values
	};
	ram: {
		total: number;
		free: number;
	};
	disks: {
		mount: string;
		type: string;
		total: string; // in GB
		free: string; // in GB
	}[];
	gpu: {
		model: string;
		vendor: string;
		memory: string; // in MB or 'N/A'
		cores?: number; // Optional, in case it's not always available
	}[];
	ipAddress: string;
	localTime: string;
}
