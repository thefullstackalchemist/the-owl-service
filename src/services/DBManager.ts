import sqlite3 from "sqlite3";
import path from "path";

class DatabaseManager {
    private static instance: DatabaseManager;
    private db: sqlite3.Database;

    private constructor() {
        // Define the database file path relative to the project root
        const filename: string = path.resolve(process.cwd(), process.env.DB_FILE_PATH ?? "./database.db");

        // Initialize the database connection
        this.db = new sqlite3.Database(filename, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                console.error("Error opening database:", err.message);
            } else {
                console.log("Connected to the SQLite database:", filename);
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
