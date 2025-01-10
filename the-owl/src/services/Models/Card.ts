import BaseModel from "./Base";
import { SQLiteDataType } from "./Interfaces";

class Card extends BaseModel {
    constructor() {
        super('cards', [
            { name: 'card_num', type: SQLiteDataType.TEXT, notNull: true },
            { name: 'card_name', type: SQLiteDataType.TEXT, notNull: true },
            { name: 'account_id', type: SQLiteDataType.INTEGER, FK: 'id->bankaccounts' },
            { name: 'type', type: SQLiteDataType.TEXT, notNull: true }
        ]);
    }
}

export default Card