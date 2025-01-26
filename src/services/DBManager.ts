import sqlite3 from "sqlite3";
import fs from "fs";
import os from "os";

class DatabaseManager {
    private static instance: DatabaseManager;
    private db: sqlite3.Database;

    private constructor() {
        const filename: string = process.env.DB_FILE_PATH ?? './database.db';

        // Check and create file if it doesn't exist
        if (!fs.existsSync(filename)) {
            try {
                fs.writeFileSync(filename, "");
                console.log("Database file created:", filename);

                // Set permissions for Linux
                if (os.platform() === "linux") {
                    fs.chmodSync(filename, 0o777);
                    console.log("Set 777 permissions for the database file on Linux.");
                }
            } catch (err) {
                console.error("Error creating database file:", err.message);
                throw err;
            }
        }

        // Initialize the database connection
        this.db = new sqlite3.Database(filename, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error("Error opening database:", err.message);
            } else {
                console.log("Connected to the SQLite database.");
            }
        });
    }

    public static getInstance(): DatabaseManager {
        if (!DatabaseManager.instance) {
            DatabaseManager.instance = new DatabaseManager();
        }
        return DatabaseManager.instance;
    }

    public executeQuery(query: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    public closeConnection(): void {
        this.db.close((err) => {
            if (err) {
                console.error("Error closing database:", err.message);
            } else {
                console.log("Closed the database connection.");
            }
        });
    }
}

export default DatabaseManager;
