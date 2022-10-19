import app from "./server";
import mongodb, { MongoClient } from "mongodb";

const port = 80;
const uri = "mongodb+srv://db_admin_1:9YyYbqeZECReEKv@cluster0.3l3ssff.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { monitorCommands: true });

app.listen(port, () => console.log(`Listening on port ${port}!`));

client.connect();
client.on('commandStarted', started => console.log(`Someone connected! Look! Event: ${started.address}`));