import { Database } from "sqlite3";

export const execute = async (db: Database, sql: string) => {
    return new Promise<void>((resolve, reject) => {
      db.exec(sql, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  };
  