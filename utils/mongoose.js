import mongoose from "mongoose";
import {MONGODB_URI} from "../config.js";

export async function connectToDb() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Sucefully connected to MongoDB");
  } catch (e) {
    console.log("Fail to connect to MongoDB");
    console.error(e);
  }
}
