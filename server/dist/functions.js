"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCronJob = startCronJob;
const cron = require("node-cron");
function startCronJob() {
    // Scan all the computers in the network every 5 seconds
    cron.schedule('*/5 * * * * *', () => {
        console.log(`Computers in the network: `);
    });
}
// startCronJob()
