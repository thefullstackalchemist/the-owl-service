import BaseModel from "./Base";
import { SQLiteDataType } from "./Interfaces";

class UPI extends BaseModel {
    constructor() {
        super('upi', [
            { name: 'bank_account_id', type: SQLiteDataType.INTEGER, notNull: true, FK: 'id->bankaccounts' },
            { name: 'upi_provider', type: SQLiteDataType.TEXT, notNull: true },
            { name: 'meta', type: SQLiteDataType.TEXT }
        ]);
    }
}

export default UPI