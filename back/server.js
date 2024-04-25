import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";

import AllRouter from "./AllRouts.js";

import { v2 as cloudinary } from "cloudinary";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET_KEY,
});

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const Port = process.env.PORT;
const server = express();

server.use(bodyParser.json());
server.use(cors(corsOptions));
server.use(fileUpload({ useTempFiles: true }));

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTING_MONGO_DB);
    console.log("MongoDB Connecting...");
  } catch (error) {
    console.log(error);
  }
};

server.use("/api", AllRouter);
server.listen(Port, async () => {
  try {
    await connectMongoDb();
    console.log(`http://localhost:${Port}`);
  } catch (error) {
    console.log(error);
  }
});
