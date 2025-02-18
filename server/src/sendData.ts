import cron from "node-cron"
import { workConnections } from './stats'; // Import workConnections to access connected clients

export function startSendingDataPeriodically(period: number): cron.ScheduledTask {
    const cronJob = cron.schedule(`*/${period} * * * * *`, sendLocalData)
    cronJob.start();
    return cronJob;
}

function sendLocalData() {
    console.log("local data sent")
    const dataToSend = {
        message: "This is real-time data from the server!",
        timestamp: new Date().toISOString(),
        clientCount: workConnections.size
    };

    workConnections.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(dataToSend));
        }
    });
}
