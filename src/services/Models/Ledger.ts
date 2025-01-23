import BaseModel from "./Base";
import { SQLiteDataType } from "./Interfaces";

class Ledger extends BaseModel {
    constructor() {
        super('ledger', [
            { name: 'from_acc', type: SQLiteDataType.INTEGER, notNull: true },
            { name: 'to_acc', type: SQLiteDataType.INTEGER, notNull: true },
            { name: 'amount', type: SQLiteDataType.REAL, notNull: true },
            { name: 'txn_datetime', type: SQLiteDataType.DATETIME, notNull: true }
        ]);
    }
}

export default Ledger