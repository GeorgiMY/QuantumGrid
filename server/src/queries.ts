import db from "./db";

// Define an interface for the row structure
interface RecordRow {
    object_id: string; // Adjust the type if necessary
}

// Function to get all object IDs from the records table
export function getAllObjectIds(): string[] {
    const stmt = db.prepare("SELECT object_id FROM records");

    return (stmt.all() as RecordRow[]).map(row => row.object_id); // Cast the result to RecordRow[]
};

// Function to add a new record with object_id and mac_address to the database
export function addRecord(object_id: string, mac_address: string): void {
    const stmt = db.prepare("INSERT INTO records (object_id, mac_address) VALUES (?, ?)");
    stmt.run(object_id, mac_address);
}

// Function to get the current document that was last sent
export function getCurrentIndex(): number {
    const stmt = db.prepare("SELECT current_index FROM index_tracker WHERE id = 1");
    const result = stmt.get() as { current_index?: number } | undefined;

    return result?.current_index ?? 0;
}

// Updates the index that keeps track of the current document
export function updateCurrentIndex(newIndex: number): void {
    const stmt = db.prepare("UPDATE index_tracker SET current_index = ? WHERE id = 1");
    stmt.run(newIndex);
}

// Function to add a device
export const addDevice = (macAddress: string, name: string, whitelisted: boolean, blacklisted: boolean): void => {
    const whitelistedNum = whitelisted ? 1 : 0;
    const blacklistedNum = blacklisted ? 1 : 0;

    const stmt = db.prepare(`INSERT OR IGNORE INTO devices (mac_address, name, whitelisted, blacklisted) VALUES (?, ?, ?, ?)`);
    stmt.run(macAddress, name, whitelistedNum, blacklistedNum);
};

// !!!!!!!!!!!!!!!!!
// WHITELIST QUERIES
// !!!!!!!!!!!!!!!!!

// Function to add a device to the whitelist
export const addToWhitelist = (macAddress: string): void => {
    // Insert if it doesn't exist
    addDevice(macAddress, "Device", true, false);

    const stmt = db.prepare(`UPDATE devices SET whitelisted = true WHERE mac_address = ?`);
    stmt.run(macAddress);
};

// Function to remove a device from the whitelist
export const removeFromWhitelist = (macAddress: string): void => {
    const stmt = db.prepare(`UPDATE devices SET whitelisted = false WHERE mac_address = ?`);
    stmt.run(macAddress);
};

// Function to get all MAC addresses from the devices table
export const getWhitelistedDevices = () => {
    const stmt = db.prepare("SELECT * FROM devices WHERE whitelisted = true");

    return stmt.all();
};

// Function to check if a specific MAC address is whitelisted
export const isWhitelisted = (macAddress: string): boolean => {
    const stmt = db.prepare("SELECT * FROM devices WHERE mac_address = ?");
    const device: any = stmt.get(macAddress);

    return device ? device.whitelisted === 1 : false;
}

// !!!!!!!!!!!!!!!!!
// BLACKLIST QUERIES
// !!!!!!!!!!!!!!!!!

// Function to add a device to the blacklist
export const addToBlacklist = (macAddress: string): void => {
    // Insert if it doesn't exist
    addDevice(macAddress, "Device", false, true);

    const stmt = db.prepare(`UPDATE devices SET blacklisted = true WHERE mac_address = ?`);
    stmt.run(macAddress);
};

// Function to remove a device from the blacklist
export const removeFromBlacklist = (macAddress: string): void => {
    const stmt = db.prepare(`UPDATE devices SET blacklisted = false WHERE mac_address = ?`);
    stmt.run(macAddress);
};

// Function to get all MAC addresses from the devices table
export const getBlacklistedDevices = () => {
    const stmt = db.prepare("SELECT * FROM devices WHERE blacklisted = true");

    return stmt.all();
};

// Function to check if a specific MAC address is blacklisted
export const isBlacklisted = (macAddress: string): boolean => {
    const stmt = db.prepare("SELECT * FROM devices WHERE mac_address = ?");
    const device: any = stmt.get(macAddress);

    return device ? device.blacklisted === 1 : false;
}

// Function to increase the work done for a specific device
export const increaseWorkDone = (macAddress: string, amount: number): void => {
    const stmt = db.prepare(`UPDATE devices SET work_done = work_done + ? WHERE mac_address = ?`);
    stmt.run(amount, macAddress);
};
