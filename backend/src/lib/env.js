import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DB_URL: process.env.DB_URL,
};
