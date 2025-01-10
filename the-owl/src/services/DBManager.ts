/* eslint-disable @typescript-eslint/no-explicit-any */
// import sqlite3 from "sqlite3";
// const filename : string = process.env.DB_FILE_PATH ?? '';
// const db = new sqlite3.Database(filename, sqlite3.OPEN_READWRITE	);

import sqlite3 from "sqlite3";

class DatabaseManager {
    private static instance: DatabaseManager;
    private db: sqlite3.Database;

    private constructor() {
        const filename: string = process.env.DB_FILE_PATH ?? '';
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

// const query = "SELECT * FROM users WHERE id = ?";
// const params = [1];

export default DatabaseManager