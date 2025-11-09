import mongoose from "mongoose";

import { env } from "./env.js";

export const connectDB = async () => {
  try {
    if (!env.DB_URL) {
      throw new Error("DB_URL is not set");
    }
    await mongoose.connect(env.DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
