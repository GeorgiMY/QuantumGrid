import cron from "node-cron"
import { workConnections } from './stats';
import { readDataFromMongoDB } from "./readData";
import { addRecord } from "./queries";

export function startSendingDataPeriodically(period: number): cron.ScheduledTask {
    console.log(`Starting data sending every ${period} seconds`);
    const cronJob = cron.schedule(`*/${period} * * * * *`, () => {
        sendLocalData();
    });
    cronJob.start();
    return cronJob;
}

async function sendLocalData() {
    if (workConnections.size <= 0) return;
    console.log("Data is being sent");

    for (const client of workConnections.values()) {
        const dataToSend = await readDataFromMongoDB();

        if (client.socket.readyState) {
            try {
                client.socket.send(JSON.stringify([...dataToSend])); // Wait for the socket to send
                console.log("Data sent to client");

                // Wait for all records to be added before moving to the next client
                await Promise.all(dataToSend.map((data) =>
                    addRecord(data._id.toString(), client.macId)
                ));

            } catch (error) {
                console.error("Error sending data to client:", error);
            }
        } else {
            console.log("Client not ready, skipping send");
        }
    }
}
