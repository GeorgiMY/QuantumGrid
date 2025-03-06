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

// Function to get the current document that was last sent
export function getCurrentIndex(): number {
    const statement = db.prepare("SELECT current_index FROM index_tracker WHERE id = 1");
    const result = statement.get() as { current_index?: number } | undefined;

    return result?.current_index ?? 0;
}

export function updateCurrentIndex(newIndex: number): void {
    const statement = db.prepare("UPDATE index_tracker SET current_index = ? WHERE id = 1");
    statement.run(newIndex);
}
