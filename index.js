// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import { roomRouter } from "./routes/room.js";

dotenv.config();

export const app = express();

app.use(express.json());

const PORT=process.env.PORT;




export async function createConnection(){
    //const MONGO_URL = "mongodb://127.0.0.1";
    const MONGO_URL = process.env.MONGO_URI;
    const client = new MongoClient(MONGO_URL);

    try{
        await client.connect();
 
       return client;
    } catch(err){
console.log(err);
    }
}


app.use('/room', roomRouter );

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

app.get("/", (request, response)=>{
    response.send("Welcome to Hall Booking App ");
});
