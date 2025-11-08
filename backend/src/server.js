import express from "express";
// import mongoose from "mongoose";
import { env } from "./lib/env.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";

const app = express();

const __dirname = fileURLToPath(import.meta.url);

const PORT = env.PORT;

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

// make ready for deployment
if (env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
