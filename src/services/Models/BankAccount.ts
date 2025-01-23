import BaseModel from "./Base";
import { SQLiteDataType } from "./Interfaces";

class BankAccount extends BaseModel {
    constructor() {
        super('bankaccounts', [
            { name: 'name', type: SQLiteDataType.TEXT, notNull: true },
            { name: 'number', type: SQLiteDataType.TEXT, notNull: true },
            { name: 'mobile_number', type: SQLiteDataType.TEXT, notNull: true },
            { name: 'bank_name', type: SQLiteDataType.TEXT, notNull: true },
            { name: 'ifsc_code', type: SQLiteDataType.TEXT, notNull: true },
            { name: 'meta', type: SQLiteDataType.TEXT }
        ]);
    }
}

export default BankAccount