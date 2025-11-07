import mongoose from "mongoose";

import { env } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
