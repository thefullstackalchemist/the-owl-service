import BaseModel from "./Base";
import { SQLiteDataType } from "./Interfaces";

class Wallet extends BaseModel {
    constructor() {
        super('wallet', [
            { name: 'provider', type: SQLiteDataType.TEXT, notNull: true },
            { name: 'meta', type: SQLiteDataType.TEXT }
        ]);
    }
}

export default Wallet