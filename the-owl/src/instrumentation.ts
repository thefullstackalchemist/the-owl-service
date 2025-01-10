
import DatabaseManager from "./services/DBManager";
import BankAccount from "./services/Models/BankAccount";
import BaseModel from "./services/Models/Base";
import Bucket from "./services/Models/Bucket";
import Card from "./services/Models/Card";
import Ledger from "./services/Models/Ledger";
import UPI from "./services/Models/UPI";
import Vendor from "./services/Models/Vendor";
import Wallet from "./services/Models/Wallet";

export function register() {
    // Register the models
BaseModel.registerModel(new BankAccount());
BaseModel.registerModel(new UPI());
BaseModel.registerModel(new Wallet());
BaseModel.registerModel(new Vendor());
BaseModel.registerModel(new Ledger());
BaseModel.registerModel(new Bucket());
BaseModel.registerModel(new Card());

// Usage examples
const bankAccount = new BankAccount();

const upi = new UPI();

const wallet = new Wallet();

const vendor = new Vendor();

const ledger = new Ledger();

const bucket = new Bucket();

const card = new Card();

[
bankAccount.generateCreateTableScript(),
upi.generateCreateTableScript(),
wallet.generateCreateTableScript(),
vendor.generateCreateTableScript(),
ledger.generateCreateTableScript(),
bucket.generateCreateTableScript(),
card.generateCreateTableScript(),
].forEach(query => {
    console.log(query);
    
    const dbManager = DatabaseManager.getInstance();
    dbManager.executeQuery(query)
        .then((rows) => {
            console.log("Query result:", rows);
            dbManager.closeConnection();
        })
        .catch((err) => {
            console.error("Error executing query:", err.message);
            dbManager.closeConnection();
        });
    })

}

