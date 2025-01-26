enum SQLiteDataType {
    INTEGER = "INTEGER",
    TEXT = "TEXT",
    BLOB = "BLOB",
    REAL = "REAL",
    NUMERIC = "NUMERIC",
    DATE = "DATE",
    TIME = "TIME",
    DATETIME = "DATETIME"
}

enum Condition {
    LT = "lt",
    GT = "gt",
    EQ = "eq",
    LTE = "lte",
    GTE = "gte"
}

interface Column {
    name: string;
    type: SQLiteDataType;
    notNull?: boolean;
    FK?: string;
}

interface Model {
    tableName: string;
    columns: Column[];
}

export {SQLiteDataType, Condition}
export type {Column, Model}