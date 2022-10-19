"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const mongodb_1 = require("mongodb");
const port = 80;
const uri = "mongodb+srv://db_admin_1:9YyYbqeZECReEKv@cluster0.3l3ssff.mongodb.net/?retryWrites=true&w=majority";
const client = new mongodb_1.MongoClient(uri, { monitorCommands: true });
server_1.default.listen(port, () => console.log(`Listening on port ${port}!`));
client.connect();
client.on('commandStarted', started => console.log(`Someone connected! Event: ${started.address}`));
