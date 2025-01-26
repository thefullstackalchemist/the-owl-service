import BaseModel from "./Base";
import { SQLiteDataType } from "./Interfaces";

class Vendor extends BaseModel {
    constructor() {
        super('vendors', [
            { name: 'name', type: SQLiteDataType.TEXT, notNull: true },
            { name: 'meta', type: SQLiteDataType.TEXT }
        ]);
    }
}

export default Vendor