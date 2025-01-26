import sqlite3 from "sqlite3";

class DatabaseManager {
  private static instance: DatabaseManager;
  private db: sqlite3.Database;

  private constructor() {
    // Use an in-memory database for Edge functions
    this.db = new sqlite3.Database(":memory:", (err) => {
      if (err) {
        console.error("Error opening in-memory database:", err.message);
      } else {
        console.log("Connected to the in-memory SQLite database.");
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

  // New method to close the in-memory database connection
  public closeConnection(): void {
    this.db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
      } else {
        console.log("In-memory database connection closed.");
      }
    });
  }
}

export default DatabaseManager;
