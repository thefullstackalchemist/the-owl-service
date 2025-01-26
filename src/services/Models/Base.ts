import { Model, Column, SQLiteDataType, Condition } from "./Interfaces";


class BaseModel implements Model {
    tableName: string;
    columns: Column[];

    static models: { [key: string]: Model } = {};

    constructor(tableName: string, columns: Column[]) {
        this.tableName = tableName;
        this.columns = this.addDefaultIdColumn(columns);
    }

    static registerModel(model: Model) {
        this.models[model.tableName] = model;
    }

    private addDefaultIdColumn(columns: Column[]): Column[] {
        const hasIdColumn = columns.some(col => col.name === 'id');
        if (!hasIdColumn) {
            columns.unshift({ name: 'id', type: SQLiteDataType.INTEGER, notNull: true });
        }
        return columns;
    }

    generateCreateTableScript(): string {
        const columnsSQL = this.columns.map(col => {
            let columnDef = `${col.name} ${col.type}`;
            if (col.name === 'id') columnDef += ' PRIMARY KEY AUTOINCREMENT';
            if (col.notNull) columnDef += ' NOT NULL';
            if (col.FK) {
                const [fkColumn, fkTable] = col.FK.split('->');
                const foreignModel = BaseModel.models[fkTable];
                if (!foreignModel) throw new Error(`Foreign key table ${fkTable} not found`);
                const foreignColumn = foreignModel.columns.find(c => c.name === fkColumn);
                if (!foreignColumn) throw new Error(`Foreign key column ${fkColumn} not found in table ${fkTable}`);
                columnDef += ` REFERENCES ${fkTable}(${fkColumn})`;
            }
            return columnDef;
        }).join(', ');
        return `CREATE TABLE IF NOT EXISTS ${this.tableName} (${columnsSQL});`;
    }

    generateInsertScript(values: string[]): string {
        const columns = this.columns.map(col => col.name).join(', ');
        const valuesSQL = values.map(value => `'${value}'`).join(', ');
        return `INSERT INTO ${this.tableName} (${columns}) VALUES (${valuesSQL});`;
    }

    generateUpdateScript(values: { [key: string]: string }, conditions: { [key: string]: string }): string {
        const setSQL = Object.entries(values).map(([key, value]) => `${key} = '${value}'`).join(', ');
        const whereSQL = Object.entries(conditions).map(([key, value]) => `${key} = '${value}'`).join(' AND ');
        return `UPDATE ${this.tableName} SET ${setSQL} WHERE ${whereSQL};`;
    }

    generateDropTableScript(): string {
        return `DROP TABLE IF EXISTS ${this.tableName};`;
    }

    generateDeleteRowScript(conditions: { [key: string]: string }): string {
        const whereSQL = Object.entries(conditions).map(([key, value]) => `${key} = '${value}'`).join(' AND ');
        return `DELETE FROM ${this.tableName} WHERE ${whereSQL};`;
    }

    generateQueryScript(conditions: { columnName: string, value: string, condition: Condition }[]): string {
        const whereSQL = conditions.map(cond => {
            let operator;
            switch (cond.condition) {
                case Condition.LT: operator = '<'; break;
                case Condition.GT: operator = '>'; break;
                case Condition.EQ: operator = '='; break;
                case Condition.LTE: operator = '<='; break;
                case Condition.GTE: operator = '>='; break;
                default: throw new Error(`Unknown condition: ${cond.condition}`);
            }
            return `${cond.columnName} ${operator} '${cond.value}'`;
        }).join(' AND ');
        return `SELECT * FROM ${this.tableName} WHERE ${whereSQL};`;
    }
}

export default BaseModel

// Example of a child class
// class User extends BaseModel {
//     constructor() {
//         super('users', [
//             { name: 'name', type: SQLiteDataType.TEXT, notNull: true },
//             { name: 'email', type: SQLiteDataType.TEXT, notNull: true }
//         ]);
//     }
// }

// // Register the model
// BaseModel.registerModel(new User());

// // Usage
// const user = new User();
// console.log(user.generateCreateTableScript());
// console.log(user.generateInsertScript(['John Doe', 'john.doe@example.com']));
// console.log(user.generateUpdateScript({ name: 'Jane Doe' }, { id: '1' }));
// console.log(user.generateDropTableScript());
// console.log(user.generateDeleteRowScript({ id: '1' }));
// console.log(user.generateQueryScript([{ columnName: 'name', value: 'John Doe', condition: Condition.EQ }]));