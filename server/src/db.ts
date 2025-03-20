import Database from "better-sqlite3";

const recordsDB = new Database("records.sqlite");

recordsDB.exec(`
    CREATE TABLE IF NOT EXISTS records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        object_id VARCHAR(24) NOT NULL,
        mac_address VARCHAR(17) NOT NULL,
        system_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS index_tracker (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        current_index INTEGER NOT NULL DEFAULT 0
    );

    INSERT OR IGNORE INTO index_tracker (id, current_index) VALUES (1, 0);

    CREATE TABLE IF NOT EXISTS devices (
        mac_address VARCHAR(17) PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        whitelisted BOOLEAN NOT NULL DEFAULT false,
        blacklisted BOOLEAN NOT NULL DEFAULT false,
        work_done INTEGER NOT NULL DEFAULT 0,
        working BOOLEAN NOT NULL DEFAULT 1
    );
`);

export default recordsDB;
