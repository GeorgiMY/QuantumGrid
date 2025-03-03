import Database from "better-sqlite3";

const recordsDB = new Database("records.sqlite", { verbose: console.log });

// Works with MongoDB, mitigates inserting files into random places
recordsDB.exec(`
    CREATE TABLE IF NOT EXISTS records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        object_id VARCHAR(24) NOT NULL,
        mac_address VARCHAR(17) NOT NULL,
        system_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`);

export default recordsDB;
