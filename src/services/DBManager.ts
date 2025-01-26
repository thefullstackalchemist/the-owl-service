import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";
import os from "os";

/**
 * DatabaseManager class implements the Singleton pattern to manage SQLite database connections
 * and operations. It ensures only one database connection exists throughout the application.
 */
class DatabaseManager {
  private static instance: DatabaseManager;
  private db: sqlite3.Database;
  private dbPath: string;

  /**
   * Private constructor to prevent direct instantiation.
   * Initializes the database connection and sets up necessary file permissions.
   */
  private constructor() {
    // Store database in project root folder
    const dbName = "app.db";
    this.dbPath = path.join(process.cwd(), dbName);

    // Create directory if it doesn't exist
    const dbDir = path.dirname(this.dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true, mode: 0o755 });
    }

    // Set appropriate file permissions for the database file
    if (!fs.existsSync(this.dbPath)) {
      fs.writeFileSync(this.dbPath, "", { mode: 0o644 });
    }

    // Connect to the database
    this.db = new sqlite3.Database(this.dbPath, (err) => {
      if (err) {
        console.error("Error opening database:", err.message);
      } else {
        console.log("Connected to the SQLite database at:", this.dbPath);
        // Ensure database has write permissions
        fs.chmodSync(this.dbPath, 0o644);
      }
    });
  }

  /**
   * Returns the singleton instance of DatabaseManager.
   * Creates a new instance if one doesn't exist.
   * @returns DatabaseManager instance
   */
  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  /**
   * Executes a SQL query with optional parameters.
   * @param query - The SQL query string to execute
   * @param params - Array of parameters to bind to the query
   * @returns Promise that resolves with the query results
   */
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

  /**
   * Closes the database connection.
   * Should be called when the application is shutting down.
   */
  public closeConnection(): void {
    this.db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
      } else {
        console.log("Database connection closed.");
      }
    });
  }
}

export default DatabaseManager;