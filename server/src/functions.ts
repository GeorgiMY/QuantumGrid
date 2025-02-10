const cron = require("node-cron")

export function getDeviceInfoPeriodically(timeApart: number) {
	// Scan all the computers in the network every {timeApart} seconds
	cron.schedule(`*/${timeApart} * * * * *`, () => {
		console.log(`Computers in the network: `)
	})
}

// getDeviceInfoPeriodically()
