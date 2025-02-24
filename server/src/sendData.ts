import cron from "node-cron"
import { workConnections } from './stats';
import { readDataFromMongoDB } from "./readData";
import path from 'path';

export function startSendingDataPeriodically(period: number): cron.ScheduledTask {
    console.log(`Starting data sending every ${period} seconds`);
    const cronJob = cron.schedule(`*/${period} * * * * *`, () => {
        console.log("Cron job triggered");
        sendLocalData();
    });
    cronJob.start();
    return cronJob;
}

async function getTypeOfDataDistributed(): Promise<"MongoDB" | "Local-JSON" | "Local-Files"> {
    const response = await fetch(path.resolve(__dirname, '../server-config.json'));
    const data = await response.json();
    const typeOfDataDistribution = data["type-of-data-distributed"];

    return typeOfDataDistribution;
}

async function getTypeOfDataDistribution(): Promise<"Equally-Distributed" | "CPU-Intensive" | "GPU-intensive" | "Memory-Intensive"> {
    const response = await fetch(path.resolve(__dirname, '../server-config.json'));
    const data = await response.json();
    const typeOfDataDistribution = data["type-of-data-distribution"];

    return typeOfDataDistribution;
}

async function sendDataDependingOnDataDistributed() {
    const typeOfDataDistributed = await getTypeOfDataDistributed();

    switch (typeOfDataDistributed) {
        case "MongoDB":
            break;
        case "Local-JSON":
            break;
        case "Local-Files":
            break;
        default:
            throw new Error("At sendDataDependingOnDataDistributed() all cases failed. Unknown typeOfDataDistributed was tried");
    }
}

async function distributeData() {
    const typeOfDataDistribution = await getTypeOfDataDistribution();

    switch (typeOfDataDistribution) {
        case "Equally-Distributed":

            break;
        case "CPU-Intensive":
            break;
        case "GPU-intensive":
            break;
        case "Memory-Intensive":
            break;
        default:
            throw new Error("At distributeData() all cases failed. Unknown typeOfDataDistribution was tried");
    }


}

async function sendLocalData() {
    if (workConnections.size <= 0) return;

    console.log("local data is being sent");

    const dataToSend = await readDataFromMongoDB();

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
