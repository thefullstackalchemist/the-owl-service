import BaseModel from "./Base";
import { SQLiteDataType } from "./Interfaces";

class Bucket extends BaseModel {
    constructor() {
        super('buckets', [
            { name: 'amount', type: SQLiteDataType.REAL, notNull: true },
            { name: 'target_amount', type: SQLiteDataType.REAL, notNull: true },
            { name: 'account_id', type: SQLiteDataType.INTEGER, FK: 'id->bankaccounts' }
        ]);
    }
}

export default Bucket