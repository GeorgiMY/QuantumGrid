import db from "./db";

// Define an interface for the row structure
interface RecordRow {
    object_id: string; // Adjust the type if necessary
}

// Function to get all object IDs from the records table
export function getAllObjectIds(): string[] {
    const statement = db.prepare("SELECT object_id FROM records");
    return (statement.all() as RecordRow[]).map(row => row.object_id); // Cast the result to RecordRow[]
};

// Function to add a new record with object_id and mac_address to the database
export function addRecord(object_id: string, mac_address: string): void {
    const statement = db.prepare("INSERT INTO records (object_id, mac_address) VALUES (?, ?)");
    statement.run(object_id, mac_address);
}
