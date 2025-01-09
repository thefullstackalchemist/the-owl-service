import sqlite3 from "sqlite3";
const filename : string = process.env.DB_FILE_PATH ?? '';
const db = new sqlite3.Database(filename, sqlite3.OPEN_READWRITE	);

