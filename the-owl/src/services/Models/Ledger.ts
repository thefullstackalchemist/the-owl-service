import BaseModel from "./Base";
import { SQLiteDataType } from "./Interfaces";

class Ledger extends BaseModel {
    constructor() {
        super('ledger', [
            { name: 'from', type: SQLiteDataType.INTEGER, notNull: true },
            { name: 'to', type: SQLiteDataType.INTEGER, notNull: true },
            { name: 'amount', type: SQLiteDataType.REAL, notNull: true },
            { name: 'datetime', type: SQLiteDataType.DATETIME, notNull: true }
        ]);
    }
}

export default Ledger