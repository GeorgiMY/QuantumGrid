import cron from "node-cron"
import { workConnections } from './stats';

export function startSendingDataPeriodically(period: number): cron.ScheduledTask {
    console.log(`Starting data sending every ${period} seconds`);
    const cronJob = cron.schedule(`*/${period} * * * * *`, () => {
        console.log("Cron job triggered");
        sendLocalData();
    });
    cronJob.start();
    return cronJob;
}

function sendLocalData() {
    if (workConnections.size <= 0) return;

    console.log("local data is being sent");
    const dataToSend = {
        message: "This is real-time data from the server!",
        timestamp: new Date().toISOString(),
        clientCount: workConnections.size
    };

    workConnections.forEach((client) => {
        if (client.readyState) {
            try {
                client.send(JSON.stringify(dataToSend));
                console.log("Data sent to client");
            } catch (error) {
                console.error("Error sending data to client:", error);
            }
        } else {
            console.log("Client not ready, skipping send");
        }
    });
}
